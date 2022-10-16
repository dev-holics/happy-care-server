import { BranchEntity } from './../entities/branch.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class BranchRepository extends DatabaseRepositoryAbstract<BranchEntity> {
	constructor(
		@InjectRepository(BranchEntity)
		private branchRepository: Repository<BranchEntity>,
	) {
		super(branchRepository);
	}
}
