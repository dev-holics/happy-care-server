import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {
	OrderAdminRepository,
	OrderDetailRepository,
} from 'src/modules/order/repositories';
import {
	OrderAdminCreateBodyDto,
	OrderListQueryDto,
	OrderTotalQueryDto,
} from 'src/modules/order/dtos';
import { faker } from '@faker-js/faker';
import {
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPES,
} from 'src/modules/order/constants/order.constant';
import moment from 'moment';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { Between, ILike } from 'typeorm';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
	ProductConsignmentRepository,
	ProductDetailRepository,
	ProductLogRepository,
} from 'src/modules/product/repositories';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { ProductService } from 'src/modules/product/services';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { ProductLogExportDto } from 'src/modules/product/dtos';

@Injectable()
export class OrderAdminService {
	constructor(
		private readonly orderAdminRepository: OrderAdminRepository,
		private readonly userRepository: UserRepository,
		private readonly paginationService: PaginationService,
		private readonly databaseTransactionService: DatabaseTransactionService,
		private readonly orderDetailRepository: OrderDetailRepository,
		private readonly productLogRepository: ProductLogRepository,
		private readonly productDetailRepository: ProductDetailRepository,
		private readonly productService: ProductService,
		private readonly productConsignmentRepository: ProductConsignmentRepository,
	) {}

	async createOrder(
		user: any,
		orderAdminCreateBodyDto: OrderAdminCreateBodyDto,
	) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			// create new order
			const newOrder = await this.orderAdminRepository.createOne({
				data: {
					orderCode: faker.datatype.uuid(),
					paymentType: orderAdminCreateBodyDto.paymentType,
					orderType: ENUM_ORDER_TYPES.OFFLINE_STORE,
					status: ENUM_ORDER_STATUS.RECEIVED,
					freeShip: false,
					totalPrice: orderAdminCreateBodyDto.totalPrice,
					createDate: moment(new Date()).format('yyyyMMDDHHmmss'),
					orderPayment: {
						isPay: true,
					},
					customer: {
						id: orderAdminCreateBodyDto.customerId,
					},
					pharmacist: {
						id: user.id,
					},
					branch: {
						id: user.branch.id,
					},
				},
			});

			// create order detail, export product consignment
			for (const item of orderAdminCreateBodyDto.products) {
				const productConsignment =
					await this.productConsignmentRepository.findOne({
						where: {
							id: item.productConsignmentId,
						},
						options: {
							relations: {
								productDetail: {
									product: true,
								},
							},
						},
					});
				await this.orderDetailRepository.createOne({
					data: {
						quantity: item.quantity,
						product: {
							id: productConsignment.productDetail.product.id,
						},
						order: {
							id: newOrder.id,
						},
					},
				});
				const productLogDto = new ProductLogExportDto(
					item.quantity,
					item.productConsignmentId,
					user.branch.id,
					productConsignment.productDetail.product.id,
				);

				await this.productService.exportProductLog(productLogDto);
			}
		} catch (error: any) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
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
						startDate && endDate ? Between(startDate, endDate) : undefined,
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
						startDate && endDate ? Between(startDate, endDate) : undefined,
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
					startDate && endDate ? Between(startDate, endDate) : undefined,
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
			case `${ENUM_ORDER_STATUS.DELIVERING} to ${ENUM_ORDER_STATUS.DELIVERED}`:
				order.status = status;
				break;
			case `${ENUM_ORDER_STATUS.PROCESSING} to ${ENUM_ORDER_STATUS.CANCELED}`:
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
