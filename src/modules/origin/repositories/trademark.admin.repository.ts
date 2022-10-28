import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { TrademarkEntity } from 'src/modules/origin/entities';

@Injectable()
export class TrademarkAdminRepository extends DatabaseRepositoryAbstract<TrademarkEntity> {
	constructor(
		@InjectRepository(TrademarkEntity)
		private trademarkAdminRepository: Repository<TrademarkEntity>,
	) {
		super(trademarkAdminRepository);
	}
}
