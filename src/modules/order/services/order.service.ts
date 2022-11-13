import { ProductEntity } from './../../product/entities/product.entity';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import {
	OrderDetailRepository,
	OrderRepository,
} from 'src/modules/order/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import { OrderCreateBodyDto } from 'src/modules/order/dtos';
import {
	ENUM_ORDER_STATUS,
	ENUM_PAYMENT_TYPES,
	ENUM_VNPAY_COMMAND,
} from 'src/modules/order/constants/order.constant';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { OrderEntity } from '../entities';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly orderDetailRepository: OrderDetailRepository,
		private readonly configService: ConfigService,
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
				orderCode: moment(date).format('HHmmss'),
				status: ENUM_ORDER_STATUS.PROCESSING,
				paymentType: orderCreateBodyDto.paymentType,
				orderType: orderCreateBodyDto.orderType,
				totalPrice: orderCreateBodyDto.totalPrice,
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
					id: orderCreateBodyDto.branchId,
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
			vnp_Params.vnp_CreateDate = moment(date).format('yyyyMMDDHHmmss');
			vnp_Params.vnp_TxnRef = moment(date).format('HHmmss');

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

	returnUrl(query: any) {
		let vnp_Params = query;
		const secureHash = vnp_Params.vnp_SecureHash;

		delete vnp_Params.vnp_SecureHash;
		delete vnp_Params.vnp_SecureHashType;

		vnp_Params = this.sortObject(vnp_Params);

		const tmnCode = this.configService.get<string>('vnpay.payment.vnp_TmnCode');

		const secretKey = this.configService.get<string>(
			'vnpay.payment.vnp_HashSecret',
		);

		const signData = qs.stringify(vnp_Params, { encode: false });
		const hmac = crypto.createHmac('sha512', secretKey);
		const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

		if (secureHash === signed) {
			//Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

			return 'success';
		} else {
			return 'failes';
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
}
