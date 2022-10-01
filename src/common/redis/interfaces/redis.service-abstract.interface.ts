import { CachingConfig } from 'cache-manager';

export interface IRedisServiceAbstract {
	get(key: string): Promise<any>;

	set(key: string, data: any, options?: CachingConfig): Promise<any>

	delete(key: string): Promise<any>;

	resetRedis(): Promise<void>
}
