import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesPublicModule } from 'src/router/routes/routes.public.module';
import { RoutesModule } from 'src/router/routes/routes.module';

@Module({})
export class RouterModule {
	static register(): DynamicModule {
		if (process.env.APP_HTTP_ON === 'true') {
			return {
				module: RouterModule,
				controllers: [],
				providers: [],
				exports: [],
				imports: [
					RoutesModule,
					RoutesPublicModule,
					NestJsRouterModule.register([
						{
							path: '/',
							module: RoutesModule,
						},
						{
							path: '/public',
							module: RoutesPublicModule,
						},
					]),
				],
			};
		}

		return {
			module: RouterModule,
			controllers: [],
			providers: [],
			exports: [],
			imports: [],
		};
	}
}
