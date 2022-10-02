import { UserCreateDto } from './user.create.dto';
import { OmitType } from '@nestjs/swagger';

export class UserSignUpDto extends OmitType(UserCreateDto, ['role'] as const) {}
