import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ENUM_AUTH_TOKEN_TYPES } from 'src/common/auth/constants';
import { snakeCase } from 'change-case';
import { ITokenEntity } from 'src/common/auth/interfaces/auth.token.entity.interface';

@Entity('tokens')
export class TokenEntity
	extends DatabaseEntityAbstract
	implements ITokenEntity
{
	@Column({
		length: 2000,
	})
	token: string;

	@Column({
		enum: ENUM_AUTH_TOKEN_TYPES,
	})
	type: string;

	@Column({
		default: '',
	})
	origin: string;

	@Column({
		type: 'timestamp',
	})
	expiredTime: Date;

	@ManyToOne(() => UserEntity, user => user.tokens)
	@JoinColumn({ name: snakeCase('userId'), referencedColumnName: 'id' })
	user: UserEntity;
}
