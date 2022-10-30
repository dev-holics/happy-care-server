import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserService } from 'src/modules/user/services/user.service';
import { ResponsePagingBase } from 'src/common/response/decorators/response.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { UserGetListDto } from 'src/modules/user/dtos/user.get-list.dto';
import {
	IResponse,
	IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { RequestParamsDtoGuard } from 'src/common/request/decorators/request.decorator';
import { UserGetDto } from 'src/modules/user/dtos/user.get.dto';

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

	@Response('user.getById')
	@AuthJwtGuard([PERMISSIONS.READ_USER])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(UserGetDto)
	@Get(':userId')
	async getById(@Param() userGetDto: UserGetDto): Promise<IResponse> {
		return this.userService.getUserById(userGetDto);
	}
}
