import { BranchEntity } from 'src/modules/location/entities';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ENUM_TRANSACTION_TYPES } from 'src/modules/product/constants';
import { snakeCase } from 'change-case';
import { IProductLogEntity } from 'src/modules/product/interfaces';
import { ProductEntity } from '.';
import { OrderEntity } from 'src/modules/order/entities';

@Entity('product_logs')
export class ProductLogEntity
	extends DatabaseEntityAbstract
	implements IProductLogEntity
{
	@Column()
	quantity: number;

	@Column()
	transactionDate: Date;

	@Column({
		enum: ENUM_TRANSACTION_TYPES,
	})
	type: string;

	@Column({ type: 'date', nullable: true })
	expired: Date;

	@ManyToOne(() => OrderEntity, order => order.productLogs, { nullable: true })
	@JoinColumn({ name: snakeCase('orderId'), referencedColumnName: 'id' })
	order: OrderEntity;

	@ManyToOne(() => BranchEntity, branch => branch.productLogs)
	@JoinColumn({ name: snakeCase('branchId'), referencedColumnName: 'id' })
	branch: BranchEntity;

	@ManyToOne(() => ProductEntity, product => product.productLogs)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;
}
