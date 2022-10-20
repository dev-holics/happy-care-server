import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { TrademarkEntity } from '.';
import { IOriginInterface } from 'src/modules/made/interfaces';

@Entity('origins')
export class OriginEntity
	extends DatabaseEntityAbstract
	implements IOriginInterface
{
	@Column({ unique: true })
	name: string;

	@OneToMany(() => TrademarkEntity, trademark => trademark.origin)
	trademarks: TrademarkEntity[];
}
