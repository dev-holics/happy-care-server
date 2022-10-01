import Joi from 'joi';
import { APP_ENVIRONMENT, APP_LANGUAGE } from 'src/app/constants/app.constant';

export const validationSchema = Joi.object({
	APP_NAME: Joi.string().required(),
	APP_ENV: Joi.string()
		.valid(...Object.values(APP_ENVIRONMENT))
		.default(APP_ENVIRONMENT.DEVELOPMENT)
		.required(),
	APP_LANGUAGE: Joi.string()
		.valid(...Object.values(APP_LANGUAGE))
		.default(APP_LANGUAGE.VI)
		.required(),
	APP_TZ: Joi.string().default('Asia/Ho_Chi_Minh').required(),

	APP_HOST: [
		Joi.string().ip({ version: 'ipv4' }).required(),
		Joi.string().required(),
	],
	APP_PORT: Joi.number().default(3000).required(),
	APP_DEBUG: Joi.boolean().default(true).required(),

	APP_VERSION: Joi.string().required(),
	APP_VERSIONING: Joi.boolean().default(true).required(),

	APP_DOC_NAME: Joi.string().required(),
	APP_DOC_VERSION: Joi.number().required(),

	APP_HTTP_ON: Joi.boolean().default(true).required(),
	APP_JOB_ON: Joi.boolean().default(false).required(),

	DATABASE_TYPE: Joi.string().default('postgres').optional(),
	DATABASE_HOST: Joi.string().default('localhost').required(),
	DATABASE_NAME: Joi.any().default('happy-care-db'),
	DATABASE_USERNAME: Joi.any().optional(),
	DATABASE_PASSWORD: Joi.any().optional(),
	DATABASE_SYNC: Joi.string().default('true').required(),

	AUTH_JWT_SUBJECT: Joi.string().required(),
	AUTH_JWT_AUDIENCE: Joi.string().required(),
	AUTH_JWT_ISSUER: Joi.string().required(),
	AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
		.alphanum()
		.min(5)
		.max(50)
		.required(),
	AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('30m').required(),
	AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
		.alphanum()
		.min(5)
		.max(50)
		.required(),
	AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('7d').required(),
	AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED: Joi.string()
		.default('30d')
		.required(),
	AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string().required(),
});
