import { ForbiddenException, Injectable } from '@nestjs/common';
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
import {
	ENUM_AUTH_ACCESS_LEVEL,
	ENUM_AUTH_STATUS_CODE_ERROR,
} from 'src/common/auth/constants';
import { Between, ILike } from 'typeorm';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { OrderDetailEntity } from 'src/modules/order/entities';
import {
	ProductDetailRepository,
	ProductLogRepository,
} from 'src/modules/product/repositories';
import { ENUM_TRANSACTION_TYPES } from 'src/modules/product/constants';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { ProductService } from 'src/modules/product/services';

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
	) {}

	async createOrder(
		userId: string,
		orderAdminCreateBodyDto: OrderAdminCreateBodyDto,
	) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const pharmacist = await this.userRepository.findOne({
				where: {
					id: userId,
				},
				options: {
					relations: {
						branch: true,
						role: true,
					},
				},
			});

			if (pharmacist.role.accessLevel != ENUM_AUTH_ACCESS_LEVEL.PHARMACIST) {
				throw new ForbiddenException({
					statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PERMISSION_INVALID_ERROR,
					message: 'auth.error.mustBePharmacist',
				});
			}

			// create new order
			const newOrder = await this.orderAdminRepository.createOne({
				data: {
					orderCode: faker.datatype.uuid(),
					paymentType: orderAdminCreateBodyDto.paymentType,
					orderType: ENUM_ORDER_TYPES.OFFLINE_STORE,
					status: ENUM_ORDER_STATUS.SUCCESS,
					freeShip: null,
					totalPrice: orderAdminCreateBodyDto.totalPrice,
					createDate: moment(new Date()).format('yyyyMMDDHHmmss'),
					orderPayment: null,
					orderDetails: orderAdminCreateBodyDto.products.map(orderDetail => {
						return {
							quantity: orderDetail.quantity,
							product: {
								id: orderDetail.productId,
							},
						} as OrderDetailEntity;
					}),
					orderDiscounts: null,
					customer: {
						id: orderAdminCreateBodyDto.customerId,
					},
					pharmacist: {
						id: userId,
					},
					branch: {
						id: pharmacist.branch.id,
					},
					userSetting: null,
				},
			});

			// create order detail
			await this.orderDetailRepository.createMany({
				data: orderAdminCreateBodyDto.products.map(orderDetail => {
					return {
						quantity: orderDetail.quantity,
						product: {
							id: orderDetail.productId,
						},
						order: {
							id: newOrder.id,
						},
					};
				}),
			});

			// create product log & update product detail quantity
			for (const product of orderAdminCreateBodyDto.products) {
				await this.productService.updateStock({
					quantity: product.quantity,
					transactionDate: newOrder.createdAt,
					type: ENUM_TRANSACTION_TYPES.EXPORT,
					branchId: pharmacist.branch.id,
					productId: product.productId,
				});
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
}
