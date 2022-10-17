import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from './user.get.serialization';
import { ImageSerialization } from 'src/common/media/serializations/image.serialization';

export class UserPayloadSerialization extends OmitType(UserGetSerialization, [
	'photo',
] as const) {
	@Exclude()
	readonly photo?: ImageSerialization;
}
