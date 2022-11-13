import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '.';
import { OrderEntity } from 'src/modules/order/entities';
import { IUserSetting } from 'src/modules/user/interfaces/user-setting.interface';

@Entity('user_settings')
export class UserSettingEntity
	extends DatabaseEntityAbstract
	implements IUserSetting
{
	@Column()
	address: string;

	@Column()
	phoneNumber: string;

	@OneToMany(() => OrderEntity, order => order.userSetting)
	orders: OrderEntity[];

	@ManyToOne(() => UserEntity, user => user.userSettings)
	@JoinColumn({ name: snakeCase('userId'), referencedColumnName: 'id' })
	user: UserEntity;

	@ManyToOne(() => DistrictEntity, district => district.userSettings)
	@JoinColumn({ name: snakeCase('districtId'), referencedColumnName: 'id' })
	district: DistrictEntity;
}
