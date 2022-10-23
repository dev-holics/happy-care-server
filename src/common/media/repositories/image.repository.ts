import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';
import { ImageEntity } from 'src/common/media/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { options } from 'joi';

@Injectable()
export class ImageRepository extends DatabaseRepositoryAbstract<ImageEntity> {
	constructor(
		@InjectRepository(ImageEntity)
		private imageRepository: Repository<ImageEntity>,
	) {
		super(imageRepository);
	}
}
