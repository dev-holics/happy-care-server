import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductModule {}
