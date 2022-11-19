import { IOrderEntity } from 'src/modules/order/interfaces/order.interface';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import {
	ENUM_ORDER_STATUS,
	ENUM_ORDER_TYPES,
	ENUM_PAYMENT_TYPES,
} from 'src/modules/order/constants/order.constant';
import { OrderDetailEntity, OrderDiscountEntity, OrderPaymentEntity } from '.';
import { BranchEntity } from 'src/modules/location/entities';
import { snakeCase } from 'change-case';
import { UserSettingEntity } from 'src/modules/user/entities';

@Entity('orders')
export class OrderEntity
	extends DatabaseEntityAbstract
	implements IOrderEntity
{
	@Column({
		unique: true,
	})
	orderCode: string;

	@Column({
		enum: ENUM_PAYMENT_TYPES,
	})
	paymentType: string;

	@Column({
		enum: ENUM_ORDER_TYPES,
	})
	orderType: string;

	@Column({
		enum: ENUM_ORDER_STATUS,
	})
	status: string;

	@Column({
		nullable: true,
	})
	freeShip: boolean;

	@Column()
	totalPrice: number;

	@Column()
	createDate: string;

	@OneToOne(() => OrderPaymentEntity)
	@JoinColumn()
	orderPayment: OrderPaymentEntity;

	@OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.order)
	orderDetails: OrderDetailEntity[];

	@OneToMany(() => OrderDiscountEntity, orderDiscount => orderDiscount.order, {
		nullable: true,
	})
	orderDiscounts: OrderDiscountEntity[];

	@ManyToOne(() => UserEntity, user => user.orderCustomers)
	@JoinColumn({ name: snakeCase('customerId'), referencedColumnName: 'id' })
	customer: UserEntity;

	@ManyToOne(() => UserEntity, user => user.orderPharmacists, {
		nullable: true,
	})
	@JoinColumn({ name: snakeCase('pharmacistId'), referencedColumnName: 'id' })
	pharmacist: UserEntity;

	@ManyToOne(() => BranchEntity, branch => branch.orders, {
		nullable: true,
	})
	@JoinColumn({ name: snakeCase('branchId'), referencedColumnName: 'id' })
	branch: BranchEntity;

	@ManyToOne(() => UserSettingEntity, userSetting => userSetting.orders)
	@JoinColumn({ name: snakeCase('userSettingId'), referencedColumnName: 'id' })
	userSetting: UserSettingEntity;
}
