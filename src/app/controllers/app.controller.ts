import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('happy-care-server')
@Controller({
	version: VERSION_NEUTRAL,
})
export class AppController {
	constructor(private readonly configService: ConfigService) {}
}
