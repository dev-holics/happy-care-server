import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { HelperService } from 'src/common/helper/services/helper.service';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperArrayService } from 'src/common/helper/services/helper.array.service';
import { HelperNumberService } from 'src/common/helper/services/helper.number.service';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { HelperFileService } from 'src/common/helper/services/helper.file.service';

@Global()
@Module({
	providers: [
		HelperService,
		HelperArrayService,
		HelperDateService,
		HelperEncryptionService,
		HelperHashService,
		HelperNumberService,
		HelperStringService,
		HelperFileService,
	],
	exports: [
		HelperService,
		HelperArrayService,
		HelperDateService,
		HelperEncryptionService,
		HelperHashService,
		HelperNumberService,
		HelperStringService,
		HelperFileService,
	],
	controllers: [],
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('helper.jwt.secretKey'),
				signOptions: {
					expiresIn: configService.get<string>('helper.jwt.expirationTime'),
				},
			}),
		}),
	],
})
export class HelperModule {}
