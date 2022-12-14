import { ProductEntity } from 'src/modules/product/entities';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { TrademarkEntity } from '.';
import { IOriginInterface } from 'src/modules/origin/interfaces';

@Entity('origins')
export class OriginEntity
	extends DatabaseEntityAbstract
	implements IOriginInterface
{
	@Column({ unique: true })
	name: string;

	@OneToMany(() => TrademarkEntity, trademark => trademark.origin)
	trademarks: TrademarkEntity[];

	@OneToMany(() => ProductEntity, product => product.origin)
	products: ProductEntity[];
}
