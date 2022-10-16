import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';
import { IRoleEntity } from 'src/modules/role/interfaces/role.entity.interface';

export interface IUserEntity {
	phoneNumber: string;

	password: string;

	email: string;

	fullname: string;

	gender: string;

	birthday: Date;

	tokens: TokenEntity[];

	photo: AwsFileEntity;

	role: IRoleEntity;
}
