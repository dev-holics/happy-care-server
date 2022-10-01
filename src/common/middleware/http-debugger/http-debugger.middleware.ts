import morgan from 'morgan';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createStream } from 'rotating-file-stream';
import { ConfigService } from '@nestjs/config';
import {
	ICustomResponse,
	IHttpDebuggerConfig,
	IHttpDebuggerConfigOptions,
} from './http-debugger.interface';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import {
	DEBUGGER_HTTP_FORMAT,
	DEBUGGER_HTTP_NAME,
} from './constants/http-debugger.constant';

@Injectable()
export class HttpDebuggerMiddleware implements NestMiddleware {
	private readonly maxSize: string;

	private readonly maxFiles: number;

	constructor(
		private readonly configService: ConfigService,
		private readonly helperDateService: HelperDateService,
	) {
		this.maxSize = this.configService.get<string>('app.debugger.http.maxSize');
		this.maxFiles = this.configService.get<number>(
			'app.debugger.http.maxFiles',
		);
	}

	private customToken(): void {
		morgan.token('req-params', (req: Request) => JSON.stringify(req.params));

		morgan.token('req-body', (req: Request) => JSON.stringify(req.body));

		morgan.token('res-body', (req: Request, res: ICustomResponse) => res.body);

		morgan.token('req-headers', (req: Request) => JSON.stringify(req.headers));
	}

	private async httpLogger(): Promise<IHttpDebuggerConfig> {
		const date: string = this.helperDateService.format(
			this.helperDateService.create(),
		);
		const HttpDebuggerOptions: IHttpDebuggerConfigOptions = {
			stream: createStream(`${date}.log`, {
				path: `./logs/${DEBUGGER_HTTP_NAME}/`,
				maxSize: this.maxSize,
				maxFiles: this.maxFiles,
				compress: true,
				interval: '1d',
			}),
		};

		return {
			HttpDebuggerOptions,
			debuggerHttpFormat: DEBUGGER_HTTP_FORMAT,
		};
	}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const config: IHttpDebuggerConfig = await this.httpLogger();
		this.customToken();

		morgan(config.debuggerHttpFormat, config.HttpDebuggerOptions)(
			req,
			res,
			next,
		);
	}
}

@Injectable()
export class HttpDebuggerResponseMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction): void {
		const { send } = res;
		const resOld: any = res;

		// Add response data to request
		// this is for morgan
		resOld.send = (body: any) => {
			resOld.body = body;
			resOld.send = send;
			resOld.send(body);

			res = resOld as Response;
		};

		next();
	}
}
