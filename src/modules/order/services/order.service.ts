/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import {
	OrderConsignmentRepository,
	OrderDetailRepository,
	OrderPaymentRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import {
	OrderCreateBodyDto,
	OrderHistoryQueryDto,
	ProductInputDto,
} from 'src/modules/order/dtos';
import {
	ENUM_ORDER_STATUS,
	ENUM_PAYMENT_TYPES,
	ENUM_VNPAY_COMMAND,
} from 'src/modules/order/constants/order.constant';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { OrderEntity } from 'src/modules/order/entities';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { faker } from '@faker-js/faker';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ILike, MoreThanOrEqual } from 'typeorm';
import { OrderParamDto } from 'src/modules/order/dtos/order.param.dto';
import { ProductConsignmentRepository } from 'src/modules/product/repositories';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly orderDetailRepository: OrderDetailRepository,
		private readonly orderPaymentRepository: OrderPaymentRepository,
		private readonly configService: ConfigService,
		private readonly paginationService: PaginationService,
		private readonly productConsignmentRepository: ProductConsignmentRepository,
		private readonly orderConsignmentRepository: OrderConsignmentRepository,
	) {}

	async createPaymentUrl(
		userId: string,
		ip: string,
		orderCreateBodyDto: OrderCreateBodyDto,
	): Promise<IResponse> {
		let vnp_Params: any = {};
		const date = new Date();
		await this.checkProductInBranch(
			orderCreateBodyDto.products,
			orderCreateBodyDto.branchId,
		);
		const newOrder = await this.orderRepository.createOne({
			data: {
				orderCode: faker.datatype.uuid(),
				status: ENUM_ORDER_STATUS.PROCESSING,
				paymentType: orderCreateBodyDto.paymentType,
				orderType: orderCreateBodyDto.orderType,
				totalPrice: orderCreateBodyDto.totalPrice,
				createDate: moment(date).format('yyyyMMDDHHmmss'),
				freeShip:
					orderCreateBodyDto.shipPrice && orderCreateBodyDto.shipPrice > 0
						? false
						: true,
				customer: {
					id: userId,
				},
				userSetting: {
					id: orderCreateBodyDto.userSettingId,
				},
				branch: {
					id: orderCreateBodyDto.branchId || undefined,
				},
			},
		});

		if (!newOrder) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'order.error.cannotCreate',
			});
		}

		orderCreateBodyDto.products.forEach((item: any) => {
			const order = new OrderEntity();
			const product = new ProductEntity();
			order.id = newOrder.id;
			product.id = item.productId;
			item.order = order;
			item.product = product;
		});

		const orderDetails = await this.orderDetailRepository.createMany({
			data: Object.values(orderCreateBodyDto.products),
		});

		await this.exportProductConsignment(
			orderCreateBodyDto.products,
			orderCreateBodyDto.branchId,
			orderDetails,
		);

		if (orderCreateBodyDto.paymentType === ENUM_PAYMENT_TYPES.TRANSFER) {
			vnp_Params.vnp_Version = this.configService.get<string>(
				'vnpay.payment.vnp_Version',
			);
			vnp_Params.vnp_TmnCode = this.configService.get<string>(
				'vnpay.payment.vnp_TmnCode',
			);
			vnp_Params.vnp_Locale = this.configService.get<string>(
				'vnpay.payment.vnp_Locale',
			);
			vnp_Params.vnp_CurrCode = this.configService.get<string>(
				'vnpay.payment.vnp_CurrCode',
			);
			vnp_Params.vnp_ReturnUrl = this.configService.get<string>(
				'vnpay.payment.vnp_ReturnUrl',
			);

			vnp_Params.vnp_IpAddr = ip;
			vnp_Params.vnp_Command = ENUM_VNPAY_COMMAND.PAY;
			vnp_Params.vnp_OrderInfo = `Thanh toan hoa don. So tien ${orderCreateBodyDto.totalPrice}`;
			vnp_Params.vnp_OrderType = 'Thanh toán hóa đơn';
			vnp_Params.vnp_Amount = orderCreateBodyDto.totalPrice * 100;
			vnp_Params.vnp_CreateDate = newOrder.createDate;
			vnp_Params.vnp_TxnRef = newOrder.orderCode;

			vnp_Params = this.sortObject(vnp_Params);

			const signData = qs.stringify(vnp_Params, { encode: false });

			const hmac = crypto.createHmac(
				'sha512',
				this.configService.get<string>('vnpay.payment.vnp_HashSecret'),
			);

			const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

			vnp_Params.vnp_SecureHash = signed;

			const vnpUrl =
				this.configService.get<string>('vnpay.payment.vnp_Url') +
				'?' +
				qs.stringify(vnp_Params, { encode: false });

			return { vnpUrl };
		}
		return {
			message: 'create order success',
		};
	}

	async returnUrl(query: any): Promise<IResponse> {
		let vnp_Params = query;
		const secureHash = vnp_Params.vnp_SecureHash;

		delete vnp_Params.vnp_SecureHash;
		delete vnp_Params.vnp_SecureHashType;

		vnp_Params = this.sortObject(vnp_Params);

		const secretKey = this.configService.get<string>(
			'vnpay.payment.vnp_HashSecret',
		);

		const signData = qs.stringify(vnp_Params, { encode: false });
		const hmac = crypto.createHmac('sha512', secretKey);
		const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

		if (secureHash === signed) {
			const payment = await this.orderPaymentRepository.createOne({
				data: {
					isPay: true,
					vnpBankCode: vnp_Params.vnp_BankCode,
					vnpBankTranNo: vnp_Params.vnp_BankTranNo,
					vnpCardType: vnp_Params.vnp_CardType,
					vnpPayDate: vnp_Params.vnp_PayDate,
					vnpOrderInfo: vnp_Params.vnp_OrderInfo,
					vnpTransactionNo: vnp_Params.vnp_TransactionNo,
				},
			});

			const order = await this.orderRepository.findOne({
				where: {
					orderCode: vnp_Params.vnp_TxnRef,
				},
			});

			await this.orderRepository.updateOne({
				criteria: {
					id: order.id,
				},
				data: {
					orderPayment: {
						id: payment.id,
					},
				},
			});

			return {
				message: 'payment success',
			};
		} else {
			const payment = await this.orderPaymentRepository.createOne({
				data: {
					isPay: false,
					vnpBankCode: vnp_Params.vnp_BankCode,
					vnpBankTranNo: vnp_Params.vnp_BankTranNo,
					vnpCardType: vnp_Params.vnp_CardType,
					vnpPayDate: vnp_Params.vnp_PayDate,
					vnpOrderInfo: vnp_Params.vnp_OrderInfo,
				},
			});

			const order = await this.orderRepository.findOne({
				where: {
					orderCode: vnp_Params.vnp_TxnRef,
				},
			});

			await this.orderRepository.updateOne({
				criteria: {
					id: order.id,
				},
				data: {
					status: ENUM_ORDER_STATUS.CANCELED,
					orderPayment: {
						id: payment.id,
					},
				},
			});

			await this.importProduct(order.id);

			return {
				message: 'payment failed and order canceled',
			};
		}
	}

	async checkProductInBranch(
		productInputDto: ProductInputDto[],
		branchId: string,
	) {
		for (let i = 0; i < productInputDto.length; i++) {
			const totalproductConsignments =
				await this.productConsignmentRepository.totalProductInBranch(
					productInputDto[i].productId,
					branchId,
				);
			if (!totalproductConsignments) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product is out of stock',
				});
			}
			if (
				totalproductConsignments.totalProductConsignment <
				productInputDto[i].quantity
			) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product quantity is not enough',
				});
			}
		}
	}

	async exportProductConsignment(
		productInputDto: ProductInputDto[],
		branchId: string,
		orderDetails: any,
	) {
		for (let i = 0; i < productInputDto.length; i++) {
			const productConsignments =
				await this.productConsignmentRepository.findAll({
					where: {
						expired: MoreThanOrEqual(
							moment().add(6, 'months').format('"YYYY-MM-DD"'),
						),
						productDetail: {
							product: {
								id: productInputDto[i].productId,
							},
							branch: {
								id: branchId,
							},
						},
					},
					options: {
						order: {
							expired: 'ASC',
						},
					},
				});
			if (!productConsignments) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product is out of stock',
				});
			}
			let newQuantity = productInputDto[i].quantity;
			let index = 0;
			for (let i = 0; i <= productConsignments.length; i++) {
				if (productConsignments[i].quantity >= newQuantity) {
					productConsignments[i].quantity =
						productConsignments[i].quantity - newQuantity;
					newQuantity = 0;
					index = i;
					break;
				} else {
					productConsignments[i].quantity = 0;
					newQuantity = newQuantity - productConsignments[i].quantity;
				}
			}
			if (newQuantity !== 0) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product quantity is not enough',
				});
			}
			for (let i = 0; i <= index; i++) {
				await this.productConsignmentRepository.updateOne({
					criteria: {
						id: productConsignments[i].id,
					},
					data: productConsignments[i],
				});

				await this.orderConsignmentRepository.createOne({
					data: {
						quantity: productInputDto[i].quantity,
						orderDetail: {
							id: orderDetails[i].id,
						},
						productConsignment: {
							id: productConsignments[i].id,
						},
					},
				});
			}
		}
	}

	async importProduct(orderId: string) {
		const orderConsignments = await this.orderConsignmentRepository.findAll({
			where: {
				orderDetail: {
					order: {
						id: orderId,
					},
				},
			},
			options: {
				relations: {
					productConsignment: true,
				},
			},
		});

		if (!orderConsignments.length) {
			throw new BadRequestException({
				statusCode: 404,
				message: 'order consignment not found',
			});
		}

		for (let i = 0; i < orderConsignments.length; i++) {
			await this.productConsignmentRepository.updateOne({
				criteria: {
					id: orderConsignments[i].productConsignment.id,
				},
				data: {
					quantity:
						orderConsignments[i].productConsignment.quantity +
						orderConsignments[i].quantity,
				},
			});
		}
	}

	private sortObject(obj) {
		let sorted: any = {};

		let str: any = [];

		let key;

		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				str.push(encodeURIComponent(key));
			}
		}

		str.sort();

		for (key = 0; key < str.length; key++) {
			sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
		}

		return sorted;
	}

	async getOrderHistory(
		userId: string,
		orderHistoryQueryDto: OrderHistoryQueryDto,
	) {
		const { search, status, page, limit } = orderHistoryQueryDto;

		const totalData = await this.orderRepository.count({
			where: {
				customer: {
					id: userId,
				},
				orderCode: search ? ILike(`%${search}%`) : undefined,
				status: status || undefined,
			},
		});

		const result = await this.orderRepository.findMany({
			where: {
				customer: {
					id: userId,
				},
				orderCode: search ? ILike(`%${search}%`) : undefined,
				status: status || undefined,
			},
			options: {
				page: page,
				limit: limit,
				order: {
					createdAt: 'DESC',
				},
				relations: {
					branch: true,
					userSetting: true,
					customer: true,
					pharmacist: true,
					orderDetails: {
						product: {
							images: true,
						},
					},
					orderPayment: true,
				},
			},
		});

		return this.paginationService.formatPaginationResult(
			totalData,
			page,
			limit,
			null,
			null,
			result,
		);
	}

	async getOrderById(
		userId: string,
		orderParamDto: OrderParamDto,
	): Promise<IResponse> {
		const order = await this.orderRepository.findOne({
			where: {
				id: orderParamDto.orderId,
				customer: {
					id: userId,
				},
			},
			options: {
				relations: {
					branch: true,
					userSetting: true,
					customer: true,
					pharmacist: true,
					orderDetails: {
						product: {
							images: true,
						},
					},
					orderPayment: true,
				},
			},
		});

		if (!order) {
			throw new NotFoundException({
				statusCode: 404,
				message: 'oder.error.notFound',
			});
		}

		return order;
	}

	async updateOrderStatus(
		orderId: string,
		status: ENUM_ORDER_STATUS,
		userId: string,
	): Promise<IResponse> {
		const order = await this.orderRepository.findOne({
			where: {
				id: orderId,
				customer: {
					id: userId,
				},
			},
		});

		if (!order) {
			throw new NotFoundException({
				statusCode: 404,
				message: 'oder.error.notFound',
			});
		}

		switch (status) {
			case ENUM_ORDER_STATUS.CANCELED:
				if (
					order.status === ENUM_ORDER_STATUS.DELIVERING ||
					order.status === ENUM_ORDER_STATUS.RECEIVED
				) {
					throw new BadRequestException({
						statusCode: 400,
						message: 'order.error.cannotCancel',
					});
				}
				order.status = ENUM_ORDER_STATUS.CANCELED;
				break;
			case ENUM_ORDER_STATUS.RECEIVED:
				if (
					order.status === ENUM_ORDER_STATUS.DELIVERING ||
					order.status === ENUM_ORDER_STATUS.CANCELED
				) {
					throw new BadRequestException({
						statusCode: 400,
						message: 'order.error.cannotReceived',
					});
				}
				order.status = ENUM_ORDER_STATUS.RECEIVED;
				break;
			default:
				throw new BadRequestException({
					statusCode: 400,
					message: 'order.error.invalidStatus',
				});
		}

		return this.orderRepository.updateOne({
			criteria: {
				id: orderId,
			},
			data: {
				status: order.status,
			},
		});
	}
}
