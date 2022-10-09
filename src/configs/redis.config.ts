import { registerAs } from '@nestjs/config';

export default registerAs(
	'redis',
	(): Record<string, any> => ({
		url: process.env.REDIS_URL || 'redis://localhost:6379',
		host: process.env.REDIS_HOST || 'localhost',
		port: Number(process.env.REDIS_PORT) || 6379,
		ttl: Number(process.env.REDIS_TTL) || 86400,
	}),
);
