import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
	constructor(@Inject('MAIL_SERVICE') private client: ClientProxy) {}

	async healthCheckSendGmail(): Promise<any> {
		const emailAddress = 'thailoc102190173@gmail.com';
		return this.client.emit({ cmd: 'send-message' }, { emailAddress });
	}
}
