import { Cache, CachingConfig } from 'cache-manager';
import { IRedisServiceAbstract } from 'src/common/redis/interfaces/redis.service-abstract.interface';

export abstract class RedisServiceAbstract implements IRedisServiceAbstract {
	protected _cacheService: Cache;

	protected constructor(cacheService: Cache) {
		this._cacheService = cacheService;
	}

	async get(key: string): Promise<any> {
		const data = await this._cacheService.get<string>(key);
		return JSON.parse(data);
	}

	async set(key: string, data: any, options?: CachingConfig): Promise<any> {
		const stringifyData = JSON.stringify(data);
		return this._cacheService.set(key, stringifyData, options);
	}

	async delete(key: string): Promise<any> {
		return this._cacheService.del(key);
	}

	async resetRedis(): Promise<void> {
		return this._cacheService.reset();
	}
}
