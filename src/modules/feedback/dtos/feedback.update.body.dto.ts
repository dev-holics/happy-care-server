import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { IFeedbackBodyUpdate } from 'src/modules/feedback/interfaces';

export class FeedbackUpdateBodyDto implements IFeedbackBodyUpdate {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	content: string;

	@IsNumber()
	@Min(0)
	@Max(5)
	@IsNotEmpty()
	@IsOptional()
	rating: number;
}
