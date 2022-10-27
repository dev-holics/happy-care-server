import { CartService } from 'src/modules/cart/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
	CartRepository,
	CartItemRepository,
} from 'src/modules/cart/repositories';
import { CartItemEntity, CartEntity } from 'src/modules/cart/entities';

@Module({
	imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity])],
	providers: [CartRepository, CartItemRepository, CartService],
	exports: [CartRepository, CartItemRepository, CartService],
})
export class CartModule {}
