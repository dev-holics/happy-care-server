import { Global, Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from 'src/common/redis/services/redis.service';

@Global()
@Module({
	controllers: [],
	providers: [
		RedisService,
	],
	exports: [
		RedisService,
	],
	imports: [
		CacheModule.registerAsync({
			inject: [ConfigService],
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				isGlobal: true,
				store: redisStore,
				host: configService.get<string>('redis.host'),
				port: configService.get<number>('redis.port'),
				ttl: configService.get<number>('redis.ttl'),
			}),
		}),
	],
})
export class RedisModule {}
