import { ImageUpdateDto } from 'src/common/media/dtos';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsString,
	IsNotEmpty,
	IsArray,
	IsOptional,
} from 'class-validator';
import { IProductCreate } from 'src/modules/product/interfaces';
import { Expose, Type } from 'class-transformer';

export class ProductUpdateDto implements IProductCreate {
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
		required: true,
	})
	@IsNotEmpty()
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
		example: faker.datatype.uuid(),
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@IsOptional()
	categoryId: string;

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