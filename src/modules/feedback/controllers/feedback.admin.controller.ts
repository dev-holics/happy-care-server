import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Param,
	Put,
} from '@nestjs/common';
import { PERMISSIONS } from 'src/common/auth/constants/auth.permission.constant';
import { Response } from 'src/common/response/decorators/response.decorator';
import { FeedbackService } from 'src/modules/feedback/services/feedback.service';
import {
	FeedbackParamDto,
	FeedbackUpdateBodyDto,
} from 'src/modules/feedback/dtos';

@ApiTags('Admin.Feedback')
@Controller({
	version: '1',
	path: '/feedbacks',
})
export class FeedbackAdminController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_FEEDBACK])
	@AuthApiKeyGuard()
	@Put('/:feedbackId')
	async updateFeedback(
		@Param() feedbackParamDto: FeedbackParamDto,
		@Body() feedbackUpdateBodyDto: FeedbackUpdateBodyDto,
	) {
		return this.feedbackService.updateFeedback(
			feedbackParamDto,
			feedbackUpdateBodyDto,
		);
	}

	@Response('deleted soft successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.DELETE_FEEDBACK])
	@AuthApiKeyGuard()
	@Delete('/:feedbackId')
	async deleteSoftFeedback(@Param() feedbackParamDto: FeedbackParamDto) {
		return this.feedbackService.deleteSoftFeedback(feedbackParamDto);
	}
}
