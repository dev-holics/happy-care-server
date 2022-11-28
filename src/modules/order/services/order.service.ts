/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import {
	OrderDetailRepository,
	OrderPaymentRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import {
	OrderCreateBodyDto,
	OrderHistoryQueryDto,
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
import { ILike } from 'typeorm';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly orderDetailRepository: OrderDetailRepository,
		private readonly orderPaymentRepository: OrderPaymentRepository,
		private readonly configService: ConfigService,
		private readonly paginationService: PaginationService,
	) {}

	async createPaymentUrl(
		userId: string,
		ip: string,
		orderCreateBodyDto: OrderCreateBodyDto,
	): Promise<IResponse> {
		let vnp_Params: any = {};
		const date = new Date();
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

		await this.orderDetailRepository.createMany({
			data: Object.values(orderCreateBodyDto.products),
		});

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
					orderPayment: {
						id: payment.id,
					},
				},
			});

			return {
				message: 'payment failed',
			};
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
}
