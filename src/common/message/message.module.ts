import path from 'path';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';

import { MessageService } from 'src/common/message/services/message.service';
import { MessageEnumService } from 'src/common/message/services/message.enum.service';
import { ENUM_MESSAGE_LANGUAGE } from 'src/common/message/constants';

@Global()
@Module({
	providers: [MessageService, MessageEnumService],
	exports: [MessageService, MessageEnumService],
	imports: [
		I18nModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				fallbackLanguage: configService.get<string>('app.language'),
				fallbacks: Object.values(ENUM_MESSAGE_LANGUAGE).reduce(
					(a, v) => ({ ...a, [`${v}-*`]: v }),
					{},
				),
				loaderOptions: {
					path: path.join(__dirname, '../../languages'),
					watch: true,
				},
			}),
			loader: I18nJsonLoader,
			inject: [ConfigService],
			resolvers: [new HeaderResolver(['x-custom-lang'])],
		}),
	],
	controllers: [],
})
export class MessageModule {}
