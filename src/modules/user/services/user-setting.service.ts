import {
	UserSettingGetListDto,
	UserSettingCreateDto,
} from 'src/modules/user/dtos';
import { UserSettingRepository } from 'src/modules/user/repositories/user-setting.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { ILike } from 'typeorm';

@Injectable()
export class UserSettingService {
	constructor(
		private readonly userSettingRepository: UserSettingRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getUserSettings(
		userId: string,
		userSettingGetListDto: UserSettingGetListDto,
	): Promise<IResponsePaging> {
		const totalData = await this.userSettingRepository.count({
			where: {
				user: {
					id: userId,
				},
			},
		});
		const search = userSettingGetListDto.searchData
			? userSettingGetListDto.searchData.trim()
			: null;
		const result = await this.userSettingRepository.findMany({
			where: {
				address: search ? ILike(`%${search}%`) : undefined,
				user: {
					id: userId,
				},
			},
			options: {
				relations: ['district', 'district.city'],
				page: userSettingGetListDto.page,
				limit: userSettingGetListDto.limit,
				order: {
					createdAt: 'DESC',
				},
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			userSettingGetListDto.page,
			userSettingGetListDto.limit,
			null,
			null,
			result,
		);
	}

	async createUserSetting(
		userId: string,
		userSettingCreateDto: UserSettingCreateDto,
	) {
		const userSetting = await this.userSettingRepository.createOne({
			data: {
				...userSettingCreateDto,
				district: {
					id: userSettingCreateDto.districtId,
				},
				user: {
					id: userId,
				},
			},
		});
		if (!userSetting) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'user_setting.error.cannotCreate',
			});
		}
		return;
	}
}
