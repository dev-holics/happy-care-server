import { ITrademarkInterface } from 'src/modules/made/interfaces/trademark.interface';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OriginEntity } from '.';
import { snakeCase } from 'change-case';
import { ProductEntity } from 'src/modules/product/entities';

@Entity('trademarks')
export class TrademarkEntity
	extends DatabaseEntityAbstract
	implements ITrademarkInterface
{
	@Column({ unique: true })
	name: string;

	@ManyToOne(() => OriginEntity, origin => origin.trademarks)
	@JoinColumn({ name: snakeCase('originId'), referencedColumnName: 'id' })
	origin: OriginEntity;

	@OneToMany(() => ProductEntity, product => product.trademark)
	products: ProductEntity[];
}
