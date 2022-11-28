import { ImageCreateDto } from 'src/common/media/dtos';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { IProductCreate } from 'src/modules/product/interfaces';
import { Type } from 'class-transformer';

export class ProductCreateDto implements IProductCreate {
	@ApiProperty({
		example: '00011059',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	code: string;

	@ApiProperty({
		example: 'Viên uống Sâm Nhung Bổ Thận',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		example:
			'Sâm Nhung Bổ Thận NV giúp bổ thận, tráng dương, mạnh gân cốt, ăn ngủ tốt, tăng cường sinh lực, giúp giảm tình trạng mãn dục nam, yếu sinh lý, đau lưng, mỏi gối.',
		required: false,
	})
	@IsString()
	description: string;

	@ApiProperty({
		example: '10 vỉ/hộp',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	packingSpec: string;

	@ApiProperty({
		example: 'Hộp',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	unit: string;

	@ApiProperty({
		example: 110000,
		required: true,
	})
	@IsNotEmpty()
	@IsNumber()
	price: number;

	@ApiProperty({
		example: 'thành phần',
		required: false,
	})
	@IsString()
	element: string;

	@ApiProperty({
		example: 'công dụng',
		required: false,
	})
	@IsString()
	uses: string;

	@ApiProperty({
		example: 'đối tượng',
		required: false,
	})
	@IsString()
	subject: string;

	@ApiProperty({
		example: 'hướng dẫn',
		required: false,
	})
	@IsString()
	guide: string;

	@ApiProperty({
		example: 'bảo quản',
		required: false,
	})
	@IsString()
	preserve: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	trademarkId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	originId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	categoryId: string;

	@ApiProperty({
		type: [ImageCreateDto],
		required: false,
	})
	@IsArray()
	@Type(() => ImageCreateDto)
	images: ImageCreateDto[];
}
