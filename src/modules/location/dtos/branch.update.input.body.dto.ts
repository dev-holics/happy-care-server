import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IBranchInputBody } from 'src/modules/location/interfaces';

export class BranchUpdateInputBodyDto implements IBranchInputBody {
	@ApiProperty({
		example: '29, phước mỹ 1',
		required: true,
	})
	@IsOptional()
	@IsNotEmpty()
	address: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsOptional()
	@IsUUID()
	districtId: string;
}
