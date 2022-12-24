import { BranchEntity } from 'src/modules/location/entities';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Unique,
} from 'typeorm';
import { IProductDetailEntity } from 'src/modules/product/interfaces/product-detail.interface';
import { snakeCase } from 'change-case';
import { ProductConsignmentEntity, ProductEntity } from '.';

@Entity('product_details')
@Unique(['product', 'branch'])
export class ProductDetailEntity
	extends DatabaseEntityAbstract
	implements IProductDetailEntity
{
	@OneToMany(
		() => ProductConsignmentEntity,
		productConsignment => productConsignment.productDetail,
	)
	productConsignments: ProductConsignmentEntity[];

	@ManyToOne(() => ProductEntity, product => product.productDetails)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;

	@ManyToOne(() => BranchEntity, branch => branch.productDetails)
	@JoinColumn({ name: snakeCase('branchId'), referencedColumnName: 'id' })
	branch: BranchEntity;
}
