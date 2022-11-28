import { UserCreateDto } from 'src/modules/user/dtos';
import { OmitType } from '@nestjs/swagger';

export class UserSignUpDto extends OmitType(UserCreateDto, ['role'] as const) {}
