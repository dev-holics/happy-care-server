import { registerAs } from '@nestjs/config';
import { version } from 'package.json';
import ms from 'ms';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';

export default registerAs(
	'app',
	(): Record<string, any> => ({
		name: process.env.APP_NAME || 'happy-care-server-app',
		env: process.env.APP_ENV || 'development',
		mode: process.env.APP_MODE || 'simple',
		language: process.env.APP_LANGUAGE || APP_LANGUAGE.VI,
		timezone: process.env.APP_TZ || 'Asia/Ho_Chi_Minh',

		version: process.env.APP_VERSION || '0.0.1',
		repoVersion: version,
		versioning: {
			on: process.env.APP_VERSIONING === 'true' || false,
			prefix: 'v',
		},

		http: {
			host: process.env.APP_HOST || 'localhost',
			port: Number(process.env.APP_PORT) || 3000,
		},

		globalPrefix: '/api',

		debug: process.env.APP_DEBUG === 'true' || false,
		debugger: {
			http: {
				maxFiles: 5,
				maxSize: '2M',
			},
			system: {
				active: false,
				maxFiles: ms('7d'),
				maxSize: '2m',
			},
		},

		httpOn: process.env.APP_HTTP_ON === 'true' || false,
		jobOn: process.env.APP_JOB_ON === 'true' || false,
	}),
);
