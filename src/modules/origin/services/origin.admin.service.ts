import { Injectable } from '@nestjs/common';
import { OriginAdminRepository } from 'src/modules/origin/repositories';
import {
	OriginCreateBodyDto,
	OriginParamDto,
	OriginUpdateBodyDto,
} from 'src/modules/origin/dtos';

@Injectable()
export class OriginAdminService {
	constructor(private readonly originAdminRepository: OriginAdminRepository) {}

	async createOrigin(originCreateBodyDto: OriginCreateBodyDto) {
		return this.originAdminRepository.createOne({
			data: originCreateBodyDto,
		});
	}

	async updateOrigin(
		originParamDto: OriginParamDto,
		originUpdateBodyDto: OriginUpdateBodyDto,
	) {
		return this.originAdminRepository.updateOne({
			criteria: {
				id: originParamDto.origintId,
			},
			data: originUpdateBodyDto,
		});
	}
}
