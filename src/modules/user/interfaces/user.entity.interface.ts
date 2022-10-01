import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';

export interface IUserEntity {
	phoneNumber: string;

	password: string;

	email: string;

	fullname: string;

	gender: string;

	tokens: TokenEntity[];

	photo: AwsFileEntity;
}
