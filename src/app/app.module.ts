import { Module } from '@nestjs/common';
import { AppController } from 'src/app/controllers/app.controller';
import { CommonModule } from 'src/common/common.module';
import { RouterModule } from 'src/router/router.module';

@Module({
	controllers: [AppController],
	providers: [],
	imports: [
		CommonModule,

		// Routes
		RouterModule.register(),
	],
})
export class AppModule {}
