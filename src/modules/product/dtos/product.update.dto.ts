import { ImageUpdateDto } from 'src/common/media/dtos';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsString,
	IsNotEmpty,
	IsArray,
	IsOptional,
	Min,
} from 'class-validator';
import { IProductUpdate } from 'src/modules/product/interfaces';
import { Type } from 'class-transformer';

export class ProductUpdateDto implements IProductUpdate {
	@ApiProperty({
		example: 'Viên uống Sâm Nhung Bổ Thận',
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({
		example:
			'Sâm Nhung Bổ Thận NV giúp bổ thận, tráng dương, mạnh gân cốt, ăn ngủ tốt, tăng cường sinh lực, giúp giảm tình trạng mãn dục nam, yếu sinh lý, đau lưng, mỏi gối.',
		required: false,
	})
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({
		example: 110000,
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsNumber()
	price: number;

	@ApiProperty({
		example: '10 vỉ/hộp',
		required: true,
	})
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	packingSpec: string;

	@ApiProperty({
		example: 'thành phần',
		required: false,
	})
	@IsOptional()
	@IsString()
	element: string;

	@ApiProperty({
		example: 'công dụng',
		required: false,
	})
	@IsOptional()
	@IsString()
	uses: string;

	@ApiProperty({
		example: 'đối tượng',
		required: false,
	})
	@IsOptional()
	@IsString()
	subject: string;

	@ApiProperty({
		example: 'hướng dẫn',
		required: false,
	})
	@IsOptional()
	@IsString()
	guide: string;

	@ApiProperty({
		example: 'bảo quản',
		required: false,
	})
	@IsOptional()
	@IsString()
	preserve: string;

	@ApiProperty({
		example: 10,
		required: false,
	})
	@Min(0)
	@IsOptional()
	@IsNumber()
	discount: number;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	categoryId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	trademarkId: string;

	@ApiProperty({
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	originId: string;

	@ApiProperty({
		isArray: true,
		type: ImageUpdateDto,
		required: false,
	})
	@IsOptional()
	@IsArray()
	@Type(() => ImageUpdateDto)
	images: ImageUpdateDto[];
}
