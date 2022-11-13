import { ProductLogEntity } from 'src/modules/product/entities/product-log.entity';
import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { snakeCase } from 'change-case';
import { IBranchEntity } from 'src/modules/location/interfaces';
import { ProductDetailEntity } from 'src/modules/product/entities';
import { OrderEntity } from 'src/modules/order/entities';

@Entity('branches')
export class BranchEntity
	extends DatabaseEntityAbstract
	implements IBranchEntity
{
	@Column()
	address: string;

	@ManyToOne(() => DistrictEntity, district => district.branches)
	@JoinColumn({ name: snakeCase('districtId'), referencedColumnName: 'id' })
	district: DistrictEntity;

	@OneToMany(() => ProductDetailEntity, productDetail => productDetail.branch)
	productDetails: ProductDetailEntity[];

	@OneToMany(() => ProductLogEntity, productLog => productLog.branch)
	productLogs: ProductLogEntity[];

	@OneToMany(() => OrderEntity, order => order.branch)
	orders: OrderEntity[];
}
