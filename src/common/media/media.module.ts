import { Global, Module } from '@nestjs/common';
import { ImageService } from 'src/common/media/services/image.service';
import { ImageRepository } from 'src/common/media/repositories/image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/common/media/entities/image.entity';

@Global()
@Module({
	controllers: [],
	providers: [ImageService, ImageRepository],
	exports: [ImageService, ImageRepository],
	imports: [TypeOrmModule.forFeature([ImageEntity])],
})
export class MediaModule {}
