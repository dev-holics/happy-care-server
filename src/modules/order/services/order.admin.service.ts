import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {
	OrderAdminRepository,
	OrderConsignmentRepository,
	OrderDetailRepository,
	OrderPaymentRepository,
} from 'src/modules/order/repositories';
import {
	OrderAdminCreateBodyDto,
	OrderListQueryDto,
	OrderTotalQueryDto,
} from 'src/modules/order/dtos';
import {
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPES,
} from 'src/modules/order/constants/order.constant';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { Between, ILike } from 'typeorm';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { OrderService } from './order.service';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { OrderEntity } from 'src/modules/order/entities';
import {
	ProductConsignmentRepository,
	ProductLogRepository,
} from 'src/modules/product/repositories';
import { ENUM_TRANSACTION_TYPES } from 'src/modules/product/constants';

@Injectable()
export class OrderAdminService {
	constructor(
		private readonly orderAdminRepository: OrderAdminRepository,
		private readonly userRepository: UserRepository,
		private readonly paginationService: PaginationService,
		private readonly orderService: OrderService,
		private readonly orderDetailRepository: OrderDetailRepository,
		private readonly productLogRepository: ProductLogRepository,
		private readonly orderPaymentRepository: OrderPaymentRepository,
		private readonly orderConsignmentRepository: OrderConsignmentRepository,
		private readonly productConsignmentRepository: ProductConsignmentRepository,
	) {}

