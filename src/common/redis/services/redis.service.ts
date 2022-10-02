import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RedisServiceAbstract } from 'src/common/redis/abstracts/redis.service.abstract';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { REDIS_KEY } from 'src/common/helper/constants';
import { IRedisService } from 'src/common/redis/interfaces/redis.service.interface';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

@Injectable()
export class RedisService
	extends RedisServiceAbstract
	implements IRedisService
{
	private ttl: number;

	constructor(
		private readonly configService: ConfigService,
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
	) {
		super(cacheService);
		this.ttl = this.configService.get<number>('redis.ttl');
	}

	accessToken(tokenId: string, ttl: number = this.ttl) {
		const redisKey = `${REDIS_KEY.ACCESS_TOKEN}:${tokenId}`;
		const cacheConfig = { ttl };

		return {
			get: () => this.get(redisKey),
			set: (accessToken: any) => this.set(redisKey, accessToken, cacheConfig),
			delete: () => this.cacheService.del(redisKey),
		};
	}

	refreshToken(tokenId: string, ttl: number = this.ttl) {
		const redisKey = `${REDIS_KEY.REFRESH_TOKEN}:${tokenId}`;
		const cacheConfig = { ttl };

		return {
			get: () => this.cacheService.get(redisKey),
			set: (refreshToken: any) => this.set(redisKey, refreshToken, cacheConfig),
			delete: () => this.cacheService.del(redisKey),
		};
	}

	appPermission(ttl: number = this.ttl) {
		const redisKey = `${REDIS_KEY.APP_PERMISSION}`;
		const cacheConfig = { ttl };

		return {
			get: () => this.cacheService.get<PermissionEntity[]>(redisKey),
			set: (permissions: any) => this.set(redisKey, permissions, cacheConfig),
			delete: () => this.cacheService.del(redisKey),
		};
	}
}