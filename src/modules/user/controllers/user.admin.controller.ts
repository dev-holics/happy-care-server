import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	Response,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { UserGetListDto } from 'src/modules/user/dtos/user.get-list.dto';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import {
	RequestBodyDtoGuard,
	RequestParamsDtoGuard,
} from 'src/common/request/decorators/request.decorator';
import { UserGetDto } from 'src/modules/user/dtos/user.get.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRoleUpdateDto } from 'src/modules/user/dtos/user.role.update.dto';
import { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';

@ApiTags('Admin.User')
@Controller({
	version: '1',
	path: '/users',
})
export class UserAdminController {
	constructor(private readonly userService: UserService) {}

	@Response('user.create', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_USER])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(UserCreateDto)
	@Post('/create')
	async createUser(@Body() userCreateDto: UserCreateDto): Promise<UserEntity> {
		return this.userService.createUser(userCreateDto);
	}

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
	async getById(@Param() userGetDto: UserGetDto): Promise<UserEntity> {
		return this.userService.getUserById(userGetDto);
	}

	@Response('user.updateRole')
	@AuthJwtGuard([PERMISSIONS.UPDATE_USER_ROLE])
	@AuthApiKeyGuard()
	@RequestParamsDtoGuard(UserGetDto)
	@RequestBodyDtoGuard(UserRoleUpdateDto)
	@Put(':userId/update-role')
	async updateRole(@Param() user: UserGetDto, @Body() role: UserRoleUpdateDto) {
		return this.userService.updateRole(user, role);
	}
}
