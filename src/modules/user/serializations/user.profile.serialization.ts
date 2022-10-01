import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization';

export class UserProfileSerialization extends OmitType(UserGetSerialization, [
	'createdAt',
]) {
	@Exclude()
	readonly createdAt: Date;
}
