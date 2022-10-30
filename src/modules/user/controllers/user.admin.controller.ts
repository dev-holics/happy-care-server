import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { ResponsePagingBase } from 'src/common/response/decorators/response.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { UserGetListDto } from 'src/modules/user/dtos/user.get-list.dto';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@ApiTags('Admin.User')
@Controller({
	version: '1',
	path: '/users',
})
export class UserAdminController {
	constructor(private readonly userService: UserService) {}

	@ResponsePagingBase('user.getList')
	@AuthJwtGuard([PERMISSIONS.READ_ALL_USER])
	@AuthApiKeyGuard()
	@Get('')
	async getUsers(
		@Query() userGetListDto: UserGetListDto,
	): Promise<IResponsePaging> {
		return this.userService.getUsers(userGetListDto);
	}
}
