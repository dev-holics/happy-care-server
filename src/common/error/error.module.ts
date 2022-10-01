import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ErrorHttpFilter } from 'src/common/error/filters/error.http.filter';
import { ErrorMetaGuard } from 'src/common/error/guards/error.meta.guard';

@Module({
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: ErrorHttpFilter,
		},
		{
			provide: APP_GUARD,
			useClass: ErrorMetaGuard,
		},
	],
	imports: [],
})
export class ErrorModule {}
