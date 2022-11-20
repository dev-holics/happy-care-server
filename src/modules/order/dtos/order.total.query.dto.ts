import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderTotalQueryDto {
	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly branchId?: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	@IsOptional()
	readonly pharmacistId?: string;

	@ApiProperty({
		example: faker.date.past(),
		required: true,
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	readonly startDate: Date;

	@ApiProperty({
		example: faker.date.recent(),
		required: true,
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	readonly endDate: Date;
}
