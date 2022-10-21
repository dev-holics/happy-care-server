import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesPublicModule } from 'src/router/routes/routes.public.module';
import { RoutesModule } from 'src/router/routes/routes.module';
import { RoutesAdminModule } from 'src/router/routes/routes.admin.module';

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
					RoutesAdminModule,
					RoutesPublicModule,
					NestJsRouterModule.register([
						{
							path: '/',
							module: RoutesModule,
						},
						{
							path: '/admin',
							module: RoutesAdminModule,
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
