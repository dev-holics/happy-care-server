import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderDetailEntity } from 'src/modules/order/entities';

@Module({
	imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
})
export class OrderModule {}
