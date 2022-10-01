/* eslint-disable @typescript-eslint/naming-convention */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export const GetUser = createParamDecorator(
	(data: string, ctx: ExecutionContext): UserEntity => {
		const { __user } = ctx.switchToHttp().getRequest();
		return __user;
	},
);
