import { IsEnum } from 'class-validator';
import { ENUM_ORDER_STATUS } from 'src/modules/order/constants/order.constant';

export class UpdateOrderStatusDto {
	@IsEnum(ENUM_ORDER_STATUS)
	status: ENUM_ORDER_STATUS;
}
