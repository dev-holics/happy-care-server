import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { ENUM_GENDERS } from 'src/modules/user/constants';
import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { IUserEntity } from 'src/modules/user/interfaces/user.entity.interface';
import { ImageEntity } from 'src/common/media/entities/image.entity';

@Entity('users')
export class UserEntity extends DatabaseEntityAbstract implements IUserEntity {
	@Column({
		length: 20,
		unique: true,
	})
	phoneNumber: string;

	@Column({
		length: 2000,
	})
	password: string;

	@Column({
		nullable: true,
	})
	email: string;

	@Column({
		nullable: true,
	})
	fullname: string;

	@Column({
		nullable: true,
		enum: ENUM_GENDERS,
	})
	gender: string;

	@Column({
		nullable: true,
		type: 'date',
	})
	birthday: Date;

	@OneToMany(() => TokenEntity, token => token.user)
	tokens: TokenEntity[];

	@ManyToOne(() => ImageEntity, image => image.users)
	@JoinColumn({ name: snakeCase('photoId'), referencedColumnName: 'id' })
	photo: ImageEntity;

	@ManyToOne(() => RoleEntity, role => role.users)
	@JoinColumn({ name: snakeCase('roleId'), referencedColumnName: 'id' })
	role: RoleEntity;
}
