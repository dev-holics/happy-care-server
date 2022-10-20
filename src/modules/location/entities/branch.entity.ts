import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { snakeCase } from 'change-case';
import { IBranchEntity } from 'src/modules/location/interfaces';

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
}
