import { ImageCreateDto, ImageDeleteDto } from 'src/common/media/dtos';
import { ImageRepository } from 'src/common/media/repositories/image.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
	constructor(private readonly imageRepository: ImageRepository) {}

	async createImages(imageCreateDto: ImageCreateDto[]) {
		const images = await this.imageRepository.createMany({
			data: Object.values(imageCreateDto),
		});
		return images;
	}

	async deleteSoftImages(imageDeleteDto: ImageDeleteDto) {
		const imagesDeleteSoft = await this.imageRepository.softDeleteMany(
			imageDeleteDto.imageIds,
		);
		return imagesDeleteSoft;
	}
}
