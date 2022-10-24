import { ImageRepository } from 'src/common/media/repositories/image.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
	constructor(private readonly imageRepository: ImageRepository) {}
}
