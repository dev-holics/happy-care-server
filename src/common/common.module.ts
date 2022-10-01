import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';

import configs from 'src/configs';
import { validationSchema } from 'src/configs/validation.schema.config';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { RequestModule } from 'src/common/request/request.module';
import { ErrorModule } from 'src/common/error/error.module';
import {
	DebuggerModule,
	DebuggerOptionsModule,
} from 'src/common/debugger/debugger.module';
import { MessageModule } from 'src/common/message/message.module';
import { ResponseModule } from 'src/common/response/response.module';
import { DebuggerOptionService } from 'src/common/debugger/services/debugger.options.service';
import { MiddlewareModule } from 'src/common/middleware/middleware.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			load: configs,
			ignoreEnvFile: false,
			isGlobal: true,
			cache: true,
			envFilePath: ['.env'],
			expandVariables: true,
			validationSchema,
			validationOptions: {
				allowUnknown: true,
				abortEarly: true,
			},
		}),
		WinstonModule.forRootAsync({
			inject: [DebuggerOptionService],
			imports: [DebuggerOptionsModule],
			useFactory: (debuggerOptionsService: DebuggerOptionService) =>
				debuggerOptionsService.createLogger(),
		}),
		TypeOrmModule.forRootAsync({
			inject: [DatabaseOptionsService],
			imports: [DatabaseModule],
			useFactory: (databaseOptionsService: DatabaseOptionsService) =>
				databaseOptionsService.createTypeOrmOptions(DATABASE_CONNECTION_NAME),
		}),
		HelperModule,
		RedisModule,
		AuthModule,
		MessageModule,
		PaginationModule,
		ErrorModule,
		DebuggerModule,
		ResponseModule,
		RequestModule,
		MiddlewareModule,
		AwsModule,
	],
})
export class CommonModule {}
