import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { IRoleEntity } from 'src/modules/role/interfaces/role.entity.interface';
import { ImageEntity } from 'src/common/media/entities/image.entity';

export interface IUserEntity {
	phoneNumber: string;

	password: string;

	email: string;

	fullname: string;

	gender: string;

	birthday: Date;

	tokens: TokenEntity[];

	photos: ImageEntity[];

	role: IRoleEntity;
}
