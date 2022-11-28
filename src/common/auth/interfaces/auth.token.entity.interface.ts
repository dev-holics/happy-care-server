import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface ITokenEntity {
	token: string;

	type: string;

	origin: string;

	expiredTime: Date;

	user: UserEntity;
}
