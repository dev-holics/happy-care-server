import { registerAs } from '@nestjs/config';
import ms from 'ms';

export default registerAs(
	'helper',
	(): Record<string, any> => ({
		salt: {
			length: 8,
		},
		jwt: {
			secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY || '123456',
			expirationTime: String(
				ms(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED || '1h'),
			),
			notBeforeExpirationTime: ms(0),
		},
	}),
);
