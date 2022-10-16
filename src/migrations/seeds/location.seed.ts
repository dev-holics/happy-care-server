import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { HttpService } from '@nestjs/axios';
import {
	BranchRepository,
	CityRepository,
	DistrictRepository,
} from 'src/modules/location/repositories';

@Injectable()
export class LocationSeed {
	constructor(
		private readonly districtRepository: DistrictRepository,
		private readonly cityRepository: CityRepository,
		private readonly branchRepository: BranchRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
		private readonly httpService: HttpService,
	) {}

	@Command({
		command: 'insert:location',
		describe: 'insert locations',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const cities = await (
				await this.httpService
					.get('https://vapi.vnappmob.com/api/province/')
					.toPromise()
			).data.results;
			cities.forEach((city: any) => {
				city.name = city.province_name;
			});
			const createCities: any = await this.cityRepository.createMany({
				data: Object.values(cities),
			});
			for (let i = 0; i < createCities.length; i++) {
				const districts = await (
					await this.httpService
						.get(
							`https://vapi.vnappmob.com/api/province/district/${createCities[i].province_id}`,
						)
						.toPromise()
				).data.results;
				for (let j = 0; j < districts.length; j++) {
					await this.districtRepository.createOne({
						data: {
							name: districts[j].district_name,
							city: {
								id: createCities[i].id,
							},
						},
					});
				}
			}
			const [haichauDistrict, lienchieuDistrict, thanhkheDistrict] =
				await Promise.all([
					this.districtRepository.findOne({
						where: {
							name: 'Quận Hải Châu',
						},
					}),
					this.districtRepository.findOne({
						where: {
							name: 'Quận Liên Chiểu',
						},
					}),
					this.districtRepository.findOne({
						where: {
							name: 'Quận Thanh Khê',
						},
					}),
				]);
			await Promise.all([
				this.branchRepository.createOne({
					data: {
						address: '359 Trưng Nữ Vương, P. Hoà Thuận Đông',
						district: {
							id: haichauDistrict.id,
						},
					},
				}),
				this.branchRepository.createOne({
					data: {
						address: '113 Hoàng Văn Thái, P. Hoà Khánh Nam',
						district: {
							id: lienchieuDistrict.id,
						},
					},
				}),
				this.branchRepository.createOne({
					data: {
						address: '10 Ngô Văn Sở, P. Hoà Khánh Bắc',
						district: {
							id: lienchieuDistrict.id,
						},
					},
				}),
				this.branchRepository.createOne({
					data: {
						address: '695 Trần Cao Vân, P. Thanh Khê Đông',
						district: {
							id: thanhkheDistrict.id,
						},
					},
				}),
				this.branchRepository.createOne({
					data: {
						address: '240 Hoàng Diệu, P. Nam Dương, Q. Hải Châu',
						district: {
							id: haichauDistrict.id,
						},
					},
				}),
			]);
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw new Error('Method not implemented.');
		} finally {
			await queryRunner.release();
			process.exit();
		}
		return;
	}

	@Command({
		command: 'remove:location',
		describe: 'remove locations',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.districtRepository.hardDelete({});
			await this.cityRepository.hardDelete({});
		} catch (err: any) {
			await queryRunner.rollbackTransaction();
			throw new Error('Method not implemented.');
		} finally {
			await queryRunner.release();
			process.exit();
		}

		return;
	}
}