	async createOrder(
		user: any,
		orderAdminCreateBodyDto: OrderAdminCreateBodyDto,
	) {
		const branchId = user.branch.id;

		await this.orderService.checkProductInBranch(
			orderAdminCreateBodyDto.products,
			branchId,
		);

		const newOrder = await this.orderAdminRepository.createOne({
			data: {
				orderCode: faker.datatype.uuid(),
				status: ENUM_ORDER_STATUS.RECEIVED,
				paymentType: orderAdminCreateBodyDto.paymentType,
				orderType: ENUM_ORDER_TYPES.OFFLINE_STORE,
				totalPrice: orderAdminCreateBodyDto.totalPrice,
				createDate: moment().format('yyyyMMDDHHmmss'),
				freeShip: null,
				branch: {
					id: branchId,
				},
			},
		});

		const payment = await this.orderPaymentRepository.createOne({
			data: {
				isPay: true,
			},
		});

		await this.orderAdminRepository.updateOne({
			criteria: {
				id: newOrder.id,
			},
			data: {
				orderPayment: {
					id: payment.id,
				},
			},
		});

		if (!newOrder) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'order.error.cannotCreate',
			});
		}

		orderAdminCreateBodyDto.products.forEach((item: any) => {
			const order = new OrderEntity();
			order.id = newOrder.id;
			item.order = order;
		});

		const orderDetails = await this.orderDetailRepository.createMany({
			data: Object.values(orderAdminCreateBodyDto.products),
		});

		await this.orderService.exportProductConsignment(
			orderAdminCreateBodyDto.products,
			branchId,
			orderDetails,
		);

		for (let i = 0; i < orderAdminCreateBodyDto.products.length; i++) {
			await this.productLogRepository.createOne({
				data: {
					quantity: orderAdminCreateBodyDto.products[i].quantity,
					transactionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
					type: ENUM_TRANSACTION_TYPES.EXPORT,
					product: {
						id: orderAdminCreateBodyDto.products[i].productId,
					},
					branch: {
						id: branchId,
					},
					order: {
						id: newOrder.id,
					},
				},
			});
		}
	}

	async getOrders(orderListQueryDto: OrderListQueryDto) {
		const {
			paymentType,
			status,
			startDate,
			endDate,
			branchId,
			page,
			limit,
			search,
		} = orderListQueryDto;

		const totalData = await this.orderAdminRepository.count({
			where: [
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate
							? Between(
									moment(startDate).format('yyyyMMDDHHmmss'),
									moment(endDate).format('yyyyMMDDHHmmss'),
							  )
							: undefined,
					branch: {
						id: branchId || undefined,
					},
					orderCode: search ? ILike(`%${search}%`) : undefined,
				},
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate ? Between(startDate, endDate) : undefined,
					branch: {
						id: branchId || undefined,
					},
					customer: {
						fullname: search ? ILike(`%${search}%`) : undefined,
					},
				},
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate ? Between(startDate, endDate) : undefined,
					branch: {
						id: branchId || undefined,
					},
					customer: {
						phoneNumber: search ? ILike(`%${search}%`) : undefined,
					},
				},
			],
		});

		const result = await this.orderAdminRepository.findMany({
			where: [
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate
							? Between(
									moment(startDate).format('yyyyMMDDHHmmss'),
									moment(endDate).format('yyyyMMDDHHmmss'),
							  )
							: undefined,
					branch: {
						id: branchId || undefined,
					},
					orderCode: search ? ILike(`%${search}%`) : undefined,
				},
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate ? Between(startDate, endDate) : undefined,
					branch: {
						id: branchId || undefined,
					},
					customer: {
						fullname: search ? ILike(`%${search}%`) : undefined,
					},
				},
				{
					paymentType: paymentType || undefined,
					status: status || undefined,
					createDate:
						startDate && endDate ? Between(startDate, endDate) : undefined,
					branch: {
						id: branchId || undefined,
					},
					customer: {
						phoneNumber: search ? ILike(`%${search}%`) : undefined,
					},
				},
			],
			options: {
				page: page,
				limit: limit,
				order: {
					createdAt: 'DESC',
				},
				relations: {
					customer: true,
					branch: true,
					pharmacist: true,
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

	async getTotalOrders(orderTotalQueryDto: OrderTotalQueryDto) {
		const { startDate, endDate, branchId, pharmacistId } = orderTotalQueryDto;

		const result = await this.orderAdminRepository.count({
			where: {
				createDate:
					startDate && endDate
						? Between(
								moment(startDate).format('yyyyMMDDHHmmss'),
								moment(endDate).format('yyyyMMDDHHmmss'),
						  )
						: undefined,
				branch: {
					id: branchId || undefined,
				},
				pharmacist: {
					id: pharmacistId || undefined,
				},
			},
		});

		return {
			total: result,
		};
	}

	async updateOrderStatus(
		orderId: string,
		status: ENUM_ORDER_STATUS,
		userId: string,
	): Promise<IResponse> {
		const order = await this.orderAdminRepository.findOne({
			where: {
				id: orderId,
			},
		});

		if (!order) {
			throw new NotFoundException({
				statusCode: 404,
				message: 'oder.error.notFound',
			});
		}

		switch (`${order.status} to ${status}`) {
			case `${ENUM_ORDER_STATUS.PROCESSING} to ${ENUM_ORDER_STATUS.CONFIRMED}`:
				const pharmacist = await this.userRepository.findOne({
					where: {
						id: userId,
					},
					options: {
						relations: {
							branch: true,
						},
					},
				});
				order.pharmacist = pharmacist;
				order.branch = pharmacist.branch;
				order.status = status;
				break;
			case `${ENUM_ORDER_STATUS.CONFIRMED} to ${ENUM_ORDER_STATUS.DELIVERING}`:
				order.status = status;
				break;
			case `${ENUM_ORDER_STATUS.CONFIRMED} to ${ENUM_ORDER_STATUS.RECEIVED}`:
				if (order.delivery === 'PICK_UP') {
					order.status = status;
				} else {
					throw new NotFoundException({
						statusCode: 400,
						message: 'status.order.error',
					});
				}
				break;
			case `${ENUM_ORDER_STATUS.DELIVERING} to ${ENUM_ORDER_STATUS.DELIVERED}`:
				order.status = status;
				break;
			case `${ENUM_ORDER_STATUS.PROCESSING} to ${ENUM_ORDER_STATUS.CANCELED}`:
				//xoa log, cong hang , neu da thanh toan thi hoan tien
				const [deleteLog, orderConsignment] = await Promise.all([
					this.productLogRepository.updateMany({
						criteria: {
							order: {
								id: orderId,
							},
						},
						data: {
							deletedAt: moment(),
						},
					}),
					this.orderConsignmentRepository.findAll({
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
					}),
				]);

				const productConsignment = [];

				for (let i = 0; i < orderConsignment.length; i++) {
					orderConsignment[i].productConsignment.quantity =
						orderConsignment[i].productConsignment.quantity +
						orderConsignment[i].quantity;

					productConsignment.push(orderConsignment[i].productConsignment);
				}

				await this.productConsignmentRepository.saveProductConsignment(
					productConsignment,
				);

				order.status = status;
				break;
			default:
				throw new BadRequestException({
					statusCode: 400,
					message: 'order.error.invalidStatus',
				});
		}

		return this.orderAdminRepository.updateOne({
			criteria: {
				id: orderId,
			},
			data: order,
		});
	}
}
