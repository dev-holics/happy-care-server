import { Column, Entity, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ICityEntity } from 'src/modules/location/interfaces';
import { DistrictEntity } from 'src/modules/location/entities';

@Entity('cities')
export class CityEntity extends DatabaseEntityAbstract implements ICityEntity {
	@Column({
		unique: true,
	})
	name: string;

	@OneToMany(() => DistrictEntity, district => district.city)
	districts: DistrictEntity[];
}
