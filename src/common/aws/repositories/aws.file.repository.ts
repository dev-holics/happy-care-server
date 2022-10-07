import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class AwsFileRepository extends DatabaseRepositoryAbstract<AwsFileEntity> {
	constructor(
		@InjectRepository(AwsFileEntity)
		private awsFileRepository: Repository<AwsFileEntity>,
	) {
		super(awsFileRepository);
	}
}
