import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';
import { ProductRepository } from 'src/modules/product/repositories';
import {
	OriginAdminRepository,
	TrademarkAdminRepository,
} from 'src/modules/origin/repositories';
import { ImageRepository } from 'src/common/media/repositories/image.repository';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class ProductSeed {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly originRepository: OriginAdminRepository,
		private readonly brandRepository: TrademarkAdminRepository,
		private readonly productRepository: ProductRepository,
		private readonly imageRepository: ImageRepository,
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
			const [cate1, cate2, cate3, cate4, cate5, cate6, cate7, cate8] =
				await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Dược phẩm',
							order: 1,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Dược phẩm 1
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc sức khỏe',
							order: 2,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc sức khỏe 2
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc cá nhân',
							order: 3,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc cá nhân 3
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm tiện lợi',
							order: 4,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm tiện lợi 4
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm chức năng',
							order: 5,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Thực phẩm chức năng 5
					this.categoryRepository.createOne({
						data: {
							name: 'Mẹ và Bé',
							order: 6,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Mẹ và Bé 6
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc sắc đẹp',
							order: 7,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc sắc đẹp 7
					this.categoryRepository.createOne({
						data: {
							name: 'Thiết bị y tế',
							order: 8,
							parent: null,
						},
						options: {
							transaction: true,
						},
					}), // Thiết bị y tế 8
				]);

			// Cate1
			{
				// Cate1: Dược phẩm
				const [cateImg9, cateImg10] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Thu%E1%BB%91c_ko_k%C3%AA_%C4%91%C6%A1n.png',
							publicId: 'cateImg9',
							fileName: 'cateImg9.png',
							description: 'Thuốc không kê đơn',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/P00218_Rx_Da_li%E1%BB%85u.png',
							publicId: 'cateImg10',
							fileName: 'cateImg10.png',
							description: 'Thuốc kê đơn',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [cate9, cate10] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc không kê đơn',
							order: 1,
							parent: cate1 || undefined,
							images: [cateImg9 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Thuốc không kê đơn 9
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc kê đơn',
							order: 2,
							parent: cate1 || undefined,
							images: [cateImg10 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Thuốc kê đơn 10
				]);

				// Cate1 / 9: Dược phẩm / Thuốc không kê đơn
				const [
					cate11,
					cate12,
					cate13,
					cate14,
					cate15,
					cate16,
					cate17,
					cate18,
					cate19,
					cate20,
					cate21,
					cate22,
					cate23,
					cate24,
					cate25,
					cate26,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc kháng dị ứng',
							order: 1,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc kháng dị ứng 11
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc kháng viêm',
							order: 2,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc kháng viêm 12
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc ngừa thai',
							order: 3,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc ngừa thai 13
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc cảm lạnh',
							order: 4,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc cảm lạnh 14
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc da liễu',
							order: 5,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc da liễu 15
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc giảm cân',
							order: 6,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc giảm cân 16
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc Mắt/Tai/Mũi',
							order: 7,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc Mắt/Tai/Mũi 17
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc tiêu hóa',
							order: 8,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc tiêu hóa 18
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc dành cho nam',
							order: 9,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc dành cho nam 19
					this.categoryRepository.createOne({
						data: {
							name: 'Giảm đau, hạ sốt',
							order: 10,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Giảm đau, hạ sốt 20
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc dành cho phụ nữ',
							order: 11,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc dành cho phụ nữ 21
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc thần kinh',
							order: 12,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc thần kinh 22
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc cơ xương khớp',
							order: 13,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc cơ xương khớp 23
					this.categoryRepository.createOne({
						data: {
							name: 'Vitamin & Khoáng chất',
							order: 14,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Vitamin & Khoáng chất 24
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu gió, dầu cù là ...',
							order: 15,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu gió, dầu cù là ... 25
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc khác',
							order: 16,
							parent: cate9 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc khác 26
				]);

				// Cate1 / 9 / 11: Dược phẩm / Thuốc không kê đơn / Thuốc kháng dị ứng
				{
					const origin1 = await this.originRepository.createOne({
						data: {
							name: 'Việt Nam',
						},
						options: {
							transaction: true,
						},
					}); // Việt Nam 1
					const brand1 = await this.brandRepository.createOne({
						data: {
							name: 'Agimexpharm',
							origin: origin1 || undefined, // Việt Nam
						},
						options: {
							transaction: true,
						},
					}); // Agimexpharm 1
					const P20414_1 = await this.imageRepository.createOne({
						data: {
							url: 'https://shipthuocnhanh.vn/images/upload/images/agilodin-10-agimexpharm-10-vi-x-10-vien_00532.jpg',
							publicId: 'P20414_1_l',
							fileName: 'P20414_1_l.jpg',
							description: 'Agilodin',
							width: 700,
							height: 700,
						},
						options: {
							transaction: true,
						},
					});
					await this.productRepository.createOne({
						data: {
							code: 'P20414',
							name: 'Agilodin',
							description: 'Hình thức: Viên nén',
							packingSpec: 'Hộp 10 vỉ x 10 viên nén',
							price: 350000,
							element:
								'Mỗi viên nén chứa: Loratadin 10mg\n' +
								'Tá dược vừa đủ 1 viên.',
							uses: 'Điều trị viêm mũi dị ứng, viêm kết mạc dị ứng, ngứa và mày đay liên quan đến histamin',
							subject:
								'- Viêm mũi dị ứng\n' +
								'- Viêm kết mạc dị ứng\n' +
								'- Ngứa và mày đay liên quan đến histamin',
							guide:
								'Người lớn và trẻ em từ 12 tuổi trở lên: Uống 1 viên một lần trong ngày\n' +
								'Trẻ em 2-12 tuổi:\n' +
								'- Chỉ dùng cho trẻ em có trọng lượng cơ thể >30kg: Uống 1 viên một lần trong ngày\n' +
								'- Không dùng dạng viên nén cho trẻ em có trọng lượng cơ thể <30kg.\n' +
								'An toàn và hiệu quả khi dùng loratadin cho trẻ em dưới 2 tuổi chưa được xác định.\n' +
								'Suy gan nặng: Liều khởi đầu là 1 viên, 2 ngày một lần cho người lớn và trẻ em có trọng lượng cơ thể >30kg\n' +
								'Suy thận nhẹ và người cao tuổi: Không cần điều chỉnh liều\n' +
								'Suy thận nặng (Clcr <30ml/phút):\n' +
								'- Uống 1 viên, 2 ngày một lần cho người lớn và trẻ em trên 6 tuổi.\n' +
								'- Uống ½ viên, 2 ngày một lần cho trẻ em 2-5 tuổi\n' +
								'Cách dùng: Thuốc dùng theo đường uống',
							preserve: 'Nhiệt độ dưới 30°C, tránh ẩm và ánh sáng',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand1 || undefined, // Agimexpharm
							origin: origin1 || undefined, // Việt Nam
							images: [P20414_1],
						},
						options: {
							transaction: true,
						},
					}); // Agilodin

					const origin2 = await this.originRepository.createOne({
						data: {
							name: 'Mỹ',
						},
						options: {
							transaction: true,
						},
					}); // Mỹ 2
					const brand2 = await this.brandRepository.createOne({
						data: {
							name: 'Boston',
							origin: origin2 || undefined, // Mỹ
						},
						options: {
							transaction: true,
						},
					}); // Boston 2
					const [P13206_1, P13206_2] = await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://static.salekit.com/image/shop/3180/products/1575420189-thuocbaty.jpg',
								publicId: 'P13206_1_l',
								fileName: 'P13206_1_l.jpg',
								description: 'Bostanex',
								width: 460,
								height: 460,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://product.hstatic.net/1000113261/product/thuoc-ba-ty-_6afaa7ac8e8f4118a2c4e26b0e86e058.jpg',
								publicId: 'P13206_2_l',
								fileName: 'P13206_2_l.jpg',
								description: 'Bostanex',
								width: 300,
								height: 300,
							},
							options: {
								transaction: true,
							},
						}),
					]);
					await this.productRepository.createOne({
						data: {
							code: 'P13206',
							name: 'Bostanex',
							description:
								'Hình thức: Viên nén bao phim (Viên nén tròn bao phim màu xanh dương, hai mặt khum, một mặt trơn, một mặt có khắc chữ B, cạnh và thành viên lành lặn)',
							packingSpec: 'Hộp 03 vỉ x 10 viên nén bao phim',
							price: 60000,
							element:
								'Mỗi viên nén bao phim có chứa:\n' +
								'Thành phần hoạt chất: Desloratadin 5 mg\n' +
								'Thành phần tá dược: Lactose monohydrat, cellulose vi tinh thể type 102, calci phosphat, tinh bột ngô, talc, magnesi stearat, polyvinyl alcohol, PEG 6000, titan dioxyd, màu xanh số 2.\n',
							uses: 'Giảm triệu chứng viêm mũi dị ứng, nổi mày đay',
							subject:
								'Chỉ định cho người lớn và thanh thiếu niên từ 12 tuổi trở lên để làm giảm các triệu chứng liên quan đến:\n' +
								'- Viêm mũi dị ứng\n' +
								'- Nổi mày đay',
							guide:
								'BOSTANEX được dùng bằng đường uống, cùng hoặc không cùng bữa ăn.\n' +
								'- Người lớn và thanh thiếu niên (≥12 tuổi): 1 viên x 1 lần/ngày.\n' +
								'- Viêm mũi dị ứng gián đoạn (triệu chứng xuất hiện <4 ngày/tuần hoặc <4 tuần) nên được điều trị phù hợp dựa trên đánh giá tiền sử bệnh của bệnh nhân, nên ngừng điều trị khi hết triệu chứng và tái điều trị khi tái xuất hiện triệu chứng.\n' +
								'- Viêm mũi dị ứng dai dẳng (triệu chứng xuất hiện ≥4 ngày/tuần và kéo dài >4 tuần), có thể điều trị liên tục trong thời gian tiếp xúc với dị nguyên.\n' +
								'- Độ an toàn và hiệu quả của desloratadin dưới dạng viên nén bao phim đối với trẻ em <12 tuổi chưa được chứng minh. Nên dùng dạng bào chế khác thích hợp.',
							preserve:
								'Nơi khô, dưới 30°C, tránh ánh sáng. Để xa tầm tay trẻ em.',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand2 || undefined, // Boston
							origin: origin1 || undefined, // Việt Nam
							images: [P13206_1, P13206_2],
						},
						options: {
							transaction: true,
						},
					}); // Bostanex

					const brand3 = await this.brandRepository.createOne({
						data: {
							name: 'Khánh Hòa',
							origin: origin1 || undefined, // Việt Nam
						},
						options: {
							transaction: true,
						},
					}); // Khánh Hòa 3
					const P15294_2 = await this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P15294_2.jpg',
							publicId: 'P15294_2',
							fileName: 'P15294_2.jpg',
							description: 'Clanzen',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					});
					await this.productRepository.createOne({
						data: {
							code: 'P15294',
							name: 'Clanzen',
							description: 'Hình thức: Viên nén bao phim',
							packingSpec: 'Hộp 5 vỉ x 10 viên nén',
							price: 100000,
							element: 'Levocetirizin dihydroclorid 5mg',
							uses: 'Điều trị triệu chứng đi kèm trong các tình trạng dị ứng như: viêm mũi dị ứng theo mùa, viêm mũi dị ứng quanh năm, mày đay mạn tính.',
							subject:
								'Điều trị triệu chứng đi kèm trong các tình trạng dị ứng như: viêm mũi dị ứng theo mùa, viêm mũi dị ứng quanh năm, mày đay mạn tính.',
							guide: '',
							preserve: 'Bảo quản ở nhiệt độ không quá 30°c.',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand3 || undefined, // Khánh Hòa
							origin: origin1 || undefined, // Việt Nam
							images: [P15294_2],
						},
						options: {
							transaction: true,
						},
					}); // Clanzen

					const P15254_1 = await this.imageRepository.createOne({
						data: {
							url: 'https://whitepharma.vn/wp-content/uploads/2021/07/Clorpheniramin-Hop-10-vi-x-20-vien_1-500x500.jpg',
							publicId: 'P15254_1_l',
							fileName: 'P15254_1_l.jpg',
							description: 'Clorpheniramin',
							width: 500,
							height: 500,
						},
						options: {
							transaction: true,
						},
					});
					await this.productRepository.createOne({
						data: {
							code: 'P15254',
							name: 'Clorpheniramin',
							description: 'Hình thức: Viên nén bao phim',
							packingSpec: 'Hộp 10 vỉ x 20 viên',
							price: 20000,
							element:
								'- Clorpheniramin maleat 4mg\n' +
								'- Tá dược vừa đủ\n' +
								'(Tinh bột mì, Lactose, Sodium starch glycolat, màu Quinolein, màu Tartrazin, tinh bột sắn, magnesi stearat, Aerosil).',
							uses: 'Điều trị viêm mũi dị ứng, chảy nước mũi, nghẹt mũi, các triệu chứng dị ứng khác',
							subject:
								'Vêm mũi dị ứng mùa và quanh năm. Những triệu chứng dị ứng khác như mày đay, viêm mũi vận mạch do histamin, viêm kết mạc dị ứng, viêm da tiếp xúc, phủ mạch, phủ Quincke, dị ứng thức ăn, phản ứng huyết thanh: côn trùng đốt, ngửa ở người bệnh bị sởi hoặc thủy đậu.',
							guide:
								'Viêm mũi dị ứng theo mùa: (tác dụng đạt tối đa khi dùng thuốc liên tục và bắt đầu đúng ngay trước múa có phần hoa)\n' +
								'-Người lớn, bắt đầu uống 4 mg lúc đi ngủ, sau tăng từ từ trong 10 ngày đến 24 mg/ngày, nếu dung nạp được, chia làm 2 lần, cho đến cuối mùa.\n' +
								'-Trẻ em (2-6 tuổi): Uống 1 mg, 4 - 6 giờ một làn, dùng đến 6 mg/ngày, 6-12 tuổi: Ban đầu uống 2 mg lúc đi ngủ, sau tàng dẫn dần trong 10 ngày, lên đến 12 mg/ngày, nếu dung nạp được, chia 1-2 làn, dùng cho đến hết mùa.\n' +
								'-Phản ứng dị ứng cấp 12 mg, chia 1-2 lần uống\n' +
								'-Phản ứng dị ứng không biến chứng 5-20 mg, tiêm bắp, dưới da, hoặc tình mạch. Điều trị hỗ trợ trong sốc phân vệ: 10-20 mg, tiêm tĩnh mạch\n' +
								'-Phản ứng dị ứng với truyền máu hoặc huyết tương 10-20 mg, tối đa 40mg/ngày, dùng dưới da, tiêm bắp hoặc tĩnh mạch.\n' +
								'-Người cao tuổi: Dùng 4 mg, chia hai lần ngày thời gian tác dụng có thể tới 36 giờ hoặc hơn, thậm chí cả khi nồng độ thuốc trong huyết thanh thấp.',
							preserve:
								'Nơi khô ráo, nhiệt độ không quá 30 độ C. Tránh ánh sáng trực tiếp.',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand3 || undefined, // Khánh Hòa
							origin: origin1 || undefined, // Việt Nam
							images: [P15254_1],
						},
						options: {
							transaction: true,
						},
					}); // Clorpheniramin

					const origin3 = await this.originRepository.createOne({
						data: {
							name: 'Ấn Độ',
						},
						options: {
							transaction: true,
						},
					}); // Ấn Độ 3
					const brand4 = await this.brandRepository.createOne({
						data: {
							name: 'Gracure Pharmaceuticals',
							origin: origin3 || undefined, // Ấn Độ
						},
						options: {
							transaction: true,
						},
					}); // Gracure Pharmaceuticals 4
					const [P18691_2, P18691_4] = await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://thuoc5sao.com/wp-content/uploads/2021/08/thuocdesbebesiro2-l4452-247x300.jpg',
								publicId: 'P18691_2_l',
								fileName: 'P18691_2_l.jpg',
								description: 'Desbebe',
								width: 247,
								height: 300,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://cf.shopee.vn/file/c6136ef639a71c7d4b4cb3264e90be7f',
								publicId: 'P18691_4_l',
								fileName: 'P18691_4_l.jpg',
								description: 'Desbebe',
								width: 976,
								height: 976,
							},
							options: {
								transaction: true,
							},
						}),
					]);
					await this.productRepository.createOne({
						data: {
							code: 'P18691',
							name: 'Desbebe',
							description: 'Hình thức: Siro màu cam',
							packingSpec: 'Hộp 1 lọ x 60ml',
							price: 70.0,
							element:
								'– Hoạt chất: Desloratadine 30mg.\n' +
								'– Tá dược vừa đủ 1 viên (Sucrose, glycerol, propylene glycol, dinatri edetate, citric acid monohydrate, colour sunset yellow supra, natri benzoate, natri citrate, essence mix fruit, purified water).',
							uses: 'Điều trị viêm mũi dị ứng theo mùa, viêm mũi dị ứng lâu năm, chứng mề đay tự phát mãn tính.',
							subject:
								'- Desbebe được chỉ định để giảm nhanh các triệu chứng viêm mũi dị ứng theo mùa, viêm mũi dị ứng quanh năm như hắt hơi, sổ mũi, ngứa, nghẹt mũi, kèm kích ứng mắt, chảy nước mắt và đỏ mắt, ngứa họng và ho.\n' +
								'- Desbebe cũng được chỉ định để giảm các triệu chứng liên quan đến mày đay như giảm ngứa, giảm kích cỡ và số lượng ban.',
							guide:
								'Người lớn và thanh thiếu niên (> 12 tuổi): 10ml (5mg) sirô Desbebe, uống 1 lần/ngày, uống cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao hồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mề đay. Chỉ dùng đường uống.\n' +
								'Trẻ em từ 6 đến 11 tuổi: 5ml (2,5mg) sirô Desbebe, uống 1 lần/ngày, uống cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao hồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
								'Trẻ em từ 1 đến 5 tuổi: 2,5ml (1,25mg) sirô Desbebe, uống 1 lần/ngày, uống cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao hồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
								'Trẻ em từ 6 tháng đến 11 tháng tuổi: 2ml (1mg) sirô Desbebe, uống 1 lần/ngày, uống cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao hồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
								'Viêm mũi dị ứng không liên tục (triệu chứng xuất hiện < 4 ngày/tuần hoặc < 4 tuần) nên được điều trị phù hợp dựa trên đánh giá tiền sử của bệnh nhân và nên ngưng điều trị khi hết triệu chứng, tái điều trị khi xuất hiện triệu chứng. Trong viêm mũi dị ứng kéo dài (triệu chứng xuất hiện > 4 ngày/tuần hoặc > 4 tuần), có thể điều trị liên tục trong thời gian tiếp xúc với dị nguyên.',
							preserve: 'Bảo quản ở nhiệt độ dưới 30°C, tránh ánh sáng.',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand4 || undefined, // Gracure Pharmaceuticals
							origin: origin3 || undefined, // Ấn Độ
							images: [P18691_2, P18691_4],
						},
						options: {
							transaction: true,
						},
					}); // Desbebe

					const brand5 = await this.brandRepository.createOne({
						data: {
							name: 'ENLIE',
							origin: origin1 || undefined, // Việt Nam
						},
						options: {
							transaction: true,
						},
					}); // ENLIE 5
					const [P18110_1, P18110_2, P18110_3, P18110_4] = await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://nhathuocantam.org/wp-content/uploads/2021/05/p18110_1_l.jpg',
								publicId: 'P18110_1_l',
								fileName: 'P18110_1_l.jpg',
								description: 'Descallerg',
								width: 460,
								height: 460,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181102l-8972.jpg',
								publicId: 'P18110_2_l',
								fileName: 'P18110_2_l.jpg',
								description: 'Descallerg',
								width: 460,
								height: 460,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181103l-9717.jpg',
								publicId: 'P18110_3_l',
								fileName: 'P18110_3_l.jpg',
								description: 'Descallerg',
								width: 460,
								height: 460,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181104l-9350.jpg',
								publicId: 'P18110_4_l',
								fileName: 'P18110_4_l.jpg',
								description: 'Descallerg',
								width: 460,
								height: 460,
							},
							options: {
								transaction: true,
							},
						}),
					]);
					await this.productRepository.createOne({
						data: {
							code: 'P18110',
							name: 'Descallerg',
							description: 'Hình thức: Viên nén Thương hiệu: ENLIE',
							packingSpec: 'Hộp 1 vỉ x 10 viên',
							price: 55000,
							element:
								'- Hoạt chất: Desloratadin 5mg\n' +
								'- Tá dược: Dicalci phosphat dihydrat, tinh bột ngô, celullose vi tính the, talc, PVP K30, HPMC 6cps, PEG 6000, titan dioxyd, xanh Brilliant vừa đủ 1 viên.',
							uses: 'Điều trị triệu chứng liên quan đến viêm mũi dị ứng như hắt hơi, sổ mũi, ngứa mũi, xung huyết,...',
							subject:
								'- Descallerg giúp làm giảm các triệu chứng liên quan đến viêm mũi dị ứng ở người lớn và thanh thiếu niên > 12 tuổi.\n' +
								'- Những triệu chứng này bao gồm hắt hơi, sổ mũi, ngứa mũi, sung huyết/nghẹt mũi, cũng như ngứa mắt, chảy nước mắt, đỏ mắt, ngứa họng và họ.\n' +
								'- Descallerg cũng được dùng để làm giảm các triệu chứng liên quan đến nổi mày đay như ngứa và phát ban.',
							guide:
								'Cách dùng\n' +
								'- Sử dụng đường uống, có thể uống cùng hoặc không cùng với thức ăn.\n' +
								'Liều dùng\n' +
								'- Người lớn và thanh thiếu niên (> 12 tuổi ): Liều khuyến cáo là 1 viên/lần/ngày. Về thời gian điều trị, bác sĩ sẽ xác định tình trạng bệnh của bạn và quyết định thời gian dùng thuốc Descallerg.\n' +
								'- Nếu viêm mũi dị ứng không liên tục (các triệu chứng xuất hiện < 4 ngày/tuần hoặc < 4 tuần), bác sĩ sẽ đề nghị một lịch trình điều trị phù hợp dựa trên đánh giá tiền sử bệnh của bạn.\n' +
								'- Nếu viêm mũi dị ứng kéo dài (các triệu chứng xuất hiện 24 ngày/tuần và kéo dài > 4 tuần), bác sĩ có thể đề nghị thời gian điều trị lâu hơn.\n' +
								'- Đối với mày đay, thời gian điều trị có thể thay đổi trên từng bệnh nhân và do đó bạn nên tuân theo hướng dẫn của bác sĩ\n' +
								'- Trẻ em dưới 12 tuổi: Không nên dùng thuốc này cho trẻ dưới 12 tuổi, nên sử dụng dạng bào chế khác thích hợp hơn ',
							preserve: 'Nơi khô, tránh ánh sáng, nhiệt độ dưới 30 độ C',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand5 || undefined, // ENLIE
							origin: origin1 || undefined, // Việt Nam
							images: [P18110_1, P18110_2, P18110_3, P18110_4],
						},
						options: {
							transaction: true,
						},
					}); // Descallerg

					const origin4 = await this.originRepository.createOne({
						data: {
							name: 'Vương Quốc Anh',
						},
						options: {
							transaction: true,
						},
					}); // Vương Quốc Anh 4
					const origin5 = await this.originRepository.createOne({
						data: {
							name: 'Ý',
						},
						options: {
							transaction: true,
						},
					}); // Ý 5
					const brand6 = await this.brandRepository.createOne({
						data: {
							name: 'GlaxoSmithKline',
							origin: origin4 || undefined, // Vương Quốc Anh
						},
						options: {
							transaction: true,
						},
					}); // GlaxoSmithKline 6
					const P00606_1 = await this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/thuoc-ba-ty-_608fdc1de6384ed49257d6b46b388599_grande.jpg',
							publicId: 'P00606_1_l',
							fileName: 'P00606_1_l.jpg',
							description: 'Zyrtec',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					});
					await this.productRepository.createOne({
						data: {
							code: 'P00606',
							name: 'Zyrtec',
							description: 'Hình thức: Dung dịch',
							packingSpec: 'Hộp 1 chai 60ml',
							price: 59000,
							element:
								'Mỗi 1ml dung dịch uống chứa\n' +
								'Hoạt chất: 1mg cetirizin dihydrochlorid.\n' +
								'Tá dược: dung dịch sorbitol 70% (không kết tinh), glycerol, propylen glycol, natri saccharinat, methyl parahydroxybenzoat, propyl parahydroxybenzoat, hương chuối 54.330/A, natri acetat, acid acetic băng, nước tinh khiết.',
							uses: 'giảm các triệu chứng về mũi và mắt của viêm mũi dị ứng theo mùa và viêm mũi dị ứng quanh năm',
							subject:
								'Người lớn, trẻ em từ 2 tuổi trở lên:\n' +
								'- Cetirizin được chỉ định để làm giảm các triệu chứng về mũi và mắt của viêm mũi dị ứng theo mùa và viêm mũi dị ứng quanh năm.\n' +
								'- Cetirizin được chỉ định để làm giảm các triệu chứng của mày đay.',
							guide:
								'Người lớn\n' +
								'10mg (10ml dung dịch uống)/1 lần/ngày.\n' +
								'Liều khởi đầu 5mg (5ml dung dịch) có thể được đề nghị nếu ở liều dùng này kiểm soát được triệu chứng bệnh.\n' +
								'Trẻ em\n' +
								'Trẻ em từ 2 đến 6 tuổi\n' +
								'2,5mg (2,5ml dung dịch uống)/lần x 2 lần/ngày.\n' +
								'Trẻ em từ 6 đến 12 tuổi\n' +
								'5mg (5ml dung dịch uống)/1 lần x 2 lần/ngày.\n' +
								'Trẻ trên 12 tuổi\n' +
								'10mg (10ml dung dịch uống)/1 lần/ngày.\n' +
								'Dung dịch có thể uống ngay.\n' +
								'Người cao tuổi\n' +
								'Dữ liệu cho thấy, không cần giảm liều ở người già có chức năng thận bình thường.',
							preserve: 'Bảo quản ở nhiệt độ không quá 30°C.',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand6 || undefined, // GlaxoSmithKline
							origin: origin5 || undefined, // Ý
							images: [P00606_1],
						},
						options: {
							transaction: true,
						},
					}); // Zyrtec

					const brand7 = await this.brandRepository.createOne({
						data: {
							name: 'Pymepharco ',
							origin: origin1 || undefined, // Việt Nam
						},
						options: {
							transaction: true,
						},
					}); // Pymepharco 7
					const P14768_1 = await this.imageRepository.createOne({
						data: {
							url: 'https://nhathuocantam.org/wp-content/uploads/2021/05/p14768_1_l.jpg',
							publicId: 'P14768_1_l',
							fileName: 'P14768_1_l.jpg',
							description: 'Fegra',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					});
					await this.productRepository.createOne({
						data: {
							code: 'P14768',
							name: 'Fegra',
							description: 'Hình thức: Viên nén bao phim',
							packingSpec: 'Hộp 1 vỉ x 10 viên',
							price: 43000,
							element:
								'Hoạt chất: Fexofenadin hydrochloric 180mg\n' +
								'Tá dược: Lactose monohydrate, tinh bột tiền hồ hóa, natri croscarmellose, povidone, natri starch glycolat, magnesium stearate, colloidal silica anhydrous, HPMC, polyethylen glycol 6000, titan dioxyd, oxid sắt đỏ.',
							uses: 'Điều trị các chứng của viêm mũi dị ứng, mề đay',
							subject:
								'Điều trị các chứng của viêm mũi dị ứng: Hắt hơi, chảy nước mũi, nghẹt mũi, ngứa mũi, ngứa vòm miệng, họng, mắt ngứa đỏ, chảy nước mắt.\n' +
								'Nổi mề đay và mề đay tự phát mạn tính.',
							guide: 'Người lớn và trẻ em trên 12 tuổi: 1 viên/lần/ngày.',
							preserve: 'Nơi khô, mát, dưới 30°C, tránh ánh sáng',
							category: cate11 || undefined, // Thuốc kháng dị ứng
							trademark: brand7 || undefined, // Pymepharco
							origin: origin1 || undefined, // Việt Nam
							images: [P14768_1],
						},
						options: {
							transaction: true,
						},
					}); // Fegra
				}

				// ...

				// Cate1 / 10: Dược phẩm / Thuốc kê đơn
				const [
					cate27,
					cate28,
					cate29,
					cate30,
					cate31,
					cate32,
					cate33,
					cate34,
					cate35,
					cate36,
					cate37,
					cate38,
					cate39,
					cate40,
					cate41,
					cate42,
					cate43,
					cate44,
					cate45,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'RX Sản phẩm khác',
							order: 1,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // RX Sản phẩm khác 27
					this.categoryRepository.createOne({
						data: {
							name: 'RX Kháng dị ứng',
							order: 2,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // RX Kháng dị ứng 28
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc tiểu đường',
							order: 3,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc tiểu đường 29
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc kháng viêm',
							order: 4,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc kháng viêm 30
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc kháng sinh',
							order: 5,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc kháng sinh 31
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc tim mạch, huyết áp',
							order: 6,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc tim mạch, huyết áp 32
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc ngừa thai',
							order: 7,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc ngừa thai 33
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc cảm lạnh, ho',
							order: 8,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc cảm lạnh, ho 34
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc da liễu',
							order: 9,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc da liễu 35
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc Mắt/Tai/Mũi',
							order: 10,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc Mắt/Tai/Mũi 36
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc tiêu hóa',
							order: 11,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc tiêu hóa 37
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc cho nam giới',
							order: 12,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc cho nam giới 38
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc giảm đau, hạ sốt',
							order: 13,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc giảm đau, hạ sốt 39
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc dành cho nữ',
							order: 14,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc dành cho nữ 40
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc thần kinh',
							order: 15,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc thần kinh 41
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc cơ xương khớp',
							order: 16,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc cơ xương khớp 42
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Vitamin & Khoáng chất',
							order: 17,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Vitamin & Khoáng chất 43
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Hệ hô hấp',
							order: 18,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Hệ hô hấp 44
					this.categoryRepository.createOne({
						data: {
							name: 'Rx Thuốc khác',
							order: 19,
							parent: cate10 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Rx Thuốc khác 45
				]);
			}

			// Cate2
			{
				// Cate2: Chăm sóc sức khỏe
				const [
					cateImg46,
					cateImg47,
					cateImg48,
					cateImg49,
					cateImg50,
					cateImg51,
					cateImg52,
					cateImg53,
				] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.04Th%E1%BB%B1c_ph%E1%BA%A9m_dinh_d%C6%B0%E1%BB%A1ng_2.04-Nutrition_Food_Thuc_pham_dinh_duong.jpg',
							publicId: 'cateImg46',
							fileName: 'cateImg46.jpg',
							description: 'Thực phẩm dinh dưỡng',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.06_D%E1%BB%A5ng_c%E1%BB%A5_s%C6%A1_c%E1%BB%A9u_2.06-First_Aids_Dung_cu_so_cuu1.jpg',
							publicId: 'cateImg47',
							fileName: 'cateImg47.jpg',
							description: 'Dụng cụ sơ cứu',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.07_K%E1%BA%BF_ho%E1%BA%A1ch_gia_%C4%91%C3%ACnh_2.07-Family_Planning_Ke_hoach_gia_dinh_-_Copy.jpg',
							publicId: 'cateImg48',
							fileName: 'cateImg48.jpg',
							description: 'Kế hoạch gia đình',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.08_Ch%C4%83m_s%C3%B3c_M%E1%BA%AFtTaiM%C5%A9i_2.08-For_EyeEarNose_Cham_soc_MatTaiMui.jpg',
							publicId: 'cateImg49',
							fileName: 'cateImg49.jpg',
							description: 'Chăm sóc Mắt/Tai/Mũi',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.09_Ch%C4%83m_s%C3%B3c_ch%C3%A2n_2.09-Foot_Care_Cham_soc_chan2.jpg',
							publicId: 'cateImg50',
							fileName: 'cateImg50.jpg',
							description: 'Chăm sóc chân',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.10_Kh%E1%BA%A9u_trang_y_t%E1%BA%BF_2.10-Medical_Face_Mask_Khau_trang_y_te.jpg',
							publicId: 'cateImg51',
							fileName: 'cateImg51.jpg',
							description: 'Khẩu trang y tế',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.11.png',
							publicId: 'cateImg52',
							fileName: 'cateImg52.jpg',
							description: 'Chống muỗi',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.12.png',
							publicId: 'cateImg53',
							fileName: 'cateImg53.jpg',
							description: 'Dầu tràm, dầu xoa bóp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [cate46, cate47, cate48, cate49, cate50, cate51, cate52, cate53] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Thực phẩm dinh dưỡng',
								order: 1,
								parent: cate2 || undefined,
								images: [cateImg46 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Thực phẩm dinh dưỡng 46
						this.categoryRepository.createOne({
							data: {
								name: 'Dụng cụ sơ cứu',
								order: 2,
								parent: cate2 || undefined,
								images: [cateImg47 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Dụng cụ sơ cứu 47
						this.categoryRepository.createOne({
							data: {
								name: 'Kế hoạch gia đình',
								order: 3,
								parent: cate2 || undefined,
								images: [cateImg48 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Kế hoạch gia đình 48
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc Mắt/Tai/Mũi',
								order: 4,
								parent: cate2 || undefined,
								images: [cateImg49 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc Mắt/Tai/Mũi 49
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc chân',
								order: 5,
								parent: cate2 || undefined,
								images: [cateImg50 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc chân 50
						this.categoryRepository.createOne({
							data: {
								name: 'Khẩu trang y tế',
								order: 6,
								parent: cate2 || undefined,
								images: [cateImg51 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Khẩu trang y tế 51
						this.categoryRepository.createOne({
							data: {
								name: 'Chống muỗi',
								order: 7,
								parent: cate2 || undefined,
								images: [cateImg52 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chống muỗi 52
						this.categoryRepository.createOne({
							data: {
								name: 'Dầu tràm, dầu xoa bóp',
								order: 8,
								parent: cate2 || undefined,
								images: [cateImg53 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Dầu tràm, dầu xoa bóp 53
					]);

				// Cate2 / 46: Chăm sóc sức khỏe / Thực phẩm dinh dưỡng
				const [cate54, cate55, cate56, cate57] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Sữa dinh dưỡng',
							order: 1,
							parent: cate46 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa dinh dưỡng 54
					this.categoryRepository.createOne({
						data: {
							name: 'Thức uống có lợi cho sức khỏe',
							order: 2,
							parent: cate46 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thức uống có lợi cho sức khỏe 55
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm có lợi cho sức khỏe',
							order: 3,
							parent: cate46 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thực phẩm có lợi cho sức khỏe 56
					this.categoryRepository.createOne({
						data: {
							name: 'Dinh dưỡng thể thao-thể hình',
							order: 4,
							parent: cate46 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dinh dưỡng thể thao-thể hình 57
				]);

				// Cate2 / 47: Chăm sóc sức khỏe / Dụng cụ sơ cứu
				const [cate58, cate59, cate60, cate61, cate62] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Băng gạc',
							order: 1,
							parent: cate47 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Băng gạc 58
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chăm sóc vết thương',
							order: 2,
							parent: cate47 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chăm sóc vết thương 59
					this.categoryRepository.createOne({
						data: {
							name: 'Hỗ trợ chấn thương thể thao',
							order: 3,
							parent: cate47 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Hỗ trợ chấn thương thể thao 60
					this.categoryRepository.createOne({
						data: {
							name: 'Vớ chống giãn tĩnh mạch',
							order: 4,
							parent: cate47 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Vớ chống giãn tĩnh mạch 61
					this.categoryRepository.createOne({
						data: {
							name: 'Dụng cụ thể thao',
							order: 5,
							parent: cate47 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dụng cụ thể thao 62
				]);

				// Cate2 / 48: Chăm sóc sức khỏe / Kế hoạch gia đình
				const [cate63, cate64, cate65, cate66] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Bao cao su',
							order: 1,
							parent: cate48 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Bao cao su 63
					this.categoryRepository.createOne({
						data: {
							name: 'Gel bôi trơn',
							order: 2,
							parent: cate48 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Gel bôi trơn 64
					this.categoryRepository.createOne({
						data: {
							name: 'Que thử thai',
							order: 3,
							parent: cate48 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Que thử thai 65
					this.categoryRepository.createOne({
						data: {
							name: 'Que thử rụng trứng',
							order: 4,
							parent: cate48 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Que thử rụng trứng 66
				]);

				// Cate2 / 49: Chăm sóc sức khỏe / Chăm sóc Mắt/Tai/Mũi
				const [
					cate67,
					cate68,
					cate69,
					cate70,
					cate71,
					cate72,
					cate73,
					cate74,
					cate75,
					cate76,
					cate77,
					cate78,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Kính sát tròng',
							order: 1,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kính sát tròng 67
					this.categoryRepository.createOne({
						data: {
							name: 'Nước ngâm kính sát tròng',
							order: 2,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước ngâm kính sát tròng 68
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc nhỏ mắt',
							order: 3,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc nhỏ mắt 69
					this.categoryRepository.createOne({
						data: {
							name: 'Mỡ mắt và Thuốc nhỏ mắt chuyên sâu',
							order: 4,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Mỡ mắt và Thuốc nhỏ mắt chuyên sâu 70
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc nhỏ tai',
							order: 5,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc nhỏ tai 71
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc xịt mũi',
							order: 6,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc xịt mũi 72
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm khác',
							order: 7,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm khác 73
					this.categoryRepository.createOne({
						data: {
							name: 'Thuốc xịt mũi trẻ em',
							order: 8,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thuốc xịt mũi trẻ em 74
					this.categoryRepository.createOne({
						data: {
							name: 'Kính mắt',
							order: 9,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kính mắt 75
					this.categoryRepository.createOne({
						data: {
							name: 'Kính đọc',
							order: 10,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kính đọc 76
					this.categoryRepository.createOne({
						data: {
							name: 'Kính bảo hộ',
							order: 11,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kính bảo hộ 77
					this.categoryRepository.createOne({
						data: {
							name: 'Kính bơi',
							order: 12,
							parent: cate49 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kính bơi 78
				]);

				// Cate2 / 50: Chăm sóc sức khỏe / Chăm sóc chân
				const [cate79, cate80, cate81, cate82, cate83, cate84] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Miếng đệm chân',
								order: 1,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Miếng đệm chân 79
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm khử mùi hôi chân',
								order: 2,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm khử mùi hôi chân 80
						this.categoryRepository.createOne({
							data: {
								name: 'Dụng cụ chăm sóc chân',
								order: 3,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dụng cụ chăm sóc chân 81
						this.categoryRepository.createOne({
							data: {
								name: 'Kem trị nứt gót chân',
								order: 4,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Kem trị nứt gót chân 82
						this.categoryRepository.createOne({
							data: {
								name: 'Dưỡng da chân & tẩy tế bào chết',
								order: 5,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dưỡng da chân & tẩy tế bào chết 83
						this.categoryRepository.createOne({
							data: {
								name: 'Mặt nạ chân',
								order: 6,
								parent: cate50 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Mặt nạ chân 84
					]);
			}

			// Cate3
			{
				// Cate3: Chăm sóc cá nhân
				const [
					cateImg85,
					cateImg86,
					cateImg87,
					cateImg88,
					cateImg89,
					cateImg90,
					cateImg91,
				] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.02_S%E1%BA%A3n_ph%E1%BA%A9m_ph%C3%B2ng_t%E1%BA%AFm_3.02-Bath_Care_San_pham_phong_tam.png',
							publicId: 'cateImg85',
							fileName: 'cateImg85.jpg',
							description: 'Sản phẩm phòng tắm',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.04_S%E1%BA%A3n_ph%E1%BA%A9m_kh%E1%BB%AD_m%C3%B9i_3.04-Deodorant_San_pham_khu_mui.png',
							publicId: 'cateImg86',
							fileName: 'cateImg86.jpg',
							description: 'Sản phẩm khử mùi',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.05_Ch%C4%83m_s%C3%B3c_t%C3%B3c_3.05-Hair_Care_Cham_soc_toc.png',
							publicId: 'cateImg87',
							fileName: 'cateImg87.jpg',
							description: 'Chăm sóc tóc',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.06_V%E1%BB%87_sinh_ph%E1%BB%A5_n%E1%BB%AF_3.06-Feminine_Hygiene_Ve_sinh_phu_nu.png',
							publicId: 'cateImg88',
							fileName: 'cateImg88.jpg',
							description: 'Vệ sinh phụ nữ',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.07_Ch%C4%83m_s%C3%B3c_nam_gi%E1%BB%9Bi_3.07-Men_Care_Cham_soc_nam_gioi.png',
							publicId: 'cateImg89',
							fileName: 'cateImg89.jpg',
							description: 'Chăm sóc nam giới',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.08_Ch%C4%83m_s%C3%B3c_r%C4%83ng_mi%E1%BB%87ng_3.08-Oral_Care_Cham_soc_rang_mieng.png',
							publicId: 'cateImg90',
							fileName: 'cateImg90.jpg',
							description: 'Chăm sóc răng miệng',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/3.03_Ch%C4%83m_s%C3%B3c_c%C6%A1_th%E1%BB%83_3.03-Body_Care_Cham_soc_co_the.png',
							publicId: 'cateImg91',
							fileName: 'cateImg91.jpg',
							description: 'Chăm sóc cơ thể',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [cate85, cate86, cate87, cate88, cate89, cate90, cate91] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm phòng tắm',
								order: 1,
								parent: cate3 || undefined,
								images: [cateImg85 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm phòng tắm 85
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm khử mùi',
								order: 2,
								parent: cate3 || undefined,
								images: [cateImg86 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm khử mùi 86
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc tóc',
								order: 3,
								parent: cate3 || undefined,
								images: [cateImg87 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc tóc 87
						this.categoryRepository.createOne({
							data: {
								name: 'Vệ sinh phụ nữ',
								order: 4,
								parent: cate3 || undefined,
								images: [cateImg88 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Vệ sinh phụ nữ 88
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc nam giới',
								order: 5,
								parent: cate3 || undefined,
								images: [cateImg89 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc nam giới 89
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc răng miệng',
								order: 6,
								parent: cate3 || undefined,
								images: [cateImg90 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc răng miệng 90
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc cơ thể',
								order: 7,
								parent: cate3 || undefined,
								images: [cateImg91 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc cơ thể 91
					]);

				const [cate92, cate93, cate94, cate95] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Sữa tắm',
							order: 1,
							parent: cate85 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa tắm 92
					this.categoryRepository.createOne({
						data: {
							name: 'Xà bông cục',
							order: 2,
							parent: cate85 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Xà bông cục 93
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện phòng tắm',
							order: 3,
							parent: cate85 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện phòng tắm 94
					this.categoryRepository.createOne({
						data: {
							name: 'Nước rửa tay',
							order: 4,
							parent: cate85 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước rửa tay 95
				]);

				const [cate96, cate97, cate98] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Lăn khử mùi',
							order: 1,
							parent: cate86 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Lăn khử mùi 96
					this.categoryRepository.createOne({
						data: {
							name: 'Xịt khử mùi',
							order: 2,
							parent: cate86 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Xịt khử mùi 97
					this.categoryRepository.createOne({
						data: {
							name: 'Sáp khử mùi',
							order: 3,
							parent: cate86 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sáp khử mùi 98
				]);

				const [cate99, cate100, cate101, cate102, cate103] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu gội đầu',
							order: 1,
							parent: cate87 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu gội đầu 99
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu xả',
							order: 2,
							parent: cate87 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu xả 100
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng tóc',
							order: 3,
							parent: cate87 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dưỡng tóc 101
					this.categoryRepository.createOne({
						data: {
							name: 'Tạo kiểu tóc',
							order: 4,
							parent: cate87 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tạo kiểu tóc 102
					this.categoryRepository.createOne({
						data: {
							name: 'Nhuộm tóc',
							order: 5,
							parent: cate87 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nhuộm tóc 103
				]);

				const [cate104, cate105, cate106, cate107, cate108] = await Promise.all(
					[
						this.categoryRepository.createOne({
							data: {
								name: 'Dung dịch vệ sinh phụ nữ',
								order: 1,
								parent: cate88 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dung dịch vệ sinh phụ nữ 104
						this.categoryRepository.createOne({
							data: {
								name: 'BVS hàng ngày',
								order: 2,
								parent: cate88 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // BVS hàng ngày 105
						this.categoryRepository.createOne({
							data: {
								name: 'Băng vệ sinh',
								order: 3,
								parent: cate88 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Băng vệ sinh 106
						this.categoryRepository.createOne({
							data: {
								name: 'BVS dạng ống',
								order: 4,
								parent: cate88 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // BVS dạng ống 107
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm vệ sinh khác',
								order: 5,
								parent: cate88 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm vệ sinh khác 108
					],
				);

				const [cate109, cate110, cate111, cate112, cate113] = await Promise.all(
					[
						this.categoryRepository.createOne({
							data: {
								name: 'Dao cạo râu & Bọt cạo râu',
								order: 1,
								parent: cate89 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dao cạo râu & Bọt cạo râu 109
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc tóc cho nam',
								order: 2,
								parent: cate89 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc tóc cho nam 110
						this.categoryRepository.createOne({
							data: {
								name: 'Chăm sóc da mặt cho nam',
								order: 3,
								parent: cate89 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Chăm sóc da mặt cho nam 111
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm tắm & dưỡng thể cho nam',
								order: 4,
								parent: cate89 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm tắm & dưỡng thể cho nam 112
						this.categoryRepository.createOne({
							data: {
								name: 'Khử mùi cho nam',
								order: 5,
								parent: cate89 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Khử mùi cho nam 113
					],
				);

				const [cate114, cate115, cate116, cate117, cate118, cate119] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Kem đánh răng',
								order: 1,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Kem đánh răng 114
						this.categoryRepository.createOne({
							data: {
								name: 'Bàn chải đánh răng',
								order: 2,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Bàn chải đánh răng 115
						this.categoryRepository.createOne({
							data: {
								name: 'Nước súc miệng',
								order: 3,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Nước súc miệng 116
						this.categoryRepository.createOne({
							data: {
								name: 'Tăm chỉ nha khoa',
								order: 4,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Tăm chỉ nha khoa 117
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm chăm sóc răng miệng khác',
								order: 5,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm chăm sóc răng miệng khác 118
						this.categoryRepository.createOne({
							data: {
								name: 'Bột đánh răng',
								order: 6,
								parent: cate90 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Bột đánh răng 119
					]);

				const [cate120, cate121, cate122, cate123, cate124, cate125, cate126] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Dưỡng thể',
								order: 1,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dưỡng thể 120
						this.categoryRepository.createOne({
							data: {
								name: 'Dầu dưỡng thể & massage',
								order: 2,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dầu dưỡng thể & massage 121
						this.categoryRepository.createOne({
							data: {
								name: 'Tẩy tế bào chết toàn thân',
								order: 3,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Tẩy tế bào chết toàn thân 122
						this.categoryRepository.createOne({
							data: {
								name: 'Kem chống nắng toàn thân',
								order: 4,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Kem chống nắng toàn thân 123
						this.categoryRepository.createOne({
							data: {
								name: 'Dưỡng da tay & tẩy tế bào chết',
								order: 5,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Dưỡng da tay & tẩy tế bào chết 124
						this.categoryRepository.createOne({
							data: {
								name: 'Mặt nạ tay',
								order: 6,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Mặt nạ tay 125
						this.categoryRepository.createOne({
							data: {
								name: 'Đặc trị cơ thể',
								order: 7,
								parent: cate91 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Đặc trị cơ thể 126
					]);
			}

			// Cate4
			{
				// Cate4: Sản phẩm tiện lợi
				const [cateImg127, cateImg128] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/5.01_H%C3%A0ng_t%E1%BB%95ng_h%E1%BB%A3p_5.01-General_Merchandise_Hang_tong_hop.png',
							publicId: 'cateImg127',
							fileName: 'cateImg127.jpg',
							description: 'Hàng tổng hợp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/H%C3%A0ng_b%C3%A1ch_h%C3%B3a.png',
							publicId: 'cateImg128',
							fileName: 'cateImg128.jpg',
							description: 'Hàng bách hóa',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [cate127, cate128] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Hàng tổng hợp',
							order: 1,
							parent: cate4 || undefined,
							images: [cateImg127 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Hàng tổng hợp 127
					this.categoryRepository.createOne({
						data: {
							name: 'Hàng bách hóa',
							order: 2,
							parent: cate4 || undefined,
							images: [cateImg128 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Hàng bách hóa 128
				]);

				const [cate129, cate130, cate131, cate132] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Hàng dành cho du lịch',
							order: 1,
							parent: cate127 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Hàng dành cho du lịch 129
					this.categoryRepository.createOne({
						data: {
							name: 'Khăn giấy, khăn ướt',
							order: 2,
							parent: cate127 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Khăn giấy, khăn ướt 130
					this.categoryRepository.createOne({
						data: {
							name: 'Hàng theo mùa',
							order: 3,
							parent: cate127 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Hàng theo mùa 131
					this.categoryRepository.createOne({
						data: {
							name: 'Thiết bị điện gia dụng',
							order: 4,
							parent: cate127 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thiết bị điện gia dụng 132
				]);

				const [cate133, cate134, cate135, cate136, cate137, cate138, cate139] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Thức uống',
								order: 1,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Thức uống 133
						this.categoryRepository.createOne({
							data: {
								name: 'Bánh quy',
								order: 2,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Bánh quy 134
						this.categoryRepository.createOne({
							data: {
								name: 'Bánh snack',
								order: 3,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Bánh snack 135
						this.categoryRepository.createOne({
							data: {
								name: 'Kẹo, gum',
								order: 4,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Kẹo, gum 136
						this.categoryRepository.createOne({
							data: {
								name: 'Kem',
								order: 5,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Kem 137
						this.categoryRepository.createOne({
							data: {
								name: 'Sản phẩm sữa và từ sữa',
								order: 6,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Sản phẩm sữa và từ sữa 138
						this.categoryRepository.createOne({
							data: {
								name: 'Thực phẩm khác',
								order: 7,
								parent: cate128 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Thực phẩm khác 139
					]);
			}

			// Cate5
			{
				// Cate5: Thực phẩm chức năng
				const [
					cateImg140,
					cateImg141,
					cateImg142,
					cateImg143,
					cateImg144,
					cateImg145,
					cateImg146,
					cateImg147,
					cateImg148,
					cateImg149,
					cateImg150,
					cateImg151,
					cateImg152,
					cateImg153,
				] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.01_6.01-TPCN_Nh%C3%B3m_ti%C3%AAu_h%C3%B3a_6.01-VMS_For_Stomach_TPCN_Nhom_tieu_hoa.png',
							publicId: 'cateImg141',
							fileName: 'cateImg141.jpg',
							description: 'TPCN Nhóm dạ dày',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.02_6.02-TPCN_Nh%C3%B3m_tim_m%E1%BA%A1ch_-_Huy%E1%BA%BFt_%C3%A1p_6.02-VMS_For_Heart_TPCN_Nhom_tim_mach_-_h.png',
							publicId: 'cateImg142',
							fileName: 'cateImg142.jpg',
							description: 'TPCN Nhóm tim mạch',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.02.03_6.02.03-TPCN_Nh%C3%B3m_%C4%91%C6%B0%E1%BB%9Dng_huy%E1%BA%BFt_6.02.03-Diabetic_TPCN_Nhom_Duong_Huyet.png',
							publicId: 'cateImg143',
							fileName: 'cateImg143.jpg',
							description: 'TPCN Nhóm đường huyết',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.03_6.03-TPCN_Nh%C3%B3m_h%C3%B4_h%E1%BA%A5p_6.03-VMS_For_Lungs_TPCN_Nhom_ho_hap.png',
							publicId: 'cateImg144',
							fileName: 'cateImg144.jpg',
							description: 'TPCN Nhóm hô hấp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.04_6.04-TPCN_Nh%C3%B3m_th%E1%BA%A7n_kinh_6.04-VMS_For_Brain_TPCN_Nhom_than_kinh.png',
							publicId: 'cateImg145',
							fileName: 'cateImg145.jpg',
							description: 'TPCN Nhóm thần kinh',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.05_6.05-TPCN_Nh%C3%B3m_c%C6%A1_x%C6%B0%C6%A1ng_kh%E1%BB%9Bp_6.05-VMS_For_Bone__Joint_TPCN_Nhom_co_xuong_kho.png',
							publicId: 'cateImg146',
							fileName: 'cateImg146.jpg',
							description: 'TPCN Nhóm cơ xương khớp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.06_6.06-TPCN_Gi%E1%BA%A3m_c%C3%A2n_6.06-VMS_Dietary_TPCN_Giam_Can.jpg',
							publicId: 'cateImg147',
							fileName: 'cateImg147.jpg',
							description: 'TPCN Giảm cân',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.17.png',
							publicId: 'cateImg148',
							fileName: 'cateImg148.jpg',
							description: 'TPCN Chăm sóc sắc đẹp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.08_6.08-TPCN_Ch%C4%83m_s%C3%B3c_s%E1%BB%A9c_kh%E1%BB%8Fe_nam_v%C3%A0_n%E1%BB%AF_6.08-VMS_Mens__Womens_Health_TPCN_Cham.jpg',
							publicId: 'cateImg149',
							fileName: 'cateImg149.jpg',
							description: 'TPCN Chăm sóc sức khỏe nam và nữ',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.09_6.09-TPCN_Nh%C3%B3m_M%E1%BA%AFtTaiM%C5%A9i_6.09-VMS_For_EyeEarNose_TPCN_Nhom_MatTaiMui_-_Copy.png',
							publicId: 'cateImg150',
							fileName: 'cateImg150.jpg',
							description: 'TPCN Nhóm Mắt/Tai/Mũi',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.10_6.10-TPCN_Vitamin_t%E1%BB%95ng_h%E1%BB%A3p_v%C3%A0_kho%C3%A1ng_ch%E1%BA%A5t_6.10-VMS_General_Vitamins__Mineral.png',
							publicId: 'cateImg151',
							fileName: 'cateImg151.jpg',
							description: 'TPCN Vitamin tổng hợp và khoáng chất',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.11.png',
							publicId: 'cateImg152',
							fileName: 'cateImg152.jpg',
							description: 'TPCN Chăm sóc tóc',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.14_6.14-TPCN_Nh%C3%B3m_kh%C3%A1c_6.14-VMS_Others_TPCN_Nhom_khac.png',
							publicId: 'cateImg153',
							fileName: 'cateImg153.jpg',
							description: 'TPCN Nhóm khác',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.15_6.15-TPCN_cho_gan_6.15-VMS_For_Liver_TPCN_Cho_Gan.png',
							publicId: 'cateImg154',
							fileName: 'cateImg154.jpg',
							description: 'TPCN cho gan',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [
					cate140,
					cate141,
					cate142,
					cate143,
					cate144,
					cate145,
					cate146,
					cate147,
					cate148,
					cate149,
					cate150,
					cate151,
					cate152,
					cate153,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm dạ dày',
							order: 1,
							parent: cate5 || undefined,
							images: [cateImg140 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm dạ dày 140
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm tim mạch',
							order: 2,
							parent: cate5 || undefined,
							images: [cateImg141 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm tim mạch 141
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm đường huyết',
							order: 3,
							parent: cate5 || undefined,
							images: [cateImg142 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm đường huyết 142
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm hô hấp',
							order: 4,
							parent: cate5 || undefined,
							images: [cateImg143 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm hô hấp 143
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm thần kinh',
							order: 5,
							parent: cate5 || undefined,
							images: [cateImg144 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm thần kinh 144
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm cơ xương khớp',
							order: 6,
							parent: cate5 || undefined,
							images: [cateImg145 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm cơ xương khớp 145
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Giảm cân',
							order: 7,
							parent: cate5 || undefined,
							images: [cateImg146 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Giảm cân 146
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc sắc đẹp',
							order: 8,
							parent: cate5 || undefined,
							images: [cateImg147 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Chăm sóc sắc đẹp 147
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc sức khỏe nam và nữ',
							order: 9,
							parent: cate5 || undefined,
							images: [cateImg148 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Chăm sóc sức khỏe nam và nữ 148
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm Mắt/Tai/Mũi',
							order: 10,
							parent: cate5 || undefined,
							images: [cateImg149 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm Mắt/Tai/Mũi 149
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Vitamin tổng hợp và khoáng chất',
							order: 11,
							parent: cate5 || undefined,
							images: [cateImg150 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Vitamin tổng hợp và khoáng chất 150
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Chăm sóc tóc',
							order: 12,
							parent: cate5 || undefined,
							images: [cateImg151 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Chăm sóc tóc 151
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm khác',
							order: 13,
							parent: cate5 || undefined,
							images: [cateImg152 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm khác 152
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho gan',
							order: 14,
							parent: cate5 || undefined,
							images: [cateImg153 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho gan 153
				]);

				const [cate154, cate155, cate156] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho Dạ Dày',
							order: 1,
							parent: cate140 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho Dạ Dày 154
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm tiêu hóa',
							order: 2,
							parent: cate140 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm tiêu hóa 155
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN nhóm khác',
							order: 3,
							parent: cate140 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN nhóm khác 156
				]);

				const [cate157, cate158] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Cho Huyết Áp',
							order: 1,
							parent: cate141 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Cho Huyết Áp 157
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Tuần hoàn máu',
							order: 2,
							parent: cate141 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Tuần hoàn máu 158
				]);

				const [cate159, cate160, cate161] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Nhóm Keo Ong',
							order: 1,
							parent: cate143 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Nhóm Keo Ong 159
					this.categoryRepository.createOne({
						data: {
							name: 'Nhóm xịt họng thảo dược',
							order: 2,
							parent: cate143 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nhóm xịt họng thảo dược 160
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Cho Phổi Khác',
							order: 3,
							parent: cate143 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Cho Phổi Khác 161
				]);

				const cate162 = await this.categoryRepository.createOne({
					data: {
						name: 'TPCN giảm căng thẳng',
						order: 1,
						parent: cate144 || undefined,
					},
					options: {
						transaction: true,
					},
				}); // TPCN giảm căng thẳng 162

				const [cate163, cate164, cate165, cate166] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN chống loãng xương',
							order: 1,
							parent: cate145 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN chống loãng xương 163
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ khớp',
							order: 2,
							parent: cate145 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ khớp 164
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ gút',
							order: 3,
							parent: cate145 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ gút 165
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ xương khớp khác',
							order: 4,
							parent: cate145 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ xương khớp khác 166
				]);

				const [cate167, cate168, cate169] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN đốt mỡ',
							order: 1,
							parent: cate146 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN đốt mỡ 167
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ chuyển hóa mỡ',
							order: 2,
							parent: cate146 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ chuyển hóa mỡ 168
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN tăng cân',
							order: 3,
							parent: cate146 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN tăng cân 169
				]);

				const [cate170, cate171, cate172] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN đẹp da',
							order: 1,
							parent: cate147 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN đẹp da 170
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho tóc',
							order: 2,
							parent: cate147 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho tóc 171
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ da móng tóc',
							order: 3,
							parent: cate147 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ da móng tóc 172
				]);

				const [cate173, cate174] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ sinh lý nam',
							order: 1,
							parent: cate148 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ sinh lý nam 173
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN hỗ trợ sinh lý nữ',
							order: 2,
							parent: cate148 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN hỗ trợ sinh lý nữ 174
				]);

				const [cate175, cate176, cate177] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho mắt',
							order: 1,
							parent: cate149 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho mắt 175
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho tai',
							order: 2,
							parent: cate149 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho tai 176
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho mũi',
							order: 3,
							parent: cate149 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho mũi 177
				]);

				const [cate178, cate179, cate180, cate181, cate182, cate183] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Vitamin tổng hợp',
								order: 1,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Vitamin tổng hợp 178
						this.categoryRepository.createOne({
							data: {
								name: 'Vitamin C',
								order: 2,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Vitamin C 179
						this.categoryRepository.createOne({
							data: {
								name: 'Vitamin A/B/D',
								order: 3,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // Vitamin A/B/D 180
						this.categoryRepository.createOne({
							data: {
								name: 'TPCN khác',
								order: 4,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // TPCN khác 181
						this.categoryRepository.createOne({
							data: {
								name: 'TPCN cung cấp sắt',
								order: 5,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // TPCN cung cấp sắt 182
						this.categoryRepository.createOne({
							data: {
								name: 'TPCN nhóm Omega',
								order: 6,
								parent: cate150 || undefined,
							},
							options: {
								transaction: true,
							},
						}), // TPCN nhóm Omega 183
					]);

				const [cate184, cate185] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN giải độc gan',
							order: 1,
							parent: cate153 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN giải độc gan 184
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN dành cho gan khác',
							order: 2,
							parent: cate153 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN dành cho gan khác 185
				]);
			}

			// Cate6
			{
				// Cate6: Mẹ và Bé
				const [cateImg186, cateImg187, cateImg188, cateImg189] =
					await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/photo_2021-08-23_21-10-35_8080.png',
								publicId: 'cateImg186',
								fileName: 'cateImg186.jpg',
								description: 'Chăm sóc em bé',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.12_6.12-TPCN_D%C3%A0nh_cho_tr%E1%BA%BB_em_6.12-VMS_For_Kids_TPCN_Danh_cho_tre_em.png',
								publicId: 'cateImg187',
								fileName: 'cateImg187.jpg',
								description: 'TPCN dành cho trẻ em',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/photo_2021-08-23_21-08-20.png',
								publicId: 'cateImg188',
								fileName: 'cateImg188.jpg',
								description: 'Sản phẩm dành cho mẹ',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/6.16.png',
								publicId: 'cateImg189',
								fileName: 'cateImg189.jpg',
								description: 'TPCN dành cho phụ nữ mang thai',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
					]);
				const [cate186, cate187, cate188, cate189] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc em bé',
							order: 1,
							parent: cate6 || undefined,
							images: [cateImg186 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc em bé 186
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN dành cho trẻ em',
							order: 2,
							parent: cate6 || undefined,
							images: [cateImg187 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN dành cho trẻ em 187
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm dành cho mẹ',
							order: 3,
							parent: cate6 || undefined,
							images: [cateImg188 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm dành cho mẹ 188
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN dành cho phụ nữ mang thai',
							order: 4,
							parent: cate6 || undefined,
							images: [cateImg189 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // TPCN dành cho phụ nữ mang thai 189
				]);

				const [
					cate190,
					cate191,
					cate192,
					cate193,
					cate194,
					cate195,
					cate196,
					cate197,
					cate198,
					cate199,
					cate200,
					cate201,
					cate202,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện cho bé',
							order: 1,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện cho bé 190
					this.categoryRepository.createOne({
						data: {
							name: 'Kem & dầu dưỡng cho bé',
							order: 2,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem & dầu dưỡng cho bé 191
					this.categoryRepository.createOne({
						data: {
							name: 'Phấn rôm',
							order: 3,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phấn rôm 192
					this.categoryRepository.createOne({
						data: {
							name: 'Đồ dùng phòng tắm cho bé',
							order: 4,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Đồ dùng phòng tắm cho bé 193
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu gội cho bé',
							order: 5,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu gội cho bé 194
					this.categoryRepository.createOne({
						data: {
							name: 'Tã cho bé',
							order: 6,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tã cho bé 195
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chống muỗi cho bé',
							order: 7,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chống muỗi cho bé 196
					this.categoryRepository.createOne({
						data: {
							name: 'Khăn ướt cho bé',
							order: 8,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Khăn ướt cho bé 197
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chăm sóc sức khoẻ cho bé',
							order: 9,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chăm sóc sức khoẻ cho bé 198
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm dành cho bé',
							order: 10,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thực phẩm dành cho bé 199
					this.categoryRepository.createOne({
						data: {
							name: ' Sữa dành cho bé',
							order: 11,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa dành cho bé 200
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc cá nhân cho bé',
							order: 12,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc cá nhân cho bé 201
					this.categoryRepository.createOne({
						data: {
							name: 'Tăm bông cho bé',
							order: 13,
							parent: cate186 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tăm bông cho bé 202
				]);

				const [
					cate203,
					cate204,
					cate205,
					cate206,
					cate207,
					cate208,
					cate209,
					cate210,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN cho não của trẻ',
							order: 1,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN cho não của trẻ 203
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN tiêu hóa cho trẻ',
							order: 2,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN tiêu hóa cho trẻ 204
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN dành cho mắt của trẻ',
							order: 3,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN dành cho mắt của trẻ 205
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN tăng chiều cao cho trẻ',
							order: 4,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN tăng chiều cao cho trẻ 206
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN tổng hợp cho trẻ',
							order: 5,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN tổng hợp cho trẻ 207
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN tăng cân cho trẻ',
							order: 6,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN tăng cân cho trẻ 208
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN khác cho trẻ',
							order: 7,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN khác cho trẻ 209
					this.categoryRepository.createOne({
						data: {
							name: 'TPCN Cung cấp vit D cho bé',
							order: 8,
							parent: cate187 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // TPCN Cung cấp vit D cho bé 210
				]);

				const [
					cate211,
					cate212,
					cate213,
					cate214,
					cate215,
					cate216,
					cate217,
					cate218,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu dưỡng thể cho mẹ',
							order: 1,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu dưỡng thể cho mẹ 211
					this.categoryRepository.createOne({
						data: {
							name: 'Sữa cho mẹ',
							order: 2,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa cho mẹ 212
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện cho mẹ',
							order: 3,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện cho mẹ 213
					this.categoryRepository.createOne({
						data: {
							name: 'Băng lót cho mẹ',
							order: 4,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Băng lót cho mẹ 214
					this.categoryRepository.createOne({
						data: {
							name: 'Dụng cụ chăm sóc cho mẹ',
							order: 5,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dụng cụ chăm sóc cho mẹ 215
					this.categoryRepository.createOne({
						data: {
							name: 'Dung dịch cho mẹ',
							order: 6,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dung dịch cho mẹ 216
					this.categoryRepository.createOne({
						data: {
							name: 'Thực phẩm cho mẹ',
							order: 7,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Thực phẩm cho mẹ 217
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm có da mặt cho mẹ',
							order: 8,
							parent: cate188 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Chăm có da mặt cho mẹ 218
				]);
			}

			// Cate7
			{
				// Cate7: Chăm sóc sắc đẹp
				const [cateImg219, cateImg220, cateImg221, cateImg222] =
					await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/4.01_Ch%C4%83m_s%C3%B3c_m%E1%BA%B7t_4.01-Face_Care_Cham_soc_mat.png',
								publicId: 'cateImg219',
								fileName: 'cateImg219.jpg',
								description: 'Chăm sóc mặt',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/4.02_S%E1%BA%A3n_ph%E1%BA%A9m_ch%E1%BB%91ng_n%E1%BA%AFng_4.02-Sun_Care_San_pham_chong_nang.png',
								publicId: 'cateImg220',
								fileName: 'cateImg220.jpg',
								description: 'Sản phẩm chống nắng',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/4.03_D%E1%BB%A5ng_c%E1%BB%A5_l%C3%A0m_%C4%91%E1%BA%B9p_4.03-Beauty_Accessories_Dung_cu_lam_dep.png',
								publicId: 'cateImg221',
								fileName: 'cateImg221.jpg',
								description: 'Dụng cụ làm đẹp',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2_01_D%C6%B0%E1%BB%A3c_m%E1%BB%B9_ph%E1%BA%A9m_2_01_Dermo_Skincare_Duoc_my_pham2.png',
								publicId: 'cateImg222',
								fileName: 'cateImg222.jpg',
								description: 'Dược mỹ phẩm',
								width: 80,
								height: 80,
							},
							options: {
								transaction: true,
							},
						}),
					]);
				const [cate219, cate220, cate221, cate222] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Chăm sóc mặt',
							order: 1,
							parent: cate7 || undefined,
							images: [cateImg219 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Chăm sóc mặt 219
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chống nắng',
							order: 2,
							parent: cate7 || undefined,
							images: [cateImg220 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chống nắng 220
					this.categoryRepository.createOne({
						data: {
							name: 'Dụng cụ làm đẹp',
							order: 3,
							parent: cate7 || undefined,
							images: [cateImg221 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Dụng cụ làm đẹp 221
					this.categoryRepository.createOne({
						data: {
							name: 'Dược mỹ phẩm',
							order: 4,
							parent: cate7 || undefined,
							images: [cateImg222 || undefined],
						},
						options: {
							transaction: true,
						},
					}), // Dược mỹ phẩm 222
				]);

				const [
					cate223,
					cate224,
					cate225,
					cate226,
					cate227,
					cate228,
					cate229,
					cate230,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Nước tẩy trang',
							order: 1,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước tẩy trang 223
					this.categoryRepository.createOne({
						data: {
							name: 'Mặt nạ dưỡng da',
							order: 2,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Mặt nạ dưỡng da 224
					this.categoryRepository.createOne({
						data: {
							name: 'Sữa rửa mặt',
							order: 3,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa rửa mặt 225
					this.categoryRepository.createOne({
						data: {
							name: 'Tẩy tế bào chết cho mặt',
							order: 4,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tẩy tế bào chết cho mặt 226
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng môi',
							order: 5,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dưỡng môi 227
					this.categoryRepository.createOne({
						data: {
							name: 'Kem dưỡng ẩm và dưỡng da',
							order: 6,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem dưỡng ẩm và dưỡng da 228
					this.categoryRepository.createOne({
						data: {
							name: 'Nước hoa hồng & Xịt khoáng',
							order: 7,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước hoa hồng & Xịt khoáng 229
					this.categoryRepository.createOne({
						data: {
							name: 'Kem trị mụn',
							order: 8,
							parent: cate219 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem trị mụn 230
				]);

				const [cate231, cate232, cate233] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Kem chống nắng dành cho mặt',
							order: 1,
							parent: cate220 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem chống nắng dành cho mặt 231
					this.categoryRepository.createOne({
						data: {
							name: 'Kem chống nắng cho mặt và cơ thể',
							order: 3,
							parent: cate220 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem chống nắng cho mặt và cơ thể 232
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng da sau khi đi nắng',
							order: 4,
							parent: cate220 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dưỡng da sau khi đi nắng 233
				]);

				const [cate234, cate235, cate236, cate237] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Cotton',
							order: 1,
							parent: cate221 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Cotton 234
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện trang điểm',
							order: 2,
							parent: cate221 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện trang điểm 235
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện tóc',
							order: 3,
							parent: cate221 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện tóc 236
					this.categoryRepository.createOne({
						data: {
							name: 'Phụ kiện làm móng',
							order: 4,
							parent: cate221 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Phụ kiện làm móng 237
				]);

				const [
					cate238,
					cate239,
					cate240,
					cate241,
					cate242,
					cate243,
					cate244,
					cate245,
					cate246,
					cate247,
					cate248,
					cate249,
					cate250,
					cate251,
				] = await Promise.all([
					this.categoryRepository.createOne({
						data: {
							name: 'Tinh chất & Serum',
							order: 1,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tinh chất & Serum 238
					this.categoryRepository.createOne({
						data: {
							name: 'Kem dưỡng ẩm',
							order: 2,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Kem dưỡng ẩm 239
					this.categoryRepository.createOne({
						data: {
							name: 'Nước cân bằng & xịt khoáng',
							order: 3,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước cân bằng & xịt khoáng 240
					this.categoryRepository.createOne({
						data: {
							name: 'Nước tẩy trang & sữa rửa mặt',
							order: 4,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Nước tẩy trang & sữa rửa mặt 241
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chống nắng & sau khi đi nắng',
							order: 6,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chống nắng & sau khi đi nắng 242
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm trị sẹo',
							order: 7,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm trị sẹo 243
					this.categoryRepository.createOne({
						data: {
							name: 'Tẩy tế bào chết chuyên sâu',
							order: 8,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Tẩy tế bào chết chuyên sâu 244
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm khử mùi chuyên sâu',
							order: 9,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm khử mùi chuyên sâu 245
					this.categoryRepository.createOne({
						data: {
							name: 'Dưỡng thể chuyên sâu',
							order: 10,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dưỡng thể chuyên sâu 246
					this.categoryRepository.createOne({
						data: {
							name: ' Sữa tắm chuyên sâu',
							order: 11,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sữa tắm chuyên sâu 247
					this.categoryRepository.createOne({
						data: {
							name: 'Dầu gội & dầu xả chuyên sâu',
							order: 13,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dầu gội & dầu xả chuyên sâu 248
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm chống lão hóa',
							order: 14,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm chống lão hóa 249
					this.categoryRepository.createOne({
						data: {
							name: 'Sản phẩm trị mụn',
							order: 15,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Sản phẩm trị mụn 250
					this.categoryRepository.createOne({
						data: {
							name: 'Dược mỹ phẩm cho da vùng mắt',
							order: 16,
							parent: cate222 || undefined,
						},
						options: {
							transaction: true,
						},
					}), // Dược mỹ phẩm cho da vùng mắt 251
				]);
			}

			// Cate8
			{
				// Cate8: Thiết bị y tế
				const [
					cateImg252,
					cateImg253,
					cateImg254,
					cateImg255,
					cateImg256,
					cateImg257,
				] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.05.01_Nhi%E1%BB%87t_k%E1%BA%BF_2.05.01-Thermometers_Nhiet_ke_l.png',
							publicId: 'cateImg252',
							fileName: 'cateImg252.jpg',
							description: 'Nhiệt kế',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.05.02_M%C3%A1y_%C4%91o_huy%E1%BA%BFt_%C3%A1p_2.05.02-Blood_Pressure_Monitors_May_do_huyet_ap.png',
							publicId: 'cateImg253',
							fileName: 'cateImg253.jpg',
							description: 'Máy đo huyết áp',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.05.03_M%C3%A1y_%C4%91o_%C4%91%C6%B0%E1%BB%9Dng_huy%E1%BA%BFt_2.05.03-Blood_Glucose_Monitors_May_do_duong_huyet.png',
							publicId: 'cateImg254',
							fileName: 'cateImg254.jpg',
							description: 'Máy đo đường huyết',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.05.04_M%C3%A1y_x%C3%B4ng_kh%C3%AD_dung_2.05.04-Nebulizer__Aspirators_May_xong_khi_dung.png',
							publicId: 'cateImg255',
							fileName: 'cateImg255.jpg',
							description: 'Máy xông khí dung',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/2.05.05_Thi%E1%BA%BFt_b%E1%BB%8B_y_t%E1%BA%BF_kh%C3%A1c_2.05.05-Other_Medical_Devices_Thiet_bi_y_te_khac.png',
							publicId: 'cateImg256',
							fileName: 'cateImg256.jpg',
							description: 'Thiết bị y tế khác',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/cat-dung-cu-kiem-tra.png',
							publicId: 'cateImg257',
							fileName: 'cateImg257.jpg',
							description: 'Dụng cụ kiểm tra',
							width: 80,
							height: 80,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				const [cate252, cate253, cate254, cate255, cate256, cate257] =
					await Promise.all([
						this.categoryRepository.createOne({
							data: {
								name: 'Nhiệt kế',
								order: 1,
								parent: cate8 || undefined,
								images: [cateImg252 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Nhiệt kế 252
						this.categoryRepository.createOne({
							data: {
								name: 'Máy đo huyết áp',
								order: 2,
								parent: cate8 || undefined,
								images: [cateImg253 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Máy đo huyết áp 253
						this.categoryRepository.createOne({
							data: {
								name: 'Máy đo đường huyết',
								order: 3,
								parent: cate8 || undefined,
								images: [cateImg254 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Máy đo đường huyết 254
						this.categoryRepository.createOne({
							data: {
								name: 'Máy xông khí dung',
								order: 4,
								parent: cate8 || undefined,
								images: [cateImg255 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Máy xông khí dung 255
						this.categoryRepository.createOne({
							data: {
								name: 'Thiết bị y tế khác',
								order: 5,
								parent: cate8 || undefined,
								images: [cateImg256 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Thiết bị y tế khác 256
						this.categoryRepository.createOne({
							data: {
								name: 'Dụng cụ kiểm tra',
								order: 6,
								parent: cate8 || undefined,
								images: [cateImg257 || undefined],
							},
							options: {
								transaction: true,
							},
						}), // Dụng cụ kiểm tra 257
					]);
			}
			//
			// // Seed origins
			// const [origin1, origin2, origin3] = await Promise.all([
			// 	this.originRepository.createOne({
			// 		data: {
			// 			name: 'Việt Nam',
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Việt Nam 1
			// 	this.originRepository.createOne({
			// 		data: {
			// 			name: 'Nhật Bản',
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Nhật Bản 2
			// 	this.originRepository.createOne({
			// 		data: {
			// 			name: 'Úc',
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Úc 3
			// ]);
			//
			// // Seed brands
			// const [brand1, brand2, brand3, brand4] = await Promise.all([
			// 	this.brandRepository.createOne({
			// 		data: {
			// 			name: 'Bonie Bee',
			// 			origin: origin1 || undefined // Việt Nam
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Bonie Bee 1
			// 	this.brandRepository.createOne({
			// 		data: {
			// 			name: 'Japan Gals',
			// 			origin: origin2 || undefined // Nhật Bản
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Japan Gals 2
			// 	this.brandRepository.createOne({
			// 		data: {
			// 			name: 'Wealthy Health',
			// 			origin: origin3 || undefined // Úc
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Wealthy Health 3
			// 	this.brandRepository.createOne({
			// 		data: {
			// 			name: 'Live cool',
			// 			origin: origin1 || undefined // Việt Nam
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}), // Live cool 4
			// ]);
			//
			// // Seed images - product
			// const [P23314_1, P23314_2, P23314_3] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_1.jpg',
			// 			publicId: 'P23314_1',
			// 			fileName: 'P23314_1.jpg',
			// 			description: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee',
			// 			width: 1100,
			// 			height: 1100
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_2.jpg',
			// 			publicId: 'P23314_2',
			// 			fileName: 'P23314_2.jpg',
			// 			description: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee',
			// 			width: 1100,
			// 			height: 1100
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23314_3.jpg',
			// 			publicId: 'P23314_3',
			// 			fileName: 'P23314_3.jpg',
			// 			description: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee',
			// 			width: 1100,
			// 			height: 1100
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ]);
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P23314',
			// 		name: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee',
			// 		description: 'Đông trùng hạ thảo mật ong chín tổ Bonie Bee có tác dụng làm giảm các tác nhân gây bệnh và tăng cường sức đề kháng. Ngoài ra, sản phẩm còn có thể dùng để làm đẹp.',
			// 		packingSpec: 'Hộp 250g',
			// 		price: 141900,
			// 		element: 'Đông Trùng Hạ Thảo 2.5%, Mật ong chín tổ 97.5%',
			// 		uses: 'Đông trùng hạ thảo và mật ong đều là những vị thuốc quý, có công dụng rất tốt trong việc bồi bổ sức khỏe, ngăn ngừa một số bệnh lý, đặc biệt phù hợp với các chị em phụ nữ trong việc làm đẹp. Mật ong không chỉ đơn giản mang lại vị ngọt thanh dễ uống mà còn là chất xúc tác, giúp phát huy triệt để chất dinh dưỡng có trong đông trùng hạ thảo.',
			// 		subject: 'Trên 12 tháng tuổi',
			// 		guide: 'Hòa tan 1-2 muỗng cà phê Đông trùng hạ thảo mật ong chín tổ Bonie Bee với 120-150ml nước ấm hoặc trà ấm',
			// 		preserve: 'Nơi thoáng mát, tránh ánh nắng mặt trời trực tiếp. Không cần bỏ trong tủ lạnh',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand1 || undefined, // Bonie Bee
			// 		origin: origin1 || undefined, // Việt Nam,
			// 		images: [P23314_1, P23314_2, P23314_3],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Đông trùng hạ thảo mật ong chín tổ Bonie Bee
			//
			// const [P22820_1, P22820_2] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://cdn.concung.com/2022/05/54596-88450/bot-mam-lua-mach-aojiru-loi-khuan-acid-lactic-72g-3gx24goi.jpg',
			// 			publicId: 'P22820_1_l',
			// 			fileName: 'P22820_1_l.jpg',
			// 			description: 'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru',
			// 			width: 1000,
			// 			height: 1000
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://cdn.concung.com/2022/05/54596-88452/bot-mam-lua-mach-aojiru-loi-khuan-acid-lactic-72g-3gx24goi.jpg',
			// 			publicId: 'P22820_2_l',
			// 			fileName: 'P22820_2_l.jpg',
			// 			description: 'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru',
			// 			width: 1000,
			// 			height: 1000
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ])
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P22820',
			// 		name: 'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru',
			// 		description: 'Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru được chiết xuất từ 37,85% lá mầm lúa mạch bổ sung lượng chất xơ cần thiết cho cơ thể mỗi ngày, thanh lọc đường ruột, tăng khả năng hấp thụ dinh dưỡng. Một gói nhỏ chứa đến 25 tỷ lợi khuẩn acid lactic tốt cho hệ tiêu hóa.',
			// 		packingSpec: 'Hộp 24 gói x 3g',
			// 		price: 194400,
			// 		element: 'Lá mầm lúa mạch (37,85%), đường glucose, malto dextrin (20%), chất xơ thực vật (1,98%), lactose fructose oligosaccharide (0,33%), lợi khuẩn acid lactic (0,17%), chất chống oxy hóa: Acid ascorbic (L-) (E300), cỏ ngọt stevia.\n' +
			// 			'(Một phần chứa sữa). Sản phẩm có chứa chất xơ thực vật, lợi khuẩn, vitamin C.',
			// 		uses: '- Thức uống được ưa chuộng tại Nhật Bản. Được làm từ mầm lúa mạch và chất xơ thực vật, bổ sung lượng chất xơ cần thiết cho cơ thể mỗi ngày, thanh lọc đường ruột, tăng khả năng hấp thụ dinh dưỡng. 1 gói nhỏ chứa đến 25 tỷ lợi khuẩn acid lactic tốt cho hệ tiêu hóa.\n' +
			// 			'- Đồng thời thêm thành phần Oligosacarit, là nguồn dinh dưỡng của lợi khuẩn, giúp phát triển lợi khuẩn đường ruột, cho hệ tiêu hóa khỏe mạnh, tăng cường hệ miễn dịch. Thêm Vitamin C giúp chống oxi hóa, cho cơ thể khỏe mạnh, da tươi trẻ tự nhiên.\n' +
			// 			'- Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em, người ăn kiêng muốn bổ sung chất xơ, người có hệ tiêu hóa yếu…',
			// 		subject: 'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
			// 		guide: 'Dùng 1 đến 2 gói/ngày. Pha với nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
			// 		preserve: 'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand2 || undefined, // Japan Gals
			// 		origin: origin2 || undefined, // Nhật Bản
			// 		images: [P22820_1, P22820_2],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Bột mầm lúa mạch lợi khuẩn acid lactic Aojiru
			//
			// const [P22818_1, P22818_2, P22818_3] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://salt.tikicdn.com/media/catalog/producttmp/a6/d0/15/28887ea457bba173732ee83fd9bf7e70.jpg',
			// 			publicId: 'P22818_1_l',
			// 			fileName: 'P22818_1_l.jpg',
			// 			description: 'Bột mầm lúa mạch rau quả lên men Aojiru',
			// 			width: 860,
			// 			height: 860
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://salt.tikicdn.com/cache/w1200/ts/product/2c/55/70/06b55c77a5ed6291f131d75e20e4914c.jpg',
			// 			publicId: 'P22818_2_l',
			// 			fileName: 'P22818_2_l.jpg',
			// 			description: 'Bột mầm lúa mạch rau quả lên men Aojiru',
			// 			width: 1200,
			// 			height: 1200
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/2f/83/e7/621114a93ea40971bcab0ed347f72f93.jpg',
			// 			publicId: 'P22818_3_l',
			// 			fileName: 'P22818_3_l.jpg',
			// 			description: 'Bột mầm lúa mạch rau quả lên men Aojiru',
			// 			width: 1200,
			// 			height: 1200
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ])
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P22818',
			// 		name: 'Bột mầm lúa mạch rau quả lên men Aojiru',
			// 		description: 'Bột mầm lúa mạch rau quả lên men Aojiru được chiết xuất từ các loại thực vật nhiều dinh dưỡng giúp bổ sung enzyme tốt cho hệ tiêu hóa, hệ miễn dịch, cân bằng dinh dưỡng. Sản phẩm là thức uống rất được ưa chuộng tại Nhật bởi công dụng vượt trội, giàu chất xơ, vitamin và các nguyên tố vi lượng, rất tốt cho sức khỏe, giúp tối ưu hóa việc hấp thu các dưỡng chất, hỗ trợ làm đẹp da.',
			// 		packingSpec: 'Hộp 24 gói x 3g',
			// 		price: 135500 ,
			// 		element: 'Lá mầm lúa mạch (48,35%), đường glucose, khổ qua (1%), cải xoăn (1%), bột thực vật lên men (dextrin, bột thực vật lên men) (1%), cỏ ngọt stevia.\n' +
			// 			'(Một phần chứa cam, kiwi, chuối, táo, đào, khoai từ, đậu nành, mè, hạt điều).\n' +
			// 			'Sản phẩm có chứa chất xơ thực vật.',
			// 		uses: '- Chiết xuất từ các loại thực vật nhiều dinh dưỡng: mầm lúa mạch, mướp đắng, cải xoăn Nhật Bản, thêm 139 loại rau củ, trái cây, thực vật lên men … bổ sung enzyme tốt cho hệ tiêu hóa, hệ miễn dịch, cân bằng dinh dưỡng.\n' +
			// 			'- Là thức uống rất được ưa chuộng tại Nhật bởi công dụng vượt trội, giàu chất xơ, vitamin và các nguyên tố vi lượng, rất tốt cho sức khỏe, giúp tối ưu hóa việc hấp thu các dưỡng chất, hỗ trợ làm đẹp da.\n' +
			// 			'- Aojiru dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…',
			// 		subject: 'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
			// 		guide: 'Dùng 1 đến 2 gói/ngày. Pha 1 gói với 100 ml nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
			// 		preserve: 'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand2 || undefined, // Japan Gals
			// 		origin: origin2 || undefined, // Nhật Bản
			// 		images: [P22818_1, P22818_2, P22818_3],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Bột mầm lúa mạch rau quả lên men Aojiru
			//
			// const [P22819_1, P22819_2] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://shopping-vn.com/images/vn/92a1f0ed10cb3641270a2833d105061a.jpg',
			// 			publicId: 'P22819_1_l',
			// 			fileName: 'P22819_1_l.jpg',
			// 			description: 'Bột mầm lúa mạch trái cây Aojiru',
			// 			width: 600,
			// 			height: 600
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://shopping-vn.com/images/vn/6916031a0b3c405ed6052f9bf6189938.jpg',
			// 			publicId: 'P22819_2_l',
			// 			fileName: 'P22819_2_l.jpg',
			// 			description: 'Bột mầm lúa mạch trái cây Aojiru',
			// 			width: 600,
			// 			height: 600
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ])
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P22819',
			// 		name: 'Bột mầm lúa mạch trái cây Aojiru',
			// 		description: 'Bột mầm lúa mạch trái cây Aojiru chiết xuất từ 25,5% lá mầm lúa mạch tốt cho hệ tiêu hóa, thanh lọc đường ruột, tăng cường miễn dịch, cân bằng dinh dưỡng. Sản phẩm bổ sung bột nước ép trái cây đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em ghét ăn rau, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…',
			// 		packingSpec: 'Hộp 24 gói x 3g',
			// 		price: 194400  ,
			// 		element: 'Lá mầm lúa mạch (25,5%), đường glucose, dextrin, fructose, malto dextrin, bột nước ép trái cây (nước ép táo cô đặc, dextrin) (3,3%), bột hỗn hợp nước ép trái cây (malto dextrin, nước ép táo, lê tây, bưởi, chanh dây, chanh, nho đỏ, dâu, dứa, xoài, vải, cam, kiwi, đào, việt quất, nam việt quất, mâm xôi) (0,7%), thực vật lên men (dextrin, bột cà rốt, tinh bột biến tính, bột cà chua)(0,5%), hương trái cây tự nhiên, cỏ ngọt stevia, chất chống đông vón: Dioxyd silic vô định hình (E551). (Một phần có chứa táo, chuối, đào, cam, kiwi, đậu nành, mè, hạt điều). Sản phẩm có chứa chất xơ thực vật.',
			// 		uses: 'Thức uống được ưa chuộng tại Nhật Bản. Được kết hợp từ mầm lúa mạch, 82 loại chiết xuất thực vật lên men, 16 loại trái cây bổ sung chất xơ, enzyme tốt cho hệ tiêu hóa, thanh lọc đường ruột, tăng cường miễn dịch, cân bằng dinh dưỡng.\n' +
			// 			'- Bổ sung bột nước ép trái cây giúp hương vị thơm ngon, dễ uống. Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em ghét ăn rau, người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu…\n' +
			// 			'- Sản phẩm đóng từng gói nhỏ, tiện mang đi.',
			// 		subject: 'Dùng được cho mọi lứa tuổi, đặc biệt thích hợp cho những người ít ăn rau củ, trẻ em (từ khoảng 2~3 tuổi), người ăn kiêng muốn bổ sung chất xơ, vitamin, người có hệ tiêu hóa yếu.',
			// 		guide: 'Dùng 1 đến 2 gói/ngày. Pha với nước, sữa hoặc thức uống yêu thích. Khuấy đều và thưởng thức.',
			// 		preserve: 'Bảo quản nơi thoáng mát. Tránh ánh nắng trực tiếp. Sau khi mở nắp hộp nên nhanh chóng dùng hết.',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand2 || undefined, // Japan Gals
			// 		origin: origin2 || undefined, // Nhật Bản
			// 		images: [P22819_1, P22819_2],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Bột mầm lúa mạch trái cây Aojiru
			//
			// const [P20130_1] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://cdn.famitaa.com/uploads/noidung/thumb/sua-bo-non-uc-wealthy-health-400g_00133.jpg',
			// 			publicId: 'P20130_1_l',
			// 			fileName: 'P20130_1_l.jpg',
			// 			description: 'Bột sữa non Úc Wealthy Health',
			// 			width: 250,
			// 			height: 250
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ])
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P20130',
			// 		name: 'Bột sữa non Úc Wealthy Health',
			// 		description: 'Bột sữa non Úc Wealthy Health dòng sữa đầu tiên được sinh ra sau khi sinh, giàu dinh dưỡng và kháng thể, với 9/9 loại acid amin thiết yếu, giúp bổ sung dưỡng chất và tăng cường sức đề kháng, phù hợp cho cả người lớn và trẻ em.',
			// 		packingSpec: 'Lon 400g',
			// 		price: 736400   ,
			// 		element: 'Đường thực vật, sữa bột nguyên kem, sữa bò non 20% IgG (3,3%), whey protein (1,59%), hương vanilla (1%), chất chống đông vón (silicon dioxyde), chất điều chỉnh độ acid (acid ascorbic).',
			// 		uses: '',
			// 		subject: '',
			// 		guide: 'Sử dụng cho trẻ em và người lớn.\n' +
			// 			'Cách pha cho 1 muỗng sữa bột 10g\n' +
			// 			'Cho 1 muỗng sữa bột vào ly, đổ 5ml nước lạnh, khuấy thành bột sệt.\n' +
			// 			'Đổ khoảng 50ml nước ấm từ 35-40 độ C. Nên dùng ngay sau khi pha.\n' +
			// 			'Sử dụng trong vòng 30 ngày sau khi mở hộp.\n' +
			// 			'Lưu ý: Khả năng gây dị ứng cho những người mẫn cảm với thành phần của sữa.',
			// 		preserve: 'Nơi khô ráo, thoáng mát, tránh tiếp xúc trực tiếp với hóa chất.',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand3 || undefined, // Wealthy Health
			// 		origin: origin3 || undefined, // Úc
			// 		images: [P20130_1],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Bột sữa non Úc Wealthy Health
			//
			// const [P14587_1, P14587_2, P14587_4] = await Promise.all([
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://alphabetpharma.com.vn/image/cache/catalog/nha-thuoc/thuc-pham-chuc-nang/nhom-tieu-hoa/livecool-goi-huong-dua-gang-800x800.jpg',
			// 			publicId: 'P14587_1_l',
			// 			fileName: 'P14587_1_l.jpg',
			// 			description: 'Bột sủi thanh nhiệt hương dưa gang Live cool',
			// 			width: 800,
			// 			height: 800
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://filebroker-cdn.lazada.vn/kf/Sadf9e3da6ff34d22916d9692300336532.jpg',
			// 			publicId: 'P14587_2_l',
			// 			fileName: 'P14587_2_l.jpg',
			// 			description: 'Bột sủi thanh nhiệt hương dưa gang Live cool',
			// 			width: 1080,
			// 			height: 930
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// 	this.imageRepository.createOne({
			// 		data: {
			// 			url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p145874l-7683.jpg',
			// 			publicId: 'P14587_4_l',
			// 			fileName: 'P14587_4_l.jpg',
			// 			description: 'Bột sủi thanh nhiệt hương dưa gang Live cool',
			// 			width: 460,
			// 			height: 460
			// 		},
			// 		options: {
			// 			transaction: true,
			// 		},
			// 	}),
			// ])
			// await this.productRepository.createOne({
			// 	data: {
			// 		code: 'P14587',
			// 		name: 'Bột sủi thanh nhiệt hương dưa gang Live cool',
			// 		description: 'Bột sủi thanh nhiệt hương dưa gang Live cool với thành phần chiết xuất thiên nhiên giúp thanh nhiệt, mát gan, giảm các triệu chứng mẩn ngứa, nổi mề đay, vàng da do chức năng gan kém.',
			// 		packingSpec: 'Hộp 10 gói x 7g',
			// 		price: 40000,
			// 		element: 'Mỗi gói 7g chứa\n' +
			// 			'Chiết xuất chanh.............................250mg\n' +
			// 			'Chiết xuất dứa gang........................250mg\n' +
			// 			'Chiết xuất Atiso..............................200mg\n' +
			// 			'Chiết xuất rau má...........................100mg\n' +
			// 			'Vitamin C.......................................70mg\n' +
			// 			'Chiết xuất Linh chi đỏ......................50mg\n' +
			// 			'Natri bicarbonate, sucrose, acid citric vừa đủ 7g',
			// 		uses: 'Hỗ trợ thanh nhiệt, mát gan, giảm các triệu chứng mẩn ngứa, nổi mề đay, vàng da do chức năng gan kém.',
			// 		subject: 'Người bị dị ứng, mẩn ngứa, mề đay, chán ăn, mệt mỏi, da vàng do suy giảm chức năng gan. Người hay sử dụng rượu, bia.',
			// 		guide: 'Trẻ em từ 6-12 tuổi: 1/2 gói x 3-4 lần/ngày\n' +
			// 			'Người lớn và trẻ em từ 12 tuổi trở lên: 1 gói x 3-4 lần/ngày \n' +
			// 			'Cắt 1 gói bột cho vào cốc sau đó thêm 150-200ml nước đun sôi để nguội, ngon hơn khi uống lạnh. Không pha với nước nóng để tránh làm ảnh hưởng đến tác dụng của sản phẩm. ',
			// 		preserve: 'Nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp',
			// 		category: cate8 || undefined, // Thực phẩm dinh dưỡng
			// 		trademark: brand4 || undefined, // Live cool
			// 		origin: origin1 || undefined, // Việt Nam
			// 		images: [P14587_1, P14587_2, P14587_4],
			// 	},
			// 	options: {
			// 		transaction: true,
			// 	},
			// }); // Bột sủi thanh nhiệt hương dưa gang Live cool
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
			await this.imageRepository.hardDelete({
				product: Not(IsNull()),
			});
			await this.imageRepository.hardDelete({
				category: Not(IsNull()),
			});
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
