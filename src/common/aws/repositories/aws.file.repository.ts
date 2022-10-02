import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';

@Injectable()
export class AwsFileRepository {
	constructor(
		@InjectRepository(AwsFileEntity)
		private userRepository: Repository<AwsFileEntity>,
	) {}
}
