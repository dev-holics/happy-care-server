import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PERMISSIONS } from 'src/common/auth/constants/auth.permission.constant';
import { Response } from 'src/common/response/decorators/response.decorator';
import { FeedbackService } from 'src/modules/feedback/services/feedback.service';
import { FeedbackCreateBodyDto } from 'src/modules/feedback/dtos';

@ApiTags('Feedback')
@Controller({
	version: '1',
	path: '/feedbacks',
})
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@UserProfileGuard()
	@AuthJwtGuard([PERMISSIONS.CREATE_FEEDBACK])
	@AuthApiKeyGuard()
	@Post()
	async addFeedback(
		@GetUser('id') id: string,
		@Body() feedbackCreateBodyDto: FeedbackCreateBodyDto,
	) {
		return this.feedbackService.addFeedback(id, feedbackCreateBodyDto);
	}
}
