import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ProductParamDto } from 'src/modules/product/dtos';
import { FeedbackEntity } from 'src/modules/feedback/entities/feedback.entity';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeedbackService } from 'src/modules/feedback/services/feedback.service';
import { ResponsePagingBase } from 'src/common/response/decorators/response.decorator';
import { FeedbackListDto } from 'src/modules/feedback/dtos';

@ApiTags('Public.Feedback')
@Controller({
	version: '1',
	path: '/feedbacks',
})
export class FeedbackPublicController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@ResponsePagingBase('feedback.getList')
	@Get()
	async getAllFeedbacks(
		@Query() feedbackListDto: FeedbackListDto,
	): Promise<IResponsePaging> {
		return this.feedbackService.getAllFeedbacks(feedbackListDto);
	}

	@ResponsePagingBase('feedback.getList')
	@Get('/products/:productId')
	async getFeedbacksByProductId(
		@Query() feedbackListDto: FeedbackListDto,
		@Param() productParamDto: ProductParamDto,
	): Promise<IResponsePaging> {
		return this.feedbackService.getFeedbacksByProductId(
			feedbackListDto,
			productParamDto,
		);
	}
}
