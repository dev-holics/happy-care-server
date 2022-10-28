import {
	OriginAdminService,
	OriginPublicService,
	TrademarkAdminService,
	TrademarkPublicService,
} from 'src/modules/origin/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginEntity, TrademarkEntity } from 'src/modules/origin/entities';
import {
	OriginAdminRepository,
	OriginPublicRepository,
	TrademarkAdminRepository,
	TrademarkPublicRepository,
} from 'src/modules/origin/repositories';

@Module({
	imports: [TypeOrmModule.forFeature([OriginEntity, TrademarkEntity])],
	providers: [
		OriginAdminService,
		OriginPublicService,
		TrademarkAdminService,
		TrademarkPublicService,
		OriginAdminRepository,
		OriginPublicRepository,
		TrademarkAdminRepository,
		TrademarkPublicRepository,
	],
	exports: [
		OriginAdminService,
		OriginPublicService,
		TrademarkAdminService,
		TrademarkPublicService,
		OriginAdminRepository,
		OriginPublicRepository,
		TrademarkAdminRepository,
		TrademarkPublicRepository,
	],
})
export class OriginModule {}
