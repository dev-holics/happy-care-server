import { Type } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsUUID,
	Max,
	Min,
} from 'class-validator';
import { IFeedbackBody } from 'src/modules/feedback/interfaces';

export class FeedbackCreateBodyDto implements IFeedbackBody {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsNumber()
	@Min(0)
	@Max(5)
	@IsNotEmpty()
	rating: number;

	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	productId: string;
}
