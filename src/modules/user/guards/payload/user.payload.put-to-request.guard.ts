import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
	constructor(private readonly userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { user } = request;

		request.__user = await this.userRepository.findOneByQuery({
			id: user.id,
		});

		return true;
	}
}