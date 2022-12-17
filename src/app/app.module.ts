import { Module } from '@nestjs/common';
import { AppController } from 'src/app/controllers/app.controller';
import { CommonModule } from 'src/common/common.module';
import { RouterModule } from 'src/router/router.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app/services/app.service';

@Module({
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'MAIL_SERVICE',
			useFactory: () =>
				ClientProxyFactory.create({
					transport: Transport.TCP,
					options: { port: 3001 },
				}),
		},
	],
	imports: [CommonModule, RouterModule.register()],
})
export class AppModule {}
