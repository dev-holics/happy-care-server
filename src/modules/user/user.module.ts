import { Module } from '@nestjs/common';
import { UserPublicService } from 'src/modules/user/services/user.public.service';
import { UserPublicRepository } from 'src/modules/user/repositories/user.public.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { RoleModule } from 'src/modules/role/role.module';
import { UserSettingRepository } from 'src/modules/user/repositories/user-setting.repository';
import { UserSettingService } from 'src/modules/user/services/user-setting.service';
import { UserSettingEntity } from 'src/modules/user/entities';

@Module({
	controllers: [],
	providers: [
		UserService,
		UserPublicService,
		UserSettingService,
		UserRepository,
		UserPublicRepository,
		UserSettingRepository,
	],
	exports: [
		UserService,
		UserPublicService,
		UserSettingService,
		UserRepository,
		UserPublicRepository,
		UserSettingRepository,
	],
	imports: [
		TypeOrmModule.forFeature([UserEntity, UserSettingEntity]),
		RoleModule,
	],
})
export class UserModule {}
