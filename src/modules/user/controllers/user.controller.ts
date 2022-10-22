import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserLoginSerialization } from 'src/modules/user/serializations/user.login.serialization';
import { ENUM_USER_STATUS_CODE_SUCCESS } from 'src/modules/user/constants';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { UserLoginDto } from 'src/modules/user/dtos/user.login.dto';
import { Token, User } from 'src/common/auth/decorators/auth.decorator';
import {
	AuthJwtGuard,
	AuthRefreshJwtGuard,
} from 'src/common/auth/decorators/auth.jwt.decorator';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.entity.interface';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';
import { UserProfileUpdateDto } from 'src/modules/user/dtos/user-profile.update.dto';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';

@ApiTags('User')
@Controller({
	version: '1',
	path: '/users',
})
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Response('user.profile', {
		classSerialization: UserProfileSerialization,
	})
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.READ_USER_PROFILE])
	@AuthApiKeyGuard()
	@Get('/profile')
	async profile(@GetUser() user: IUserEntity): Promise<IResponse> {
		return user;
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.UPDATE_USER_PROFILE])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(UserProfileUpdateDto)
	@Put('/profile')
	async updateProfile(
		@GetUser('id') id: string,
		@Body() userProfileUpdateDto: UserProfileUpdateDto,
	) {
		return this.userService.updateProfile(id, userProfileUpdateDto);
	}

	@Response('user.login', {
		classSerialization: UserLoginSerialization,
		doc: { statusCode: ENUM_USER_STATUS_CODE_SUCCESS.USER_LOGIN_SUCCESS },
	})
	@RequestBodyDtoGuard(UserLoginDto)
	@HttpCode(HttpStatus.OK)
	@Post('/login')
	async login(@Body() body: UserLoginDto): Promise<IResponse> {
		return this.userService.login(body);
	}

	@Response('user.refresh', {
		classSerialization: UserLoginSerialization,
	})
	@AuthRefreshJwtGuard()
	@HttpCode(HttpStatus.OK)
	@Post('/refresh')
	async refresh(
		@User() { id, rememberMe, loginDate }: Record<string, any>,
		@Token() refreshToken: string,
	): Promise<IResponse> {
		return this.userService.refresh(
			{
				id,
				rememberMe,
				loginDate,
			},
			refreshToken,
		);
	}
}
