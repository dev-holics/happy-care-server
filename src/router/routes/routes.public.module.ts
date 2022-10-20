import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
	controllers: [UserPublicController, CategoryPublicController],
	providers: [],
	exports: [],
	imports: [UserModule, CategoryModule],
})
export class RoutesPublicModule {}
