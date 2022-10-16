import { Module } from '@nestjs/common';
import { UserPublicService } from 'src/modules/user/services/user.public.service';
import { UserPublicRepository } from 'src/modules/user/repositories/user.public.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { RoleModule } from 'src/modules/role/role.module';

@Module({
	controllers: [],
	providers: [
		UserService,
		UserPublicService,
		UserRepository,
		UserPublicRepository
	],
	exports: [
		UserService,
		UserPublicService,
		UserRepository,
		UserPublicRepository,
	],
	imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
})
export class UserModule {}
