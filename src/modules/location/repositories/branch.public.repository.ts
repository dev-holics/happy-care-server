import { BranchEntity } from './../entities/branch.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class BranchPublicRepository extends DatabaseRepositoryAbstract<BranchEntity> {
	constructor(
		@InjectRepository(BranchEntity)
		private branchPublicRepository: Repository<BranchEntity>,
	) {
		super(branchPublicRepository);
	}
}
