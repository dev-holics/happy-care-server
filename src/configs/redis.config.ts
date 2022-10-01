import { registerAs } from '@nestjs/config';

export default registerAs(
	'redis',
	(): Record<string, any> => ({
		host: process.env.REDIS_HOST || 'localhost',
		port: Number(process.env.REDIS_PORT) || 6379,
		ttl: Number(process.env.REDIS_TTL) || 86400,
	}),
);
