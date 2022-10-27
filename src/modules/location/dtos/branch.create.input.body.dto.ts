import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IBranchInputBody } from 'src/modules/location/interfaces';

export class BranchCreateInputBodyDto implements IBranchInputBody {
	@ApiProperty({
		example: '29, phước mỹ 1',
		required: true,
	})
	@IsNotEmpty()
	address: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: false,
	})
	@IsUUID()
	districtId: string;
}
