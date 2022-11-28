import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IDatabaseTransactionService } from 'src/common/database/interfaces/database.transaction-service.interface';

@Injectable()
export class DatabaseTransactionService implements IDatabaseTransactionService {
	constructor(private readonly dataSource: DataSource) {}

	async getQueryRunner(): Promise<QueryRunner> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		return queryRunner;
	}
}
