import { Global, Module } from '@nestjs/common';
import { AwsS3Service } from './services/aws.s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';
import { AwsFileRepository } from 'src/common/aws/repositories/aws.file.repository';

@Global()
@Module({
	controllers: [],
	providers: [AwsS3Service, AwsFileRepository],
	exports: [AwsS3Service, AwsFileRepository],
	imports: [
		TypeOrmModule.forFeature([AwsFileEntity]),
	],
})
export class AwsModule {}
