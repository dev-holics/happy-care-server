import { UserPublicService } from 'src/modules/user/services/user.public.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/common/response/decorators/response.decorator';
import { UserSignUpDto } from 'src/modules/user/dtos';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';

@ApiTags('Public.User')
@Controller({
	version: '1',
	path: '/users',
})
export class UserPublicController {
	constructor(private readonly userPublicService: UserPublicService) {}

	@Response('auth.signUp', { doc: { httpStatus: HttpStatus.CREATED } })
	@RequestBodyDtoGuard(UserSignUpDto)
	@Post('/sign-up')
	async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<IResponse> {
		await this.userPublicService.signUpNewUser(userSignUpDto);
		return;
	}
}
