import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { OriginEntity } from 'src/modules/origin/entities';

@Injectable()
export class OriginAdminRepository extends DatabaseRepositoryAbstract<OriginEntity> {
	constructor(
		@InjectRepository(OriginEntity)
		private originAdminRepository: Repository<OriginEntity>,
	) {
		super(originAdminRepository);
	}
}
