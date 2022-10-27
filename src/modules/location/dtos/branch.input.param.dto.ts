import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class BranchParamDto {
	@IsNotEmpty()
	@IsUUID()
	@Type(() => String)
	branchId: string;
}
