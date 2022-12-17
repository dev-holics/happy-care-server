import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app/services/app.service';

@ApiTags('happy-care-server')
@Controller({
	version: VERSION_NEUTRAL,
	path: '',
})
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/health-check')
	async healthCheckSendGmail(): Promise<any> {
		return this.appService.healthCheckSendGmail();
	}
}
