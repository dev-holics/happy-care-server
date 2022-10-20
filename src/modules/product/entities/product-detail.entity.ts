import { BranchEntity } from 'src/modules/location/entities';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IProductDetailEntity } from 'src/modules/product/interfaces/product-detail.interface';
import { snakeCase } from 'change-case';
import { ProductEntity } from '.';

@Entity('product_details')
export class ProductDetailEntity
	extends DatabaseEntityAbstract
	implements IProductDetailEntity
{
	@Column()
	isAllowSell: boolean;

	@Column()
	quantity: number;

	@Column()
	packingSpec: string;

	@Column()
	unit: string;

	@Column({ type: 'date' })
	expiredDate: Date;

	@ManyToOne(() => ProductEntity, product => product.productDetails)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;

	@ManyToOne(() => BranchEntity, branch => branch.productDetails)
	@JoinColumn({ name: snakeCase('branchId'), referencedColumnName: 'id' })
	branch: BranchEntity;
}
