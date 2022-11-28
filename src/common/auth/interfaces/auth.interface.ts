// Auth API
export interface IAuthApiPayload {
	_id: string;
	key: string;
	name: string;
}

export interface IAuthApiRequestHashedData {
	key: string;
	timestamp: number;
	hash: string;
}

// Auth
export interface IAuthPassword {
	salt: string;
	passwordHash: string;
}

export interface IAuthPayloadOptions {
	loginDate: Date;
}

export interface IAuthPermission {
	code: number;
	name: string;
	description?: string;
	module?: string;
	isActive?: boolean;
}

export interface IAuthRefreshTokenOptions {
	// in milis
	notBeforeExpirationTime?: number | string;
	rememberMe?: boolean;
}
