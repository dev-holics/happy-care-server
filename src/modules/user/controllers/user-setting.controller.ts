import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { UserSettingService } from 'src/modules/user/services/user-setting.service';
import {
	Response,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import {
	UserSettingGetListDto,
	UserSettingCreateDto,
} from 'src/modules/user/dtos';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PERMISSIONS } from 'src/common/auth/constants';

@ApiTags('User-Setting')
@Controller({
	version: '1',
	path: '/user-settings',
})
export class UserSettingController {
	constructor(private readonly userSettingService: UserSettingService) {}

	@ResponsePagingBase('user-setting.getAll')
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.READ_MY_USER_SETTING])
	@Get()
	async getUserSettings(
		@GetUser('id') id: string,
		@Query() userSettingGetListDto: UserSettingGetListDto,
	): Promise<IResponsePaging> {
		return this.userSettingService.getUserSettings(id, userSettingGetListDto);
	}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_MY_USER_SETTING])
	@Post()
	async createUserSetting(
		@GetUser('id') id: string,
		@Body() userSettingCreateDto: UserSettingCreateDto,
	) {
		return this.userSettingService.createUserSetting(id, userSettingCreateDto);
	}
}
