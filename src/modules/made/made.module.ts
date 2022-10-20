import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginEntity, TrademarkEntity } from 'src/modules/made/entities';

@Module({
	imports: [TypeOrmModule.forFeature([OriginEntity, TrademarkEntity])],
})
export class MadeModule {}
