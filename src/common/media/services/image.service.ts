import { ImageCreateDto } from 'src/common/media/dtos';
import { ImageRepository } from 'src/common/media/repositories/image.repository';
import { Injectable } from '@nestjs/common';
import { ImageEntity } from 'src/common/media/entities/image.entity';
import { In, Not } from 'typeorm';

@Injectable()
export class ImageService {
	constructor(private readonly imageRepository: ImageRepository) {}

	async createImages(imageCreateDto: ImageCreateDto[]): Promise<ImageEntity[]> {
		const images = await this.imageRepository.createMany({
			data: Object.values(imageCreateDto),
		});
		return images;
	}

	async findImagesByPublicId(publicId: string): Promise<ImageEntity> {
		return this.imageRepository.findOne({
			where: {
				publicId,
			},
		});
	}

	async deleteSoftImages(publicIds: string[]) {
		await this.imageRepository.updateMany({
			criteria: {
				publicId: Not(In(publicIds)),
			},
			data: {
				deletedAt: new Date(Date.now()),
			},
		});
		return;
	}
}
