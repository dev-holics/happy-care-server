import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FeedbackEntity } from 'src/modules/feedback/entities/feedback.entity';
import { FeedbackRepository } from 'src/modules/feedback/repositories/feedback.repository';
import { FeedbackService } from 'src/modules/feedback/services/feedback.service';

@Module({
	imports: [TypeOrmModule.forFeature([FeedbackEntity])],
	exports: [FeedbackRepository, FeedbackService],
	providers: [FeedbackRepository, FeedbackService],
})
export class FeedbackModule {}
