import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
	controllers: [UserPublicController],
	providers: [],
	exports: [],
	imports: [UserModule],
})
export class RoutesPublicModule {}
