/* eslint-disable @typescript-eslint/no-use-before-define */
import * as fs from 'fs';
import morgan from 'morgan';
import { isEmpty } from 'radash';
import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app/app.module';
import { useContainer } from 'class-validator';
import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';
import { ResponsePagingSerialization } from 'src/common/response/serializations/response.paging.serialization';
import winston from 'winston';
import winstonElasticsearch from 'winston-elasticsearch';
import userAgentParser from 'ua-parser-js';
import * as Sentry from '@sentry/node';

async function bootstrap() {
	Sentry.init({
		dsn: process.env.DNS,
		tracesSampleRate: 1.0,
	});

	const esTransportOpts = {
		indexPrefix: 'logging-api',
		indexSuffixPattern: 'pbl',
		clientOpts: {
			node: process.env.ELK_URI || 'https://8c72-164-92-71-38.eu.ngrok.io',
			maxRetries: 5,
			requestTimeout: 10000,
			sniffOnStart: false,
		},
		source: 'api',
	};
	const esTransport = new winstonElasticsearch.ElasticsearchTransport(
		esTransportOpts,
	);

	const logger = winston.createLogger({
		transports: [new winston.transports.Console(), esTransport],
	});

	const morganJSONFormat = () =>
		JSON.stringify({
			method: ':method',
			url: ':url',
			http_version: ':http-version',
			remote_addr: ':remote-addr',
			remote_addr_forwarded: ':req[x-forwarded-for]', //Get a specific header
			response_time: ':response-time',
			status: ':status',
			content_length: ':res[content-length]',
			timestamp: ':date[iso]',
			user_agent: ':user-agent',
		});

	function parseUserAgent(data) {
		if (data.user_agent) {
			const ua = userAgentParser(data.user_agent);
			if (ua.browser) {
				data.user_agent_browser_name = ua.browser.name;
				data.user_agent_browser_version =
					ua.browser.major || ua.browser.version;
			}
			if (ua.os) {
				data.user_agent_os_name = ua.os.name;
				data.user_agent_os_version = ua.os.version;
			}
		}
	}

	function sanitizeUrl(data) {
		if (!data.url) {
			return;
		}
		const regex = /\/[0-9]+/g;
		const urlWithoutParameter = data.url.replace(regex, '/:id');
		data.url_sanitized = urlWithoutParameter;
	}

	let httpsOptions = {};

	if (process.env.APP_ENV === 'production') {
		httpsOptions = {
			key: fs.readFileSync('./secrets/private-key.pem'),
			cert: fs.readFileSync('./secrets/public-certificate.pem'),
		};
	}

	let app: NestApplication;

	try {
		if (isEmpty(httpsOptions)) {
			app = await NestFactory.create(AppModule, {
				abortOnError: false,
			});
		}
		if (!isEmpty(httpsOptions)) {
			app = await NestFactory.create(AppModule, {
				abortOnError: false,
				httpsOptions,
			});
		}

		const configService = app.get(ConfigService);
		const appName: string = configService.get<string>('app.name');
		const env: string = configService.get<string>('app.env');
		const mode: string = configService.get<string>('app.mode');
		const tz: string = configService.get<string>('app.timezone');
		const host: string = configService.get<string>('app.http.host');
		const port: number = configService.get<number>('app.http.port');
		const globalPrefix: string = configService.get<string>('app.globalPrefix');
		const versioning: boolean = configService.get<boolean>('app.versioning.on');
		const versioningPrefix: string = configService.get<string>(
			'app.versioning.prefix',
		);
		const version: string = configService.get<string>('app.version');
		process.env.TZ = tz;
		process.env.NODE_ENV = env;

		// Global
		app.setGlobalPrefix(globalPrefix);
		app.useGlobalPipes(new ValidationPipe());
		useContainer(app.select(AppModule), { fallbackOnErrors: true });

		// Morgan Http
		app.use(
			morgan(morganJSONFormat(), {
				stream: {
					write: message => {
						const data = JSON.parse(message);
						parseUserAgent(data);
						sanitizeUrl(data);
						return logger.info(message, data);
					},
				},
			}),
		);

		// Versioning
		if (versioning) {
			app.enableVersioning({
				type: VersioningType.URI,
				defaultVersion: version,
				prefix: versioningPrefix,
			});
		}

		// Swagger
		const docName: string = configService.get<string>('doc.name');
		const docDesc: string = configService.get<string>('doc.description');
		const docVersion: string = configService.get<string>('doc.version');
		const docPrefix: string = configService.get<string>('doc.prefix');

		if (env !== 'production') {
			const documentConfig = new DocumentBuilder()
				.setTitle(docName)
				.setDescription(docDesc)
				.setVersion(docVersion)
				.addTag("API's")
				.addBearerAuth(
					{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
					'accessToken',
				)
				.addBearerAuth(
					{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
					'refreshToken',
				);

			if (mode === 'secure') {
				documentConfig.addApiKey(
					{ type: 'apiKey', in: 'header', name: 'x-api-key' },
					'apiKey',
				);
			}
			const documentBuild = documentConfig.build();

			const document = SwaggerModule.createDocument(app, documentBuild, {
				deepScanRoutes: true,
				extraModels: [
					ResponseDefaultSerialization,
					ResponsePagingSerialization,
				],
			});

			SwaggerModule.setup(docPrefix, app, document, {
				explorer: true,
				customSiteTitle: docName,
				swaggerOptions: {
					operationsSorter: 'method',
					docExpansion: 'list',
				},
			});
		}
		// Listen
		await app.listen(port, host);
		const loggerCommon = new Logger();

		loggerCommon.log(
			`==========================================================`,
		);
		loggerCommon.log(`${appName} Environment is ${env}`, 'NestApplication');
		loggerCommon.log(
			`App Language is ${configService.get<string>('app.language')}`,
			'NestApplication',
		);
		loggerCommon.log(
			`App Debug is ${configService.get<boolean>('app.debug')}`,
			'NestApplication',
		);
		loggerCommon.log(`App Versioning is ${versioning}`, 'NestApplication');
		loggerCommon.log(
			`App Http is ${configService.get<boolean>('app.httpOn')}`,
			'NestApplication',
		);
		loggerCommon.log(
			`App Task is ${configService.get<boolean>('app.jobOn')}`,
			'NestApplication',
		);
		loggerCommon.log(`App Timezone is ${tz}`, 'NestApplication');

		loggerCommon.log(
			`==========================================================`,
		);

		loggerCommon.log(`Docs will serve on ${await app.getUrl()}${docPrefix}`);
		loggerCommon.log(`Docs version is ${docVersion}`);

		loggerCommon.log(
			`==========================================================`,
		);

		loggerCommon.log(
			`Database running on ${configService.get<string>(
				'database.host',
			)}/${configService.get<string>('database.name')}`,
			'NestApplication',
		);
		loggerCommon.log(
			`Server running on ${await app.getUrl()}`,
			'NestApplication',
		);

		loggerCommon.log(
			`==========================================================`,
		);

		logger.info(`Server running on ${await app.getUrl()}`, 'NestApplication');
	} catch (error) {
		Sentry.captureException(error);
		Sentry.captureMessage(`${error.message}`);
	}
}
bootstrap();
