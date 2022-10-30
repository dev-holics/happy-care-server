import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ProductParamDto } from 'src/modules/product/dtos';
import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from 'src/modules/feedback/repositories/feedback.repository';
import {
	FeedbackCreateBodyDto,
	FeedbackListDto,
	FeedbackParamDto,
	FeedbackUpdateBodyDto,
} from 'src/modules/feedback/dtos';

@Injectable()
export class FeedbackService {
	constructor(
		private readonly feedbackRepository: FeedbackRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getAllFeedbacks(
		feedbackListDto: FeedbackListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.feedbackRepository.count({});
		const feedbacks = await this.feedbackRepository.findMany({
			options: {
				page: feedbackListDto.page,
				limit: feedbackListDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			feedbackListDto.page,
			feedbackListDto.limit,
			null,
			null,
			feedbacks,
		);
	}

	async getFeedbacksByProductId(
		feedbackListDto: FeedbackListDto,
		productParamDto: ProductParamDto,
	): Promise<IResponsePaging> {
		const totalData = await this.feedbackRepository.count({});
		const feedbacks = await this.feedbackRepository.findAll({
			where: {
				product: {
					id: productParamDto.productId,
				},
			},
			options: {
				order: {
					rating: 'DESC',
				},
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			feedbackListDto.page,
			feedbackListDto.limit,
			null,
			null,
			feedbacks,
		);
	}

	async addFeedback(
		userId: string,
		feedbackCreateBodyDto: FeedbackCreateBodyDto,
	) {
		return this.feedbackRepository.createOne({
			data: {
				...feedbackCreateBodyDto,
				user: {
					id: userId,
				},
				product: {
					id: feedbackCreateBodyDto.productId,
				},
			},
		});
	}

	async updateFeedback(
		feedbackParamDto: FeedbackParamDto,
		feedbackUpdateBodyDto: FeedbackUpdateBodyDto,
	) {
		return this.feedbackRepository.updateOne({
			criteria: {
				id: feedbackParamDto.feedbackId,
			},
			data: feedbackUpdateBodyDto,
		});
	}

	async deleteSoftFeedback(feedbackParamDto: FeedbackParamDto) {
		return this.feedbackRepository.delete({
			id: feedbackParamDto.feedbackId,
		});
	}
}
