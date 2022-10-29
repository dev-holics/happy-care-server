import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { FeedbackEntity } from 'src/modules/feedback/entities/feedback.entity';

@Injectable()
export class FeedbackRepository extends DatabaseRepositoryAbstract<FeedbackEntity> {
	constructor(
		@InjectRepository(FeedbackEntity)
		private feedbackRepository: Repository<FeedbackEntity>,
	) {
		super(feedbackRepository);
	}
}
