import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';
import { ProductRepository } from 'src/modules/product/repositories';
import {
	OriginAdminRepository,
	TrademarkAdminRepository,
} from 'src/modules/origin/repositories';

@Injectable()
export class ProductSeed {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly originRepository: OriginAdminRepository,
		private readonly brandRepository: TrademarkAdminRepository,
		private readonly productRepository: ProductRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	@Command({
		command: 'insert:product',
		describe: 'insert products',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const [cate1, cate2, cate3, cate4, cate5, cate6, cate7] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc sức khỏe',
							order: 1,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc cá nhân',
							order: 2,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm tiện lợi',
							order: 3,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm chức năng',
							order: 4,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Mẹ và Bé',
							order: 5,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc sắc đẹp',
							order: 6,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'hiết bị y tế',
							order: 7,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			// Cate1: Chăm sóc sức khỏe
			const [cate8, cate9, cate10, cate11, cate12, cate13, cate14, cate15] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm dinh dưỡng',
							order: 1,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dụng cụ sơ cứu',
							order: 2,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Kế hoạch gia đình',
							order: 3,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc Mắt/Tai/Mũi',
							order: 4,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc chân',
							order: 5,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Khẩu trang y tế',
							order: 6,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chống muỗi',
							order: 7,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu tràm, dầu xoa bóp',
							order: 8,
							parent: cate1 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			// Cate2: Chăm sóc cá nhân
			const [cate16, cate17, cate18, cate19, cate20, cate21, cate22] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm phòng tắm',
							order: 1,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm khử mùi',
							order: 2,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc tóc',
							order: 3,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Vệ sinh phụ nữ',
							order: 4,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc nam giới',
							order: 5,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc răng miệng',
							order: 6,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc cơ thể',
							order: 7,

							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			// Cate3: Sản phẩm tiện lợi
			const [cate23, cate24] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Hàng tổng hợp',
						order: 1,

						parent: cate3 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hàng bách hóa',
						order: 2,

						parent: cate3 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);

			// Cate4: Thực phẩm chức năng
			const [cate25, cate26, cate27, cate28, cate29, cate30, cate31] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm dạ dày',
							order: 1,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm tim mạch',
							order: 2,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm đường huyết',
							order: 3,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm hô hấp',
							order: 4,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm thần kinh',
							order: 5,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm cơ xương khớp',
							order: 6,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Giảm cân',
							order: 7,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			const [cate32, cate33, cate34, cate35, cate36, cate37, cate38] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc sắc đẹp',
							order: 8,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc sức khỏe nam và nữ',
							order: 9,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm Mắt/Tai/Mũi',
							order: 10,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Vitamin tổng hợp và khoáng chất',
							order: 11,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc tóc',
							order: 12,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm khác',
							order: 13,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho gan',
							order: 14,
							parent: cate4 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			// Cate5: Mẹ và Bé
			const [cate39, cate40, cate41, cate42] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Chăm sóc em bé',
						order: 1,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'TPCN dành cho trẻ em',
						order: 2,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Sản phẩm dành cho mẹ',
						order: 3,
						parent: cate5,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'TPCN dành cho phụ nữ mang thai',
						order: 4,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);

