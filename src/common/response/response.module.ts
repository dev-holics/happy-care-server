import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTimeoutInterceptor } from 'src/common/response/interceptors/response.timeout.interceptor';
import { ResponseCustomHeadersInterceptor } from 'src/common/response/interceptors/response.custom-headers.interceptor';

@Module({
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseTimeoutInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseCustomHeadersInterceptor,
		},
	],
	imports: [],
})
export class ResponseModule {}
