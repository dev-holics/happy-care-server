import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrderAdminRepository } from 'src/modules/order/repositories';
import { OrderAdminCreateBodyDto } from 'src/modules/order/dtos';
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

@Injectable()
export class OrderAdminService {
	constructor(
		private readonly orderAdminRepository: OrderAdminRepository,
		private readonly userRepository: UserRepository,
	) {}

	async createOrder(
		userId: string,
		orderAdminCreateBodyDto: OrderAdminCreateBodyDto,
	) {
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
				message: 'auth.error.permissionForbidden',
			});
		}

		return this.orderAdminRepository.createOne({
			data: {
				orderCode: faker.datatype.uuid(),
				paymentType: orderAdminCreateBodyDto.paymentType,
				orderType: ENUM_ORDER_TYPES.OFFLINE_STORE,
				status: ENUM_ORDER_STATUS.SUCCESS,
				freeShip: null,
				totalPrice: orderAdminCreateBodyDto.totalPrice,
				createDate: moment(new Date()).format('yyyyMMDDHHmmss'),
				orderPayment: null,
				orderDetails: orderAdminCreateBodyDto.products,
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
	}
}
