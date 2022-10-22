import { Module } from '@nestjs/common';
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
import { UserModule } from 'src/modules/user/user.module';
import { ProductModule } from 'src/modules/product/product.module';
import { ProductPublicController } from 'src/modules/product/controllers/product.public.controller';

@Module({
	controllers: [UserPublicController, ProductPublicController],
	providers: [],
	exports: [],
	imports: [UserModule, ProductModule],
})
export class RoutesPublicModule {}
