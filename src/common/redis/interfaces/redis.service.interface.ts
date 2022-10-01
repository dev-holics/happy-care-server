export interface IRedisService {
	accessToken(
		tokenId: string,
		ttl: number,
	): {
		get: () => Promise<any>;
		set: (accessToken: any) => Promise<any>;
		delete: () => Promise<any>;
	};

	refreshToken(
		tokenId: string,
		ttl: number,
	): {
		get: () => Promise<any>;
		set: (refreshToken: any) => Promise<any>;
		delete: () => Promise<any>;
	};

	appPermission(ttl: number): {
		get: () => Promise<any>;
		set: (permissions: any) => Promise<any>;
		delete: () => Promise<any>;
	};
}
