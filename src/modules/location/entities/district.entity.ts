import { UserSettingEntity } from 'src/modules/user/entities';
import { BranchEntity } from 'src/modules/location/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IDistrictEntity } from 'src/modules/location/interfaces';
import { CityEntity } from 'src/modules/location/entities';
import { snakeCase } from 'change-case';

@Entity('districts')
export class DistrictEntity
	extends DatabaseEntityAbstract
	implements IDistrictEntity
{
	@Column({})
	name: string;

	@ManyToOne(() => CityEntity, city => city.districts)
	@JoinColumn({ name: snakeCase('cityId'), referencedColumnName: 'id' })
	city: CityEntity;

	@OneToMany(() => BranchEntity, branch => branch.district)
	branches: BranchEntity[];

	@OneToMany(() => UserSettingEntity, userSetting => userSetting.district)
	userSettings: UserSettingEntity[];
}
