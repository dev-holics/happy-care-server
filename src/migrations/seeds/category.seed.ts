import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';

@Injectable()
export class CategorySeed {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
	) {}

	@Command({
		command: 'insert:category',
		describe: 'insert category',
	})
	async insert(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
			const [cate1, cate2, cate3, cate4] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Thực phẩm chức năng',
						order: 1,
						parent: null,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dược mỹ phẩm',
						order: 2,
						parent: null,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Chăm sóc cá nhân',
						order: 3,
						parent: null,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Thiết bị y tế',
						order: 4,
						parent: null,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [
				cate5,
				cate6,
				cate7,
				cate8,
				cate9,
				cate10,
				cate11,
				cate12,
				cate13,
			] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Sinh lý - Nội tiết tố',
						order: 1,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Sức khỏe tim mạch',
						order: 2,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ tiêu hóa',
						order: 3,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Thần kinh não',
						order: 4,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ điều trị',
						order: 5,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Cải thiện tăng cường chức năng',
						order: 6,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ làm đẹp',
						order: 7,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Vitamin & Khoáng chất',
						order: 8,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dinh dưỡng',
						order: 9,
						parent: cate1 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate14, cate15, cate16, cate17, cate18, cate19, cate20] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc cơ thể',
							order: 1,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Giải pháp làn da',
							order: 2,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc da mặt',
							order: 3,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc tóc - da đầu',
							order: 4,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc da vùng mắt',
							order: 5,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Mỹ phẩm trang điểm',
							order: 6,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm từ thiên nhiên',
							order: 7,
							parent: cate2 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);
			const [cate21, cate22, cate23, cate24, cate25, cate26, cate27, cate28] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ tình dục',
							order: 1,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc răng miệng',
							order: 2,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Vệ sinh cá nhân',
							order: 3,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Đồ dùng gia đình',
							order: 4,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Tinh dầu các loại',
							order: 5,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm - Đồ uống',
							order: 6,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Thiết bị làm đẹp',
							order: 7,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hàng tổng hợp',
							order: 8,
							parent: cate3 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);
			const [cate29, cate30, cate31, cate32] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Dụng cụ y tế',
						order: 1,
						parent: cate4 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Khẩu trang',
						order: 2,
						parent: cate4 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dụng cụ theo dõi',
						order: 3,
						parent: cate4 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dụng cụ sơ cứu',
						order: 4,
						parent: cate4 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate33, cate34, cate35, cate36, cate37] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Sinh lý nữ',
						order: 1,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Sinh lý nam',
						order: 2,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Sức khỏe tình dục',
						order: 3,
						parent: cate5,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Cân bằng nội tiết tố',
						order: 4,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ mãn kinh',
						order: 5,
						parent: cate5 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate38, cate39, cate40] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Suy giãn tĩnh mạch',
						order: 1,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Giảm Cholesterol',
						order: 2,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Huyết áp',
						order: 3,
						parent: cate6 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate41, cate42, cate43, cate44, cate45] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Vi sinh - Probiotic',
						order: 1,
						parent: cate7 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Đại tràng',
						order: 2,
						parent: cate7 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Táo bón',
						order: 3,
						parent: cate7 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Khó tiêu',
						order: 4,
						parent: cate7 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dạ dày, tá tràng',
						order: 5,
						parent: cate7 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate46, cate47, cate48, cate49] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Tuần hoàn máu',
						order: 1,
						parent: cate8 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ giấc ngủ ngon',
						order: 2,
						parent: cate8 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Kiểm soát căng thẳng',
						order: 3,
						parent: cate8 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Bổ não - cải thiện trí nhớ',
						order: 4,
						parent: cate8 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate50, cate51, cate52, cate53, cate54, cate55, cate56] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Thận, tiền liệt tuyến',
							order: 1,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Cơ xương khớp',
							order: 2,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ điều trị gout',
							order: 3,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hô hấp, ho, xoang',
							order: 4,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ điều trị trĩ',
							order: 5,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ điều trị tiểu đường',
							order: 6,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ điều trị ung thư',
							order: 7,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);
			const [cate57, cate58, cate59, cate60, cate61, cate62] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Giải rượu, cai rượu',
							order: 1,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chức năng gan',
							order: 2,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Bổ mắt, bảo vệ mắt',
							order: 3,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chống lão hóa',
							order: 4,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Tăng sức đề kháng, miễn dịch',
							order: 5,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ trao đổi chất',
							order: 6,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);
			const [cate63, cate64, cate65] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Hỗ trợ giảm cân',
						order: 1,
						parent: cate11 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Da',
						order: 2,
						parent: cate11 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Tóc',
						order: 3,
						parent: cate11 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate66, cate67, cate68, cate69, cate70, cate71, cate72] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Vitamin tổng hợp',
							order: 1,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Bổ sung Canxi & Vitamin D',
							order: 2,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Bổ sung Sắt & Axit Folic',
							order: 3,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Bổ sung Kẽm & Magie',
							order: 4,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu cá, Omega 3, DHA',
							order: 5,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Vitamin C các loại',
							order: 6,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Vitamin E các loại',
							order: 7,
							parent: cate12 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
				]);
			const [cate73, cate74] = await Promise.all([
				this.categoryRepository.createOne({
					data: {
						name: 'Sữa',
						order: 1,
						parent: cate13 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
				this.categoryRepository.createOne({
					data: {
						name: 'Dinh dưỡng trẻ em',
						order: 2,
						parent: cate13 || undefined,
					},
					options: {
						transaction: true,
					},
				}),
			]);
			const [cate75, cate76, cate77, cate78, cate79, cate80, cate81, cate82] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Sữa tắm, xà bông',
							order: 1,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng thể',
							order: 2,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc ngực',
							order: 3,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Khử mùi',
							order: 4,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Trị nứt da',
							order: 5,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng tay, chân',
							order: 6,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chống nắng toàn thân',
							order: 7,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
						},
					}),
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc da mặt',
							order: 8,
							parent: cate14 || undefined,
						},
						options: {
							transaction: true,
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
		command: 'remove:category',
		describe: 'remove categories',
	})
	async remove(): Promise<any> {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();

		try {
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
