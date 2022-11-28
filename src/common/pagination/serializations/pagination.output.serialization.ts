import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationOutputSerialization {
	@ApiProperty({
		example: 20,
	})
	readonly page: number;

	@ApiProperty({
		example: 30,
	})
	readonly limit: number;
}
