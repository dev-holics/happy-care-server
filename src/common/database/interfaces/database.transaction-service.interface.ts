import { QueryRunner } from 'typeorm';

export interface IDatabaseTransactionService {
	getQueryRunner(): Promise<QueryRunner>;
}
