import { registerAs } from '@nestjs/config';

export default registerAs(
	'database',
	(): Record<string, any> => ({
		type: process.env.DATABASE_TYPE || 'postgres',
		url: process.env.DATABASE_URL || 'postgresql://derek:123456@localhost:5432',
		host: process.env.DATABASE_HOST || 'localhost',
		port: Number(process.env.DATABASE_PORT) || 5432,
		name: process.env.DATABASE_NAME || 'happy-care-db',
		username: process.env.DATABASE_USER || 'derek',
		password: process.env.DATABASE_PASSWORD || '123456',
		synchronize: process.env.DATABASE_SYNC === 'true' || false,
		logging: process.env.DATABASE_LOGGING === 'true' || false,
		maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS) || 1000,
		sslEnabled: process.env.DATABASE_SSL_ENABLE === 'true' || false,
		rejectUnauthorized:
			process.env.DATABASE_REJECT_UNAUTHORIZED === 'true' || false,
		ca: process.env.DATABASE_CA || '',
		key: process.env.DATABASE_KEY || '',
		cert: process.env.DATABASE_CERT || '',
	}),
);