			// Cate6: Chăm sóc sắc đẹp
			const [cate43, cate44, cate45, cate46] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Chăm sóc mặt',
						order: 1,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Sản phẩm chống nắng',
						order: 2,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dụng cụ làm đẹp',
						order: 3,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dược mỹ phẩm',
						order: 4,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);

			// Cate7: Thiết bị y tế
			const [cate47, cate48, cate49, cate50, cate51, cate52] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Nhiệt kế',
							order: 1,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Máy đo huyết áp',
							order: 2,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Máy đo đường huyết',
							order: 3,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Máy xông khí dung',
							order: 4,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Thiết bị y tế khác',
							order: 5,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dụng cụ kiểm tra',
							order: 6,
							parent: cate7 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);

			// Seed origin
			const [
				origin1,
				origin2,
				origin3,
				origin4,
				origin5,
				origin6,
				origin7,
				origin8,
				origin9,
				origin10,
				origin11,
				origin12,
				origin13,
				origin14,
				origin15,
				origin16,
				origin17,
				origin18,
				origin19,
				origin20,
				origin21,
				origin22,
				origin23,
				origin24,
				origin25,
			] = await Promise.all([
				this.originRepository.createOne({
					data: {
						name: 'Việt Nam',
					},
					options: {
						transaction: true,
					},
				}), // Việt Nam 1.
				this.originRepository.createOne({
					data: {
						name: 'Ý',
					},
					options: {
						transaction: true,
					},
				}), // Ý 2.
				this.originRepository.createOne({
					data: {
						name: 'Úc',
					},
					options: {
						transaction: true,
					},
				}), // Úc 3.
				this.originRepository.createOne({
					data: {
						name: 'Anh',
					},
					options: {
						transaction: true,
					},
				}), // Anh 4.
				this.originRepository.createOne({
					data: {
						name: 'Hàn Quốc',
					},
					options: {
						transaction: true,
					},
				}), // Hàn Quốc 5.
				this.originRepository.createOne({
					data: {
						name: 'Tây Ban Nha',
					},
					options: {
						transaction: true,
					},
				}), // Tây Ban Nha 6.
				this.originRepository.createOne({
					data: {
						name: 'Hoa Kỳ',
					},
					options: {
						transaction: true,
					},
				}), // Hoa Kỳ 7.
				this.originRepository.createOne({
					data: {
						name: 'Slovenia',
					},
					options: {
						transaction: true,
					},
				}), // Slovenia 8.
				this.originRepository.createOne({
					data: {
						name: 'Pháp',
					},
					options: {
						transaction: true,
					},
				}), // Pháp 9.
				this.originRepository.createOne({
					data: {
						name: 'Đài Loan',
					},
					options: {
						transaction: true,
					},
				}), // Đài Loan 10.
				this.originRepository.createOne({
					data: {
						name: 'Đức',
					},
					options: {
						transaction: true,
					},
				}), // Đức 11.
				this.originRepository.createOne({
					data: {
						name: 'Malaysia',
					},
					options: {
						transaction: true,
					},
				}), // Malaysia 12.
				this.originRepository.createOne({
					data: {
						name: 'Mỹ',
					},
					options: {
						transaction: true,
					},
				}), // Mỹ 13.
				this.originRepository.createOne({
					data: {
						name: 'Canada',
					},
					options: {
						transaction: true,
					},
				}), // Canada 14.
				this.originRepository.createOne({
					data: {
						name: 'Nhật Bản',
					},
					options: {
						transaction: true,
					},
				}), // Nhật Bản 15.
				this.originRepository.createOne({
					data: {
						name: 'Bỉ',
					},
					options: {
						transaction: true,
					},
				}), // Bỉ 16.
				this.originRepository.createOne({
					data: {
						name: 'New Zealand',
					},
					options: {
						transaction: true,
					},
				}), // New Zealand 17.
				this.originRepository.createOne({
					data: {
						name: 'Thụy Sĩ',
					},
					options: {
						transaction: true,
					},
				}), // Thụy Sĩ 18.
				this.originRepository.createOne({
					data: {
						name: 'Thái Lan',
					},
					options: {
						transaction: true,
					},
				}), // Thái Lan 19.
				this.originRepository.createOne({
					data: {
						name: 'Thụy Điển',
					},
					options: {
						transaction: true,
					},
				}), // Thụy Điển 20.
				this.originRepository.createOne({
					data: {
						name: 'Ấn Độ',
					},
					options: {
						transaction: true,
					},
				}), // Ấn Độ 21.
				this.originRepository.createOne({
					data: {
						name: 'Hungary',
					},
					options: {
						transaction: true,
					},
				}), // Hungary 22.
				this.originRepository.createOne({
					data: {
						name: 'Brazil',
					},
					options: {
						transaction: true,
					},
				}), // Brazil 23.
				this.originRepository.createOne({
					data: {
						name: 'Ireland',
					},
					options: {
						transaction: true,
					},
				}), // Ireland 24.
				this.originRepository.createOne({
					data: {
						name: 'Hà Lan',
					},
					options: {
						transaction: true,
					},
				}), // Hà Lan 25.
			]);

			// Seed brand
			const [
				brand1,
				brand2,
				brand3,
				brand4,
				brand5,
				brand6,
				brand7,
				brand8,
				brand9,
				brand10,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Pharmacity',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Pharmacity 1.
				this.brandRepository.createOne({
					data: {
						name: 'Pharmacist Formulators',
						origin: origin2 || undefined, // Ý
					},
					options: {
						transaction: true,
					},
				}), // Pharmacist Formulators 2.
				this.brandRepository.createOne({
					data: {
						name: 'Brauer',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Brauer 3.
				this.brandRepository.createOne({
					data: {
						name: 'Nutrigen',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // Nutrigen 4.
				this.brandRepository.createOne({
					data: {
						name: 'CJ',
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // CJ 5.
				this.brandRepository.createOne({
					data: {
						name: 'Enzymax',
						origin: origin6 || undefined, // Tây Ban Nha
					},
					options: {
						transaction: true,
					},
				}), // Enzymax 6.
				this.brandRepository.createOne({
					data: {
						name: 'Solgar',
						origin: origin7 || undefined, // Hoa Kỳ
					},
					options: {
						transaction: true,
					},
				}), // Solgar 7.
				this.brandRepository.createOne({
					data: {
						name: 'LineaBon',
						origin: origin8 || undefined, // Slovenia
					},
					options: {
						transaction: true,
					},
				}), // LineaBon 8.
				this.brandRepository.createOne({
					data: {
						name: 'Inno.N',
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // Inno.N 9.
				this.brandRepository.createOne({
					data: {
						name: 'Sa Sâm Việt',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Sa Sâm Việt 10.
			]);

			const [
				brand11,
				brand12,
				brand13,
				brand14,
				brand15,
				brand16,
				brand17,
				brand18,
				brand19,
				brand20,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Embryolisse',
						origin: origin9 || undefined, // Pháp
					},
					options: {
						transaction: true,
					},
				}), // Embryolisse 11.
				this.brandRepository.createOne({
					data: {
						name: "L'oreal", // Pháp
						origin: origin9 || undefined,
					},
					options: {
						transaction: true,
					},
				}), // L'oreal 12.
				this.brandRepository.createOne({
					data: {
						name: 'Vitabiotics',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // Vitabiotics 13.
				this.brandRepository.createOne({
					data: {
						name: 'Kinohimitsu',
						origin: origin10 || undefined, // Đài Loan
					},
					options: {
						transaction: true,
					},
				}), // Kinohimitsu 14.
				this.brandRepository.createOne({
					data: {
						name: 'Microlife',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Microlife 15
				this.brandRepository.createOne({
					data: {
						name: 'Mega Lifesciences',
						origin: origin12 || undefined, // Malaysia
					},
					options: {
						transaction: true,
					},
				}), // Mega Lifesciences 16.
				this.brandRepository.createOne({
					data: {
						name: 'Abbott',
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // Abbott 17.
				this.brandRepository.createOne({
					data: {
						name: 'Merck Sharp & Dohme',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Merck Sharp & Dohme 18.
				this.brandRepository.createOne({
					data: {
						name: 'Blackmores',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Blackmores 19.
				this.brandRepository.createOne({
					data: {
						name: 'Cetaphil',
						origin: origin14 || undefined, // Canada
					},
					options: {
						transaction: true,
					},
				}), // Cetaphil 20.
			]);

			const [
				brand21,
				brand22,
				brand23,
				brand24,
				brand25,
				brand26,
				brand27,
				brand28,
				brand29,
				brand30,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'PediaSure',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // PediaSure 21.
				this.brandRepository.createOne({
					data: {
						name: 'Sanofi CHC',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Sanofi CHC 22.
				this.brandRepository.createOne({
					data: {
						name: 'La Roche Posay',
						origin: origin9 || undefined, // Pháp
					},
					options: {
						transaction: true,
					},
				}), // La Roche Posay 23.
				this.brandRepository.createOne({
					data: {
						name: 'Sanofi GEM',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Sanofi GEM 24.
				this.brandRepository.createOne({
					data: {
						name: 'Alltimes Care',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Alltimes Care 25.
				this.brandRepository.createOne({
					data: {
						name: 'Elis',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Elis 26.
				this.brandRepository.createOne({
					data: {
						name: 'STELLA',
						origin: origin15 || undefined, // Bỉ
					},
					options: {
						transaction: true,
					},
				}), // STELLA 27.
				this.brandRepository.createOne({
					data: {
						name: 'Hotchland',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Hotchland 28.
				this.brandRepository.createOne({
					data: {
						name: 'Goodhealth',
						origin: origin17 || undefined, // New Zealand
					},
					options: {
						transaction: true,
					},
				}), // Goodhealth 29.
				this.brandRepository.createOne({
					data: {
						name: 'Systane',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Systane 30.
			]);

			const [
				brand31,
				brand32,
				brand33,
				brand34,
				brand35,
				brand36,
				brand37,
				brand38,
				brand39,
				brand40,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Henry Blooms',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Henry Blooms 31.
				this.brandRepository.createOne({
					data: {
						name: 'Nature Gift',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Nature Gift 32.
				this.brandRepository.createOne({
					data: {
						name: 'Goodlife',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Goodlife 33.
				this.brandRepository.createOne({
					data: {
						name: 'Alcon Pharmaceuticals',
						origin: origin16 || undefined, // Bỉ
					},
					options: {
						transaction: true,
					},
				}), // Alcon Pharmaceuticals 34.
				this.brandRepository.createOne({
					data: {
						name: 'Novartis',
						origin: origin18 || undefined, // Thụy Sĩ
					},
					options: {
						transaction: true,
					},
				}), // Novartis 35.
				this.brandRepository.createOne({
					data: {
						name: 'Similac',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Similac 36.
				this.brandRepository.createOne({
					data: {
						name: 'Kotex',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Kotex 37.
				this.brandRepository.createOne({
					data: {
						name: 'Kutieskin',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Kutieskin 38.
				this.brandRepository.createOne({
					data: {
						name: 'Dr Frei',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Dr Frei 39.
				this.brandRepository.createOne({
					data: {
						name: "Brand's",
						origin: origin19 || undefined, // Thái Lan
					},
					options: {
						transaction: true,
					},
				}), // Brand's 40.
			]);

			const [
				brand41,
				brand42,
				brand43,
				brand44,
				brand45,
				brand46,
				brand47,
				brand48,
				brand49,
				brand50,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Bayer HealthCare',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Bayer HealthCare 41.
				this.brandRepository.createOne({
					data: {
						name: 'DHG Pharma',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // DHG Pharma 42.
				this.brandRepository.createOne({
					data: {
						name: 'Crestor',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Crestor 43.
				this.brandRepository.createOne({
					data: {
						name: 'Boehringer Ingelheim',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Boehringer Ingelheim 44.
				this.brandRepository.createOne({
					data: {
						name: 'AstraZeneca',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // AstraZeneca 45.
				this.brandRepository.createOne({
					data: {
						name: 'BioGaia',
						origin: origin20 || undefined, // Thụy Điển
					},
					options: {
						transaction: true,
					},
				}), // BioGaia 46.
				this.brandRepository.createOne({
					data: {
						name: 'Sagopha',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Sagopha 47.
				this.brandRepository.createOne({
					data: {
						name: 'Durex',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // Durex 48.
				this.brandRepository.createOne({
					data: {
						name: 'GSK OTC',
						origin: origin18 || undefined, // Thụy Sĩ
					},
					options: {
						transaction: true,
					},
				}), // GSK OTC 49.
				this.brandRepository.createOne({
					data: {
						name: 'Head & Shoulders',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Head & Shoulders 50.
			]);

			const [
				brand51,
				brand52,
				brand53,
				brand54,
				brand55,
				brand56,
				brand57,
				brand58,
				brand59,
				brand60,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Fresenius Kabi',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Fresenius Kabi 51.
				this.brandRepository.createOne({
					data: {
						name: "Nature'S Way",
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Nature\'S Way 52.
				this.brandRepository.createOne({
					data: {
						name: 'Tinh hau bien',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Tinh hau bien 53.
				this.brandRepository.createOne({
					data: {
						name: 'GSK ETC',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // GSK ETC 54.
				this.brandRepository.createOne({
					data: {
						name: 'Mylan',
						origin: origin21 || undefined, // Ấn Độ
					},
					options: {
						transaction: true,
					},
				}), // Mylan 55.
				this.brandRepository.createOne({
					data: {
						name: 'BioCo',
						origin: origin22 || undefined, // Hungary
					},
					options: {
						transaction: true,
					},
				}), // BioCo 56.
				this.brandRepository.createOne({
					data: {
						name: 'Tracy Bee',
						origin: origin23 || undefined, // Brazil
					},
					options: {
						transaction: true,
					},
				}), // Tracy Bee 57.
				this.brandRepository.createOne({
					data: {
						name: 'Nhat Nhat',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Nhat Nhat 58.
				this.brandRepository.createOne({
					data: {
						name: 'Catalent',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Catalent 59.
				this.brandRepository.createOne({
					data: {
						name: 'Biore',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Biore 60.
			]);

			const [
				brand61,
				brand62,
				brand63,
				brand64,
				brand65,
				brand66,
				brand67,
				brand68,
				brand69,
				brand70,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Heliocare',
						origin: origin6 || undefined, // Tây Ban Nha
					},
					options: {
						transaction: true,
					},
				}), // Heliocare 61.
				this.brandRepository.createOne({
					data: {
						name: 'Gaviscon',
						origin: origin4 || undefined, // Anh
					},
					options: {
						transaction: true,
					},
				}), // Gaviscon 62.
				this.brandRepository.createOne({
					data: {
						name: 'Merap Group',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Merap Group 63.
				this.brandRepository.createOne({
					data: {
						name: 'Forest Gold',
						origin: origin17 || undefined, // New Zealand
					},
					options: {
						transaction: true,
					},
				}), // Forest Gold 64.
				this.brandRepository.createOne({
					data: {
						name: 'Crimsons Pharma',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Crimsons Pharma 65.
				this.brandRepository.createOne({
					data: {
						name: 'Ensure',
						origin: origin7 || undefined, // Hoa Kỳ
					},
					options: {
						transaction: true,
					},
				}), // Ensure 66.
				this.brandRepository.createOne({
					data: {
						name: 'Ferrer Internacional S.A.',
						origin: origin6 || undefined, // Tây Ban Nha
					},
					options: {
						transaction: true,
					},
				}), // Ferrer Internacional S.A. 67.
				this.brandRepository.createOne({
					data: {
						name: 'Pharmedic',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Pharmedic 68.
				this.brandRepository.createOne({
					data: {
						name: 'Salonpas',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Salonpas 69.
				this.brandRepository.createOne({
					data: {
						name: 'Gamma Chemicals',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Gamma Chemicals 70.
			]);

			const [
				brand71,
				brand72,
				brand73,
				brand74,
				brand75,
				brand76,
				brand77,
				brand78,
				brand79,
				brand80,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Pharmalife Research',
						origin: origin2 || undefined, // Ý
					},
					options: {
						transaction: true,
					},
				}), // Pharmalife Research 71.
				this.brandRepository.createOne({
					data: {
						name: 'White Organic',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // White Organic 72.
				this.brandRepository.createOne({
					data: {
						name: 'OPC',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // OPC 73.
				this.brandRepository.createOne({
					data: {
						name: 'Sao Thai Duong',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Sao Thai Duong 74.
				this.brandRepository.createOne({
					data: {
						name: 'UBB',
						origin: origin7 || undefined, // Hoa Kỳ
					},
					options: {
						transaction: true,
					},
				}), // UBB 75.
				this.brandRepository.createOne({
					data: {
						name: 'Urgo',
						origin: origin19 || undefined, // Thái Lan
					},
					options: {
						transaction: true,
					},
				}), // Urgo 76.
				this.brandRepository.createOne({
					data: {
						name: 'Fugacar',
						origin: origin19 || undefined, // Thái Lan
					},
					options: {
						transaction: true,
					},
				}), // Fugacar 77.
				this.brandRepository.createOne({
					data: {
						name: 'Janssen',
						origin: origin9 || undefined, // Pháp
					},
					options: {
						transaction: true,
					},
				}), // Janssen 78.
				this.brandRepository.createOne({
					data: {
						name: 'Abbott Grow',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Abbott Grow 79.
				this.brandRepository.createOne({
					data: {
						name: 'Lifebuoy',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Lifebuoy 80.
			]);

			const [
				brand81,
				brand82,
				brand83,
				brand84,
				brand85,
				brand86,
				brand87,
				brand88,
				brand89,
				brand90,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Clincare',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Clincare 81.
				this.brandRepository.createOne({
					data: {
						name: 'Pymepharco',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Pymepharco 82.
				this.brandRepository.createOne({
					data: {
						name: 'HAUORA',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // HAUORA 83.
				this.brandRepository.createOne({
					data: {
						name: 'Betadine',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Betadine 84.
				this.brandRepository.createOne({
					data: {
						name: 'Rowa',
						origin: origin24 || undefined, // Ireland
					},
					options: {
						transaction: true,
					},
				}), // Rowa 85.
				this.brandRepository.createOne({
					data: {
						name: 'Santen',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Santen 86.
				this.brandRepository.createOne({
					data: {
						name: 'B. Braun Indonesia',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // B. Braun Indonesia 87.
				this.brandRepository.createOne({
					data: {
						name: 'Fuze',
						origin: origin24 || undefined, // Ireland
					},
					options: {
						transaction: true,
					},
				}), // Fuze 88.
				this.brandRepository.createOne({
					data: {
						name: 'Green Cross',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Green Cross 89.
				this.brandRepository.createOne({
					data: {
						name: 'Probiotec',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Probiotec 90.
			]);

			const [
				brand91,
				brand92,
				brand93,
				brand94,
				brand95,
				brand96,
				brand97,
				brand98,
				brand99,
				brand100,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Paul Brands',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Paul Brands 91.
				this.brandRepository.createOne({
					data: {
						name: 'IMC',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // IMC 92.
				this.brandRepository.createOne({
					data: {
						name: 'Servier International',
						origin: origin9 || undefined, // Pháp
					},
					options: {
						transaction: true,
					},
				}), // Servier International 93.
				this.brandRepository.createOne({
					data: {
						name: '82X',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // 82X 94.
				this.brandRepository.createOne({
					data: {
						name: 'Enfagrow',
						origin: origin19 || undefined, // Thái Lan
					},
					options: {
						transaction: true,
					},
				}), // Enfagrow 95.
				this.brandRepository.createOne({
					data: {
						name: 'Apothecus',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Apothecus 96.
				this.brandRepository.createOne({
					data: {
						name: 'Cool Kid',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Cool Kid 97.
				this.brandRepository.createOne({
					data: {
						name: 'Mamori',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Mamori 98.
				this.brandRepository.createOne({
					data: {
						name: 'P/S',
						origin: origin25 || undefined, // Hà Lan
					},
					options: {
						transaction: true,
					},
				}), // P/S 99.
				this.brandRepository.createOne({
					data: {
						name: 'GRAND NUTRITION',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // GRAND NUTRITION 100.
			]);

			const [
				brand101,
				brand102,
				brand103,
				brand104,
				brand105,
				brand106,
				brand107,
				brand108,
				brand109,
				brand110,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Pregnavie',
						origin: origin6 || undefined, // Tây Ban Nha
					},
					options: {
						transaction: true,
					},
				}), // Pregnavie 101.
				this.brandRepository.createOne({
					data: {
						name: 'Sukin',
						origin: origin3 || undefined, // Úc
					},
					options: {
						transaction: true,
					},
				}), // Sukin 102.
				this.brandRepository.createOne({
					data: {
						name: 'Greenbird',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Greenbird 103.
				this.brandRepository.createOne({
					data: {
						name: 'Bobby',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Bobby 104.
				this.brandRepository.createOne({
					data: {
						name: 'SHINPOONG',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // SHINPOONG 105.
				this.brandRepository.createOne({
					data: {
						name: 'Nucos',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Nucos 106.
				this.brandRepository.createOne({
					data: {
						name: 'Welson',
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // Welson 107.
				this.brandRepository.createOne({
					data: {
						name: 'Fobelife',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Fobelife 108.
				this.brandRepository.createOne({
					data: {
						name: 'Swiss Energy',
						origin: origin18 || undefined, // Thụy Sĩ
					},
					options: {
						transaction: true,
					},
				}), // Swiss Energy 109.
				this.brandRepository.createOne({
					data: {
						name: 'Coke',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Coke 110.
			]);

			const [
				brand111,
				brand112,
				brand113,
				brand114,
				brand115,
				brand116,
				brand117,
				brand118,
				brand119,
				brand120,
			] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'FRESH',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // FRESH 111.
				this.brandRepository.createOne({
					data: {
						name: 'Anlene',
						origin: origin17 || undefined, // New Zealand
					},
					options: {
						transaction: true,
					},
				}), // Anlene 112.
				this.brandRepository.createOne({
					data: {
						name: 'Nivea',
						origin: origin11 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}), // Nivea 113.
				this.brandRepository.createOne({
					data: {
						name: 'X Men',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // X Men 114.
				this.brandRepository.createOne({
					data: {
						name: 'Anessa',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Anessa 115.
				this.brandRepository.createOne({
					data: {
						name: 'Johnson',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Johnson 116.
				this.brandRepository.createOne({
					data: {
						name: 'Listerine',
						origin: origin13 || undefined, // Mỹ
					},
					options: {
						transaction: true,
					},
				}), // Listerine 117.
				this.brandRepository.createOne({
					data: {
						name: 'Close up',
						origin: origin25 || undefined, // Hà Lan
					},
					options: {
						transaction: true,
					},
				}), // Close up 118.
				this.brandRepository.createOne({
					data: {
						name: 'Bonie Bee',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Bonie Bee 119.
				this.brandRepository.createOne({
					data: {
						name: 'Japan Gals',
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // Japan Gals 120.
			]);

			const [brand121, brand122, brand123, brand124] = await Promise.all([
				this.brandRepository.createOne({
					data: {
						name: 'Live Cool',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Live Cool 121.
				this.brandRepository.createOne({
					data: {
						name: 'Milaganics',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Milaganics 122.
				this.brandRepository.createOne({
					data: {
						name: 'XO',
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // XO 123.
				this.brandRepository.createOne({
					data: {
						name: 'Xuân An',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // Xuân An 124.
			]);

			// Seed product
			await Promise.all([
				this.productRepository.createOne({
					data: {
						code: 'P23314',
						name: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee',
						description:
							'Đông trùng hạ thảo mật ong chín tổ Bonie Bee có tác dụng làm giảm các tác nhân gây bệnh và tăng cường sức đề kháng. Ngoài ra, sản phẩm còn có thể dùng để làm đẹp.',
						packingSpec: 'Hộp 250g',
						price: 141900,
						element: 'Đông Trùng Hạ Thảo 2.5%, Mật ong chín tổ 97.5%',
						uses: 'Đông trùng hạ thảo và mật ong đều là những vị thuốc quý, có công dụng rất tốt trong việc bồi bổ sức khỏe, ngăn ngừa một số bệnh lý, đặc biệt phù hợp với các chị em phụ nữ trong việc làm đẹp. Mật ong không chỉ đơn giản mang lại vị ngọt thanh dễ uống mà còn là chất xúc tác, giúp phát huy triệt để chất dinh dưỡng có trong đông trùng hạ thảo.',
						subject: 'Trên 12 tháng tuổi',
						guide:
							'Hòa tan 1-2 muỗng cà phê Đông trùng hạ thảo mật ong chín tổ Bonie Bee với 120-150ml nước ấm hoặc trà ấm',
						preserve:
							'Nơi thoáng mát, tránh ánh nắng mặt trời trực tiếp. Không cần bỏ trong tủ lạnh',
						category: cate8 || undefined,
						trademark: brand119 || undefined,
						origin: origin1 || undefined,
					},
					options: {
						transaction: true,
					},
				}), // 1
				this.productRepository.createOne({
					data: {
						code: 'P22820',
						name: 'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru',
						description:
							'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru được chiết xuất từ 37,85% lá mầm lúa mạch bổ sung lượng chất xơ cần thiết cho cơ thể mỗi ngày, thanh lọc đường ruột, tăng khả năng hấp thụ dinh dưỡng. Một gói nhỏ chứa đến 25 tỷ lợi khuẩn acid lactic tốt cho hệ tiêu hóa.',
						packingSpec: 'Hộp 24 gói x 3g',
						price: 194400,
						element:
							'Lá mầm lúa mạch (37,85%), đường glucose, malto dextrin (20%), chất xơ thực vật (1,98%), lactose fructose oligosaccharide (0,33%), lợi khuẩn acid lactic (0,17%), chất chống oxy hóa: Acid ascorbic (L-) (E300), cỏ ngọt stevia. (Một phần chứa sữa). Sản phẩm có chứa chất xơ thực vật, lợi khuẩn, vitamin C.',
						uses:
							'- Thức uống được ưa chuộng tại Nhật Bản. Được làm từ mầm lúa mạch và chất xơ thực vật, bổ sung lượng chất xơ cần thiết cho cơ thể mỗi ngày, thanh lọc đường ruột, tăng khả năng hấp thụ dinh dưỡng. 1 gói nhỏ chứa đến 25 tỷ lợi khuẩn acid lactic tốt cho hệ tiêu hóa.\n' +
							'- Đồng thời thêm thành phần Oligosacarit, là nguồn dinh dưỡng của lợi khuẩn, giúp phát triển lợi khuẩn đường ruột, cho hệ tiêu hóa khỏe mạnh, tăng cường hệ miễn dịch. Thêm Vitamin C giúp chống oxi hóa, cho cơ thể khỏe mạnh, da tươi trẻ tự nhiên.\n' +
							'- Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em, người ăn kiêng muốn bổ sung chất xơ, người có hệ tiêu hóa yếu…',
						subject:
							'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
						guide:
							'Dùng 1 đến 2 gói/ngày. Pha với nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
						preserve:
							'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand120 || undefined, // Japan Gals
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // 2
				this.productRepository.createOne({
					data: {
						code: 'P22818',
						name: 'Bột mầm lúa mạch rau quả lên men Aojiru',
						description:
							'Bột mầm lúa mạch rau quả lên men Aojiru được chiết xuất từ các loại thực vật nhiều dinh dưỡng giúp bổ sung enzyme tốt cho hệ tiêu hóa, hệ miễn dịch, cân bằng dinh dưỡng. Sản phẩm là thức uống rất được ưa chuộng tại Nhật bởi công dụng vượt trội, giàu chất xơ, vitamin và các nguyên tố vi lượng, rất tốt cho sức khỏe, giúp tối ưu hóa việc hấp thu các dưỡng chất, hỗ trợ làm đẹp da.',
						packingSpec: 'Hộp 24 gói x 3g',
						price: 135500,
						element:
							'Lá mầm lúa mạch (48,35%), đường glucose, khổ qua (1%), cải xoăn (1%), bột thực vật lên men (dextrin, bột thực vật lên men) (1%), cỏ ngọt stevia.\n' +
							'(Một phần chứa cam, kiwi, chuối, táo, đào, khoai từ, đậu nành, mè, hạt điều).\n' +
							'Sản phẩm có chứa chất xơ thực vật.',
						uses:
							'- Chiết xuất từ các loại thực vật nhiều dinh dưỡng: mầm lúa mạch, mướp đắng, cải xoăn Nhật Bản, thêm 139 loại rau củ, trái cây, thực vật lên men … bổ sung enzyme tốt cho hệ tiêu hóa, hệ miễn dịch, cân bằng dinh dưỡng.\n' +
							'- Là thức uống rất được ưa chuộng tại Nhật bởi công dụng vượt trội, giàu chất xơ, vitamin và các nguyên tố vi lượng, rất tốt cho sức khỏe, giúp tối ưu hóa việc hấp thu các dưỡng chất, hỗ trợ làm đẹp da.\n' +
							'- Aojiru dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…',
						subject:
							'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
						guide:
							'Dùng 1 đến 2 gói/ngày. Pha 1 gói với 100 ml nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
						preserve:
							'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand120 || undefined, // Japan Gals
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // 3
				this.productRepository.createOne({
					data: {
						code: 'P22819',
						name: 'Bột mầm lúa mạch trái cây Aojiru',
						description:
							'Bột mầm lúa mạch trái cây Aojiru chiết xuất từ 25,5% lá mầm lúa mạch tốt cho hệ tiêu hóa, thanh lọc đường ruột, tăng cường miễn dịch, cân bằng dinh dưỡng. Sản phẩm bổ sung bột nước ép trái cây đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em ghét ăn rau, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…',
						packingSpec: 'Hộp 24 gói x 3g',
						price: 194400,
						element:
							'Lá mầm lúa mạch (25,5%), đường glucose, dextrin, fructose, malto dextrin, bột nước ép trái cây (nước ép táo cô đặc, dextrin) (3,3%), bột hỗn hợp nước ép trái cây (malto dextrin, nước ép táo, lê tây, bưởi, chanh dây, chanh, nho đỏ, dâu, dứa, xoài, vải, cam, kiwi, đào, việt quất, nam việt quất, mâm xôi) (0,7%), thực vật lên men (dextrin, bột cà rốt, tinh bột biến tính, bột cà chua)(0,5%), hương trái cây tự nhiên, cỏ ngọt stevia, chất chống đông vón: Dioxyd silic vô định hình (E551). (Một phần có chứa táo, chuối, đào, cam, kiwi, đậu nành, mè, hạt điều). Sản phẩm có chứa chất xơ thực vật.',
						uses:
							'Thức uống được ưa chuộng tại Nhật Bản. Được kết hợp từ mầm lúa mạch, 82 loại chiết xuất thực vật lên men, 16 loại trái cây bổ sung chất xơ, enzyme tốt cho hệ tiêu hóa, thanh lọc đường ruột, tăng cường miễn dịch, cân bằng dinh dưỡng.\n' +
							'- Bổ sung bột nước ép trái cây giúp hương vị thơm ngon, dễ uống. Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em ghét ăn rau, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…\n' +
							'- Sản phẩm đóng từng gói nhỏ, tiện mang đi.',
						subject:
							'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
						guide:
							'Dùng 1 đến 2 gói/ngày. Pha với nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
						preserve:
							'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand120 || undefined, // Japan Gals
						origin: origin15 || undefined, // Nhật Bản
					},
					options: {
						transaction: true,
					},
				}), // 4
				this.productRepository.createOne({
					data: {
						code: 'P21640',
						name: 'Bột sủi thanh nhiệt hương chanh dây Live Cool',
						description:
							'Bột sủi thanh nhiệt hương chanh dây Live Cool (10 gói x 7g) là sản phẩm giúp thanh nhiệt, giải độc, mát gan, hỗ trợ các triệu chứng nhiệt miệng do thiếu Vitamin C, nóng trong, mẩn ngứa do suy giảm chức năng gan và sức đề kháng kém.',
						packingSpec: 'Hộp 10 gói x 7g',
						price: 40000,
						element:
							'Chiết xuất quả chanh 250mg, chiết xuất Actiso 200mg, chiết xuất rau má 100mg, Vitamin C (Acid Ascorbic) 70mg, chiết xuất Linh chi đỏ 50mg. Chất tạo ngọt saccarose; chất điều vị: Acid Citric, Natri Bicabonate; hương chanh dây, màu Sunset Yellow (E110), màu Tatrazin (E102) vừa đủ 7g.',
						uses: 'Giúp thanh nhiệt giải độc, mát gan, tăng cường sức đề kháng. Hỗ trợ các triệu chứng nhiệt miệng do thiếu Vitamin C, nóng trong, mẩn ngứa do suy giảm chức năng gan và sức đề kháng kém.',
						subject:
							'Người bị nhiệt, nóng trong, mệt mỏi do nắng nóng, sinh hoạt không điều độ. Người bị mụn nhọt, mẩn ngứa, dị ứng mề đay, chán ăn, da vàng do suy giảm chức năng gan, sức đề kháng kém. Người hay sử dụng rượu bia, thuốc tân dược kéo dài ảnh hưởng đến chức năng gan.',
						guide:
							'Trẻ em từ 3-10 tuổi: 1 gói x 2-3 lần/ngày\n' +
							'Người lớn và trẻ em từ 10 tuổi trở lên : 1 gói x 3-4 lần/ngày\n' +
							'Cắt 1 gói bột bỏ vào cốc, sau đó thêm 200-250ml nước đun sôi để nguội. Ngon hơn khi uống lạnh. Không pha với nước nóng để tránh làm ảnh hưởng đến chất lượng của sản phẩm.\n' +
							'Bảo quản: Nơi khô ráo thoáng mát, tránh ánh sáng mặt trời',
						preserve: 'Nơi khô ráo thoáng mát, tránh ánh sáng mặt trời',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand121 || undefined, // Live Cool
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // 5
				this.productRepository.createOne({
					data: {
						code: 'P23317',
						name: 'Bột diếp cá Modotox',
						description:
							'Bột diếp cá Modotox 65g được làm từ 100% bột diếp cá nguyên chất, giúp thanh nhiệt & giải độc cơ thể, lợi tiểu, hỗ trợ giảm sỏi thận, hỗ trợ giảm bệnh trĩ, dùng làm đẹp cho mọi đối tượng sử dụng.',
						packingSpec: 'Hũ 65g',
						price: 116900,
						element: '100% bột diếp cá.',
						uses:
							'- Thanh nhiệt & giải độc cơ thể.\n' +
							'- Lợi tiểu, hỗ trợ giảm sỏi thận.\n' +
							'- Hỗ trợ giảm bệnh trĩ.\n' +
							'- Đối với làm đẹp.',
						subject: 'Mọi đối tượng sử dụng.',
						guide:
							'Hòa tan 1-2 thìa bột với nước lọc uống trực tiếp. Có thể pha thêm với đường hoặc một số rau củ khác để tăng thêm hương vị.',
						preserve: 'Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand122 || undefined, // Milaganics
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // 6
				this.productRepository.createOne({
					data: {
						code: 'P23319',
						name: 'Sữa bột Namyang XO Care',
						description:
							'Sữa bột Namyang XO Care giúp phục hồi sinh lực, tăng cường miễn dịch, cải thiện thể trạng và giúp xương chắc khỏe, giảm mệt mỏi, tăng cảm giác ngon miệng',
						packingSpec: 'Lon 800g',
						price: 619600,
						element:
							'- Phục hồi sinh lực: Chiết xuất hồng sâm giúp phục hồi và cải thiện sinh lực\n' +
							'- Tăng cường miễn dịch: Chiết xuất trà xanh dạng bột, nucleotides, beta-carotene, polyamine\n' +
							'- Cải thiện thể trạng và giúp xương chắc khỏe: Chiết xuất nhung hươu dạng bột, cải thiện thể trạng và sức khỏe nhanh chóng, đồng thời tăng cường sức khỏe xương khớp\n' +
							'- Giảm mệt mỏi: Chiết xuất rong tiểu câu, Vitamin C và Taurine\n' +
							'- Tăng cảm giác ngon miệng: Chiết xuất quả sơn trà\n' +
							'- Tiêu hóa tốt: Xơ rau diếp xoăn, đường FOS, hàm lượng lactose thấp\n' +
							'- Ngăn ngừa béo phì: Chiết xuất trà ô long, bổ sung L-carnitine\n' +
							'- Giúp tim khỏe mạnh: Chiết xuất tía tô, Chito-oligosaccharide\n' +
							'- Chiết xuất phúc bồn tử',
						uses: 'Phục hồi và tăng cường sức khỏe cho người lớn tuổi và người suy nhược cơ thể',
						subject: 'Người lớn tuổi và người suy nhược cơ thể',
						guide:
							'Chuẩn bị nước đun sôi khoảng 50 độ C\n' +
							'Cho khoảng 120ml lượng nước vào ly, cốc\n' +
							'Dùng muỗng (thìa) lấy sữa, đong lượng sữa bằng thanh gạt ngang\n' +
							'Cho 5 muỗng sữa vào bình, vặn nắp và lắc nhẹ để hòa tan sữa\n' +
							'Tiếp tục cho lượng nước ấm còn lại vào ly, cốc cho đến khi được 180ml\n' +
							'Uống 3 ly sữa/ngày ',
						preserve:
							'Chỉ sử dụng sản phẩm trong vòng 20 ngày kể từ ngày mở nắp. Đóng nắp cẩn thận tránh các loại côn trùng xâm nhập vào sản phẩm\n' +
							'Bảo quản sản phẩm ở nơi thoáng mát, tránh ánh nắng trực tiếp chiếu vào sản và không bảo quản ở trong tủ lạnh\n' +
							'Chỉ dùng thìa (muỗng) có trong lon và bảo quản sạch sẽ ở nơi riêng biệt.',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand123 || undefined, // XO
						origin: origin5 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}), // 7
				this.productRepository.createOne({
					data: {
						code: 'P22816',
						name: 'Ngũ cốc gạo lứt không đường Xuân An',
						description:
							'Ngũ cốc gạo lứt không đườngXuân An là thức uống thơm ngon bổ dưỡng, được làm từ gạo lứt, yến mạch, hạt sen và rất nhiều loại ngũ cốc. Sản phẩm được bổ sung thêm can xi, sử dụng đường ăn kiêng, không sử dụng đường mía. Vitamin, khoáng chất, chất xơ tự nhiên giúp hấp thu dinh dưỡng tốt và thanh lọc cơ thể.',
						packingSpec: 'Bịch 400g',
						price: 87400,
						element:
							'Ngũ cốc 60% (bột gạo lứt 10%, yến mạch 6%, đậu đen xanh lòng 3%, nếp cẩm 3%, bắp, đậu nành, gạo, lúa mỳ, lúa mạch), hạt sen 3%, bột kem thực vật, bột dừa, sữa bột tách béo 7% (Instant skim milk powder 7%), Isomalt 3%, Canxi 0.7%, Muối I-ốt, Chất làm dày xanthan gum (E415), chất tạo ngọt (INS 951), chất chống đông vón (E551), Maltodextrin, hương liệu tổng hợp dùng cho thực phẩm.',
						uses: 'Thức uống thơm ngon bổ dưỡng, được làm từ gạo lứt, yến mạch, hạt sen và rất nhiều loại ngũ cốc. Sản phẩm được bổ sung thêm can xi, sử dụng đường ăn kiêng, không sử dụng đường mía. Vitamin, khoáng chất, chất xơ tự nhiên giúp hấp thu dinh dưỡng tốt và thanh lọc cơ thể.',
						subject:
							'Trẻ từ 3 tuổi trở lên và người lớn, người ăn theo chế độ ăn kiêng',
						guide:
							'Hòa 1 gói ngũ cốc gạo lứt không đường Xuân An với khoảng 125ml nước sôi, khuấy đều trước khi dùng. Dùng 2-3 gói mỗi ngày\n' +
							'Lưu ý: Không dùng khi sản phẩm bị rách, mốc hoặc đã hết hạn sử dụng.',
						preserve:
							'Bảo quản nơi khô ráo, thoáng mát; tránh tiếp xúc trực tiếp với không khí và ánh nắng mặt trời',
						category: cate8 || undefined, // Thực phẩm dinh dưỡng
						trademark: brand124 || undefined, // Xuân An
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}), // 8
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
		command: 'remove:product',
		describe: 'remove products',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			await this.productRepository.hardDelete({});
			await this.brandRepository.hardDelete({});
			await this.originRepository.hardDelete({});
			await this.categoryRepository.hardDelete({});
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
