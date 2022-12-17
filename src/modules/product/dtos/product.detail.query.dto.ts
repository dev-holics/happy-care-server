import { IsOptional, IsUUID } from 'class-validator';

export class ProductDetailQueryDto {
	@IsOptional()
	@IsUUID()
	readonly branchId?: string;
}
