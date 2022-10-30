import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FeedbackParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	feedbackId: string;
}
