import { Global, Module } from '@nestjs/common';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';

@Global()
@Module({
	providers: [
		DatabaseOptionsService,
		DatabaseTransactionService,
	],
	exports: [
		DatabaseOptionsService,
		DatabaseTransactionService,
	],
	imports: [],
})
export class DatabaseModule {}
