import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { FILE_CUSTOM_SIZE_META_KEY } from 'src/common/file/constants/file.constant';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FileCustomSizeInterceptor implements NestInterceptor<any> {
	constructor(private readonly reflector: Reflector) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<void>> {
		if (context.getType() === 'http') {
			const ctx: HttpArgumentsHost = context.switchToHttp();
			const request = ctx.getRequest();

			request.__customFileSize = this.reflector.get<string>(
				FILE_CUSTOM_SIZE_META_KEY,
				context.getHandler(),
			);

			return next.handle();
		}

		return next.handle();
	}
}