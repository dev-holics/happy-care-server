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
						description:
							'Agilodin là thuốc có chứa thành phần chính là hoạt chất Loratadin 10mg với tác dụng chống dị ứng và dùng cho các các trường hợp bệnh nhân có biểu hiện quá mẫn.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 350000,
						element:
							'Mỗi viên nén chứa: Loratadin 10mg\n' + 'Tá dược vừa đủ 1 viên.',
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
				}); // Agilodin 1

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
							'Thuốc Bostanex được sản xuất và đăng ký bởi Công ty Cổ phần Dược phẩm Boston Việt Nam. Thuốc thuộc nhóm chống dị ứng và sử dụng trong các trường hợp quá mẫn. Sử dụng thuốc Bostanex theo đúng chỉ định của bác sĩ sẽ giúp bạn đảm bảo an toàn cho sức khỏe và phát huy tối đa hiệu quả điều trị bệnh.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
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
				}); // Bostanex 2

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
						description:
							'Thuốc Clanzen 5mg là thuốc thuộc nhóm thuốc chống dị ứng được sản xuất bởi công ty cổ phần Dược phẩm Khánh Hòa với số đăng ký thuốc là VD-14328-1. Thuốc Clanzen được bào chế dưới dạng viên nén theo quy cách 1 hộp 5 vỉ x10 viên.',
						packingSpec: 'Hộp 5 vỉ x 10 viên',
						unit: 'Hộp',
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
				}); // Clanzen 3

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
						description:
							'Thuốc Clorpheniramin 4mg là nhóm thuốc được ưu tiên chỉ định dùng để điều trị các triệu chứng của bệnh dị ứng như mày đay, phù mạch, viêm mũi ....',
						packingSpec: 'Hộp 10 vỉ x 20 viên',
						unit: 'Hộp',
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
				}); // Clorpheniramin 4

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
						description:
							'Thuốc Desbebe được biết đến với tác dụng điều trị dị ứng và dùng trong các trường hợp quá mẫn. Trước khi có ý định dùng thuốc Desbebe, người bệnh cần nắm rõ thông tin để việc điều trị mang đến hiệu quả cao hơn.',
						packingSpec: 'Hộp 1 lọ x 60ml',
						unit: 'Hộp',
						price: 70000,
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
				}); // Desbebe 5

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
						description:
							'Descallerg là một trong những loại thuốc thuộc nhóm histamin chuyên điều trị các triệu chứng dị ứng như chảy nước mắt, chảy nước mũi, hắt hơi kéo dài, nổi mề đay và ngứa. Việc sử dụng thuốc cần tuân thủ theo đúng hướng dẫn để mang đến hiệu quả điều trị cao nhất.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
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
				}); // Descallerg 6

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
						description:
							'Zyrtec 10mg chứa hoạt chất chính là certirizine, đây là thuốc điều trị dị ứng được chỉ định trong điều trị mày đay, viêm mũi dị ứng. Để đảm bảo hiệu quả sử dụng, người dùng thuốc cần tuân thủ theo đúng chỉ dẫn của bác sĩ, dược sĩ tư vấn.',
						packingSpec: 'Hộp 1 chai 60ml',
						unit: 'Chai',
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
				}); // Zyrtec 7

				const brand7 = await this.brandRepository.createOne({
					data: {
						name: 'Pymepharco',
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
						description:
							'Thuốc Fegra 60 có thành phần chính Fexofenadin. Thuốc có tác dụng trong điều trị những bệnh viêm mũi dị ứng, mày đay. Để sử dụng thuốc an toàn, người bệnh cần tuân thủ theo chỉ định và hướng dẫn của bác sĩ kê đơn.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
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
				}); // Fegra 8

				const P18105_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuocantam.org/wp-content/uploads/2021/05/p18105_1_l.jpg',
						publicId: 'P18105_1_l',
						fileName: 'P18105_1_l.jpg',
						description: 'Gimfastnew',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P18105',
						name: 'Gimfastnew',
						description:
							'Trong điều trị các triệu chứng của viêm mũi dị ứng như hắt hơi, chảy nước mũi, ngứa họng,... bác sĩ thường sử dụng thuốc Gimfastnew 180 mg.',
						packingSpec: 'Hộp 2 vỉ x 10 viên',
						unit: 'Hộp',
						price: 130000,
						element:
							'Mỗi viên chứa:\n' +
							'Fexofenadin hydroclorid 180mg\n' +
							'Tá dược vừa đủ',
						uses: 'Giảm triệu chứng viêm mũi dị ứng',
						subject: 'Người lớn và trẻ từ 12 tuổi trở lên',
						guide:
							'Người lớn và trẻ từ 12 tuổi trở lên: Uống 1 viên/lần, 1 lần/ngày.\n' +
							'Liều cao hơn không làm tăng tác dụng điều trị.\n' +
							'Bệnh nhân suy gan không cần giảm liều.',
						preserve: 'Nhiệt độ dưới 30 độ C, tránh ẩm và ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand1 || undefined, // Agimexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P18105_1],
					},
					options: {
						transaction: true,
					},
				}); // Gimfastnew 9

				const brand8 = await this.brandRepository.createOne({
					data: {
						name: 'Vidipha',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Vidipha 8
				const P11021_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(80):fill(white)/nhathuoclongchau.com/images/product/2021/05/00015283-siro-promethazin-90ml-vidapha-9578-60a3_large.JPG',
						publicId: 'P11021_1_l',
						fileName: 'P11021_1_l.jpg',
						description: 'Promethazine',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11021',
						name: 'Promethazine',
						description:
							'Thuốc promethazine HCL là một loại thuốc kháng histamine, giúp làm giảm các triệu chứng của dị ứng. Cũng như các thuốc kháng histamine khác, promethazine cũng gây buồn ngủ với tác dụng an thần. Ngoài ra, promethazine cũng có thể phối hợp với các loại thuốc khác, chẳng hạn như paracetamol, dextromethorphan, pholcodine hoặc pseudoephedrine, để điều trị ho và cảm lạnh hoặc đau nhức.',
						packingSpec: 'Hộp 1 chai 90ml',
						unit: 'Chai',
						price: 12000,
						element:
							'Promethazin (dưới dạng Promethazin hydroclorid) 0,1g/100ml',
						uses: 'Điều trị các trường hợp dị ứng, các bệnh ngoài da ngứa, các chứng mất ngủ của người lớn...',
						subject: 'Tất cả các đối tượng đều dùng được',
						guide:
							'Liều hàng ngày chia làm nhiều lần, liều lớn nhất dành cho buổi tối.\n' +
							'Người lớn: 3-10 muỗng canh/ngày.\n' +
							'Trẻ 5-10 tuổi: 5-10 muỗng cà phê/ngày.\n' +
							'Trẻ 2-5 tuổi: 3-5 muỗng cà phê/ngày.\n' +
							'Trẻ < 2 tuổi: 1/2-3 muỗng cà phê/ngày.',
						preserve: 'Nơi khô mát, tránh ánh nắng, nhiệt độ không quá 30 độ C',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand8 || undefined, // Vidipha
						origin: origin1 || undefined, // Việt Nam
						images: [P11021_1],
					},
					options: {
						transaction: true,
					},
				}); // Promethazine 10

				const brand9 = await this.brandRepository.createOne({
					data: {
						name: 'Stella',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Stella 9
				const P01014_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://vietphapplus.com/wp-content/uploads/2021/07/Lorastad-Sp.-Chai-60ml.jpg',
						publicId: 'P01014_1_l',
						fileName: 'P01014_1_l.jpg',
						description: 'Lorastad',
						width: 1050,
						height: 1050,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01014',
						name: 'Lorastad',
						description:
							'Thuốc Lorastad được dùng để điều trị viêm mũi dị ứng như, viêm kết mạc dị ứng, nổi mề đay và các rối loạn dị ứng da,...',
						packingSpec: 'Hộp 1 chai 60ml',
						unit: 'Chai',
						price: 15000,
						element:
							'Mỗi 60 ml siro chứa: Loratadin 60mg\n' +
							'Tá dược vừa đủ 60ml (Glycerin, acid citric khan, natri benzoat, saccharose, propylen glycol, mùi dâu nước, nước tinh khiết).',
						uses: 'Giảm triệu chứng của dị ứng bao gồm viêm mũi và mày đay mạn tính.',
						subject: 'Viêm mũi và mày đay mạn tính',
						guide:
							'Lorastad Sp. được dùng bằng đường uống.\n' +
							'Người lớn và trẻ em trên 12 tuổi: 10ml x 1 lần/ ngày.\n' +
							'Trẻ em từ 2 - 12 tuổi:\n' +
							'2 - 5 tuổi: 5ml/ngày.\n' +
							'6 - 12 tuổi; 10ml/ngày.\n' +
							'Người bị suy gan hoặc suy thận nặng (độ thanh thải creatinin < 30ml/phút)\n' +
							'Người lớn và trẻ em từ 6 tuổi trở lên: Liều khởi đầu 10ml/ lần, 2 ngày một lần.\n' +
							'Trẻ em từ 2 tuổi đến dưới 6 tuổi: Liều 5ml/ lần, 2 ngày một lần.',
						preserve:
							'Trong bao bì kín, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand9 || undefined, // Stella
						origin: origin1 || undefined, // Việt Nam
						images: [P01014_1],
					},
					options: {
						transaction: true,
					},
				}); // Lorastad 11

				const brand10 = await this.brandRepository.createOne({
					data: {
						name: 'Sanofi',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Sanofi 10
				const P00649_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://phuocthien.vn/images/ImageUpload/2021-03/P00649_1_l.jpg',
						publicId: 'P00649_1_l',
						fileName: 'P00649_1_l.jpg',
						description: 'Theralene',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00649',
						name: 'Theralene',
						description:
							'Thuốc Theralene 5mg có chứa hoạt chất alimemazin, có tác dụng giúp ngăn chặn histamin mà cơ thể tạo ra trong phản ứng dị ứng. Hơn nữa, thuốc Theralene 5mg còn tác động trực tiếp lên não giúp cho bạn cảm thấy thư giãn hơn. Tuy nhiên, khi sử dụng có thể gặp một số tác dụng phụ không mong muốn như: đau đầu, chóng mặt, mệt mỏi, táo bón,...',
						packingSpec: 'Hộp 1 chai 90ml',
						unit: 'Chai',
						price: 16500,
						element:
							'- Hoạt chất: Alimemazin (duới dạng Alimemazin tartrat) 0.050g/100ml.\n' +
							'- Tá dược: acid citric khan, acid ascorbic, methyl parahydroxybenzoat (Nipagin), propyl parahydroxybenzoat (Nipasol), glycerin, caramel, ethanol 96°, hương framboise (Arôme de framboise), đường tình luyện (RE) (đường saccharose), nước tinh khiết vừa đủ 100 ml.',
						uses: 'Trị ho khan, ho do kích ứng, chống dị ứng,…',
						subject:
							'Thuốc này chứa alimemazin, một chất kháng histamin. Thuốc được chỉ định:\n' +
							'- Trong trường hợp thỉnh thoảng mất ngủ (ví dụ khi đi xa) và/hoặc thoáng qua (ví dụ khi có một biến cố cảm xúc).\n' +
							'- Trong điều trị triệu chứng đối với các biểu hiện dị ứng như: viêm mũi (ví dụ: viêm mũi theo mùa, viêm mũi không theo mùa,...); viêm kết mạc (viêm mắt); nổi mề đay.\n' +
							'- Để giảm ho khan và ho do kích ứng, đặc biệt là khi ho về chiều hoặc về đêm.',
						guide:
							'- Dùng đường uống.\n' +
							'- Thời gian uống thuốc:\n' +
							'Vì thuốc có tác dụng gây buồn ngủ, tốt nhất nên bắt đầu điều trị các biểu hiện dị ứng vào buổi tối.\n' +
							'- Thời gian điều trị:\n' +
							'Chỉ nên điều trị triệu chứng ngắn ngày (vài ngày). Nếu trị ho, chỉ nên dùng thuốc vào những lúc bị ho.',
						preserve: 'Bảo quản ở nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand10 || undefined, // Sanofi
						origin: origin1 || undefined, // Việt Nam
						images: [P00649_1],
					},
					options: {
						transaction: true,
					},
				}); // Theralene 12

				const [P13207_1, P13207_2, P13207_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://cherrypharmacy.vn/wp-content/uploads/2021/07/p13207_1_l-247x296.jpg',
							publicId: 'P13207_1_l',
							fileName: 'P13207_1_l.jpg',
							description: 'Bostanex',
							width: 247,
							height: 296,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://alogap.com/uploads/alogap.com/items/516071/bostanex-60ml-thuoc-chong-di-ung-dang-siro_2.jpg',
							publicId: 'P13207_2_l',
							fileName: 'P13207_2_l.jpg',
							description: 'Bostanex',
							width: 400,
							height: 400,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://static.salekit.com/image/shop/3180/products/1575369928-thuocbatyy.jpg',
							publicId: 'P13207_4_l',
							fileName: 'P13207_4_l.jpg',
							description: 'Bostanex',
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
						code: 'P13207',
						name: 'Bostanex 60ml',
						description:
							'Thuốc Bostanex được sản xuất và đăng ký bởi Công ty Cổ phần Dược phẩm Boston Việt Nam. Thuốc thuộc nhóm chống dị ứng và sử dụng trong các trường hợp quá mẫn. Sử dụng thuốc Bostanex theo đúng chỉ định của bác sĩ sẽ giúp bạn đảm bảo an toàn cho sức khỏe và phát huy tối đa hiệu quả điều trị bệnh.',
						packingSpec: 'Hộp 1 chai 60ml',
						unit: 'Chai',
						price: 65000,
						element:
							'Thành phần hoạt chất: Mỗi 1 ml sirô chứa Desloratadin 0,5 mg\n' +
							'Thành phần tá dược: Beta cyclodextrin, đường trắng, sorbitol lỏng, natri benzoat, natri citrat, acid citric khan, màu vàng số 6, hương ngọt tổng hợp dạng lỏng, kali sorbat, dinatri edetat, nước tinh khiết.',
						uses: 'Giảm triệu chứng viêm mũi dị ứng, nổi mày đay',
						subject: 'Người lớn và trẻ từ 1-2 tuổi trở lên',
						guide:
							'BOSTANEX được dùng bằng đường uống, cùng hoặc không cùng bữa ăn.\n' +
							'- Trẻ từ 1 đến 5 tuổi: 2,5 ml x 1 lần/ngày.\n' +
							'- Trẻ từ 6 đến 11 tuổi: 5 ml x 1 lần/ngày.\n' +
							'- Người lớn và thanh thiếu niên (≥12 tuổi): 10 ml x 1 lần/ngày.\n' +
							'- Viêm mũi dị ứng gián đoạn (triệu chứng xuất hiện < 4 ngày/tuần hoặc < 4 tuần) nên được điều trị phù hợp dựa trên đánh giá tiền sử bệnh của bệnh nhân, nên ngừng điều trị khi hết triệu chứng và tái điều trị khi tái xuất hiện triệu chứng.\n' +
							'- Viêm mũi dị ứng dai dẳng (triệu chứng xuất hiện ≥ 4 ngày/tuần và kéo dài > 4 tuần), có thể điều trị liên tục trong thời gian tiếp xúc với dị nguyên.',
						preserve:
							'Nơi khô, dưới 30°C, tránh ánh sáng. Để xa tầm tay trẻ em.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand2 || undefined, // Boston
						origin: origin1 || undefined, // Việt Nam
						images: [P13207_1, P13207_2, P13207_4],
					},
					options: {
						transaction: true,
					},
				}); // Bostanex 60ml 13

				const [P25114_1, P25114_3, P25114_2, P25114_5, P25114_4] =
					await Promise.all([
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25114_1.jpg',
								publicId: 'P25114_1',
								fileName: 'P25114_1.jpg',
								description: 'Telfast',
								width: 1000,
								height: 1000,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25114_3.jpg',
								publicId: 'P25114_3',
								fileName: 'P25114_3.jpg',
								description: 'Telfast',
								width: 1000,
								height: 1000,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25114_2.jpg',
								publicId: 'P25114_2',
								fileName: 'P25114_2.jpg',
								description: 'Telfast',
								width: 1000,
								height: 1000,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25114_5.jpg',
								publicId: 'P25114_5',
								fileName: 'P25114_5.jpg',
								description: 'Telfast',
								width: 1000,
								height: 1000,
							},
							options: {
								transaction: true,
							},
						}),
						this.imageRepository.createOne({
							data: {
								url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25114_4.jpg',
								publicId: 'P25114_4',
								fileName: 'P25114_4.jpg',
								description: 'Telfast',
								width: 1000,
								height: 1000,
							},
							options: {
								transaction: true,
							},
						}),
					]);
				await this.productRepository.createOne({
					data: {
						code: 'P25114',
						name: 'Telfast BD',
						description:
							'Thuốc Telfast 180mg được sử dụng để điều trị các bệnh về viêm mũi dị ứng theo mùa và một số biểu hiện ngoài da khác. Thuốc có thành phần chủ yếu là Fexofenadine, được điều chế dưới dạng viên nén. Đối tượng sử dụng thuốc bao gồm người lớn và trẻ em trên 12 tuổi.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 120000,
						element:
							'Cho 1 viên nén bao phim:\n' +
							'Thành phần hoạt chất: Fexofenadin hydroclorid 60mg\n' +
							'Thành phần tá dược: microcrystalline cellulose (avicel pH 101, avicel pH 102), pregelatinised maize starch, croscarmellose natri, magnesi stearat, hypromellose E - 5, hypromellose E - 15, titan dioxyd, povidon, colloidal anhydrous silica, macrogol 400, hỗn hợp pink iron oxyd (PB1254), hỗn hợp yellow iron oxyd (PB1255).',
						uses: 'Trị viêm mũi dị ứng, mày đay.',
						subject: 'Người lớn, trẻ em ≥ 12 tuổi',
						guide:
							'Thuốc dùng đường uống với nước và trước bữa ăn. Không uống thuốc với nước hoa quả (như cam, bưởi, táo).',
						preserve: 'Bảo quản ở nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand10 || undefined, // Sanofi
						origin: origin1 || undefined, // Việt Nam
						images: [P25114_1, P25114_3, P25114_2, P25114_5, P25114_4],
					},
					options: {
						transaction: true,
					},
				}); // Telfast 14

				const brand11 = await this.brandRepository.createOne({
					data: {
						name: 'Traphaco',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Traphaco 11
				const [P10544_1, P10544_2, P10544_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P10544_1_l.jpg',
							publicId: 'P10544_1_l',
							fileName: 'P10544_1_l.jpg',
							description: 'Dimenhydrinat',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p105443l-6307.jpg',
							publicId: 'P10544_2_l',
							fileName: 'P10544_2_l.jpg',
							description: 'Dimenhydrinat',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p105442l-8639.jpg',
							publicId: 'P10544_4_l',
							fileName: 'P10544_4_l.jpg',
							description: 'Dimenhydrinat',
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
						code: 'P10544',
						name: 'Dimenhydrinat',
						description:
							'Dimenhydrinate là một thuốc kháng histamin H1 được dùng chủ yếu làm thuốc dự phòng triệu chứng nôn, buồn nôn do say tàu xe. Thuốc dimenhydrinat dùng được cho cả người lớn và trẻ nhỏ từ 2 tuổi trở lên, nhưng có thể gây ra tác dụng phụ trên hệ thần kinh trung ương, hệ tiêu hóa, hô hấp hay hệ tim mạch... nên cần thận trọng khi sử dụng.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 40000,
						element:
							'- Dimenhydrinat 50mg\n' +
							'- Tá dược: Tinh bột. Lactose, Microcrystalline cellulose, Màu sunset yellow, Talc, Magneslstearat vừa đủ 1 viên.',
						uses: 'Phòng và điều trị triệu chứng buồn nôn, nôn, chóng mặt do say sóng, say khi đi tàu xe...',
						subject:
							'- Phòng và điều trị triệu chứng buồn nôn, nôn, chóng mặt do say sóng, say khi đi tàu xe.\n' +
							'- Điều trị triệu chứng nôn, chóng mặt trong bệnh Ménière và các rối loạn tiền đình khác.',
						guide:
							'Phòng say tàu xe, liều đầu tiên phải uống 30 phút trước khi khởi hành.\n' +
							'- Người lớn và trẻ trên 12 tuổi: 1 - 2 viên/lần (50 -100 mg), cách 4 - 6 giờ/lần khi cần, (không quá 8 viên/ngày).\n' +
							'- Trẻ em 6 - 12 tuổi: Dùng 1/2 -1 viên/ lần (25 - 50 mg), cách 6- 8 giờ/lần khi cần (không quá 3 viên/ngày).\n' +
							'- Trẻ em 2 - 6 tuổi: Dùng 1/4 - 1/2 viên/lần (12,5 - 25 mg), cách 6-8 giờ/lần khi cần (không quá 1,5 viên/ngày).\n' +
							'Điều trị triệu chứng của bệnh Ménière: uống mỗi lần 25-50mg(1/2-1 viên) ngày 3 lần để điều trị duy trì.',
						preserve: 'Nơi khô ráo, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand11 || undefined, // Traphaco
						origin: origin1 || undefined, // Việt Nam
						images: [P10544_1, P10544_2, P10544_4],
					},
					options: {
						transaction: true,
					},
				}); // Dimenhydrinat 15

				const brand12 = await this.brandRepository.createOne({
					data: {
						name: 'Domesco',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Domesco 12
				const P00445_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_a0729ce17970439f86e455c8e67b5d76_grande.jpg',
						publicId: 'P00445_1_l',
						fileName: 'P00445_1_l.jpg',
						description: 'Cinnarizin',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00445',
						name: 'Cinnarizin',
						description:
							'Thuốc Cinnarizin ngoài việc trị rối loạn tiền đình thì còn có tác dụng trong việc điều trị rối loạn tuần hoàn và chống say tàu xe. Tuy nhiên, cũng cần có những lưu ý khi dùng thuốc Cinnarizin để tránh những tác dụng phụ không mong muốn.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 15000,
						element:
							'Mỗi viên nén chứa:\n' +
							'Thành phần dược chất: Cinnarizin 25 mg\n' +
							'Thành phần tá dược: Povidon K30, Lactose khan, Microcrystallin cellulose PH102, Natri Croscarmellose, Magnesi stearat, Colloidal silicon dioxid A200.',
						uses: 'Được chỉ định trong bệnh mạch ngoại vi với các triệu chứng như đau cách hồi, lạnh đầu chi và các rối loạn co thắt mạch.',
						subject:
							'Cinnarizin được chỉ định trong bệnh mạch ngoại vi với các triệu chứng như đau cách hồi, lạnh đầu chi và các rối loạn co thắt mạch.',
						guide:
							'Dùng uống. Cinnarizin nên được uống sau bữa ăn.\n' +
							'Trường hợp quên uống một liều dùng: Hãy uống ngay khi nhớ ra. Nếu thời gian gần với lần dùng thuốc tiếp theo, bỏ qua liều đã quên và hãy dùng liều tiếp theo vào thời gian thường lệ. Không dùng liều gấp đôi để bù vào liều đã quên.\n' +
							'Trường hợp uống quá nhiều viên thuốc: Hãy gặp ngay bác sỹ hoặc tới khoa Hồi sức - Cấp cứu của bệnh viện gần nhất.',
						preserve:
							'Bảo quản ở: Nơi khô, nhiệt độ dưới 30 °C, tránh ánh sáng. Bảo quản trong bao bì gốc của thuốc.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand12 || undefined, // Domesco
						origin: origin1 || undefined, // Việt Nam
						images: [P00445_1],
					},
					options: {
						transaction: true,
					},
				}); // Cinnarizin 16

				const P02523_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p02523_1-5805.jpg',
						publicId: 'P02523_1_l',
						fileName: 'P02523_1_l.jpg',
						description: 'Fexostad',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P02523',
						name: 'Fexostad',
						description:
							'Thuốc Fexostad 180 là thuốc được dùng trong các trường hợp dị ứng như nổi mày đay, viêm mũi dị ứng...nhưng nó ít gây tác dụng phụ là buồn ngủ và ảnh hưởng tới thần kinh trung ương.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 34000,
						element:
							'Hoạt chất: Fexofenadin hydroclorid 180mg\n' +
							'Tá dược: Tinh bột bắp tiền gelatin hóa, microcrystallin cellulose, tinh bột bắp biến tính một phần, croscarmellose natri, colloidal silica khan, magnesi stearat, opadry trắng.',
						uses: 'Giảm các triệu chứng của bệnh viêm mũi dị ứng theo mùa, các triệu chứng ngoài da không biến chứng của bệnh nổi mề đay vô căn mãn tính.',
						subject:
							'- Giảm các triệu chứng của bệnh viêm mũi dị ứng theo mùa ở người lớn và trẻ em từ 12 tuổi trở lên.\n' +
							'- Điều trị các triệu chứng ngoài da không biến chứng của bệnh nổi mề đay vô căn mãn tính ở người lớn và trẻ em từ 12 tuổi trở lên.',
						guide:
							'Fexostad 180 được dùng bằng đường uống và uống thuốc trước bữa ăn.',
						preserve: 'Trong bao bì kín, nơi khô. Nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand9 || undefined, // Stella
						origin: origin1 || undefined, // Việt Nam
						images: [P02523_1],
					},
					options: {
						transaction: true,
					},
				}); // Fexostad 17

				const P04919_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://alphabetpharma.com.vn/image/cache/catalog/nha-thuoc/thuoc-khong-ke-don/thuoc-khang-di-ung/stadeltine-800x800.jpg',
						publicId: 'P04919_1_l',
						fileName: 'P04919_1_l.jpg',
						description: 'Stadeltine',
						width: 800,
						height: 800,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P04919',
						name: 'Stadeltine',
						description:
							'Thuốc Stadeltine là thuốc chống dị ứng, được dùng trong các trường hợp quá mẫn cảm. Thành phần của thuốc Stadeltine 5mg gồm Levocetirizin dihydroclorid 5mg, có dạng bào chế là viên nén bao phim.',
						packingSpec: 'Hộp 5 vỉ x 10 viên',
						unit: 'Hộp',
						price: 52000,
						element:
							'-Hoạt chất: Levocetirizine dihydrocloride 5mg.\n' +
							'-Tá dược: Lactose monohydrat, microcrystanllin cellulose, hydroxyproyl cellulose, colloidal sillca khan, magnesi stearat, hypromellose 6 cps, macrogol 6000, talc, titan dioxyd.',
						uses: 'Giảm các triệu chứng ở mắt và mũi của viêm mũi dị ứng theo mùa, mày đay mạn tính...',
						subject: 'Người lớn/ Trẻ em',
						guide:
							'Stadeline được dùng bằng đường uống, có thể uống cùng với thức ăn hoặc không cùng với thức ăn',
						preserve:
							'Bảo quản trong bao bì kín, nơi khô. Nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand9 || undefined, // Stella
						origin: origin1 || undefined, // Việt Nam
						images: [P04919_1],
					},
					options: {
						transaction: true,
					},
				}); // Stadeltine 18

				const origin6 = await this.originRepository.createOne({
					data: {
						name: 'Thái Lan',
					},
					options: {
						transaction: true,
					},
				}); // Thái Lan 6
				const brand13 = await this.brandRepository.createOne({
					data: {
						name: 'Merck Sharp & Dohme',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Merck Sharp & Dohme 13
				const P01429_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoclongchau.com/images/product/2019/03/00000545-aerius-5mg-5593-5c7f_large.png',
						publicId: 'P01429_1_l',
						fileName: 'P01429_1_l.jpg',
						description: 'Aerius Desloratadine',
						width: 1000,
						height: 1000,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01429',
						name: 'Aerius Desloratadine',
						description:
							'Aerius là tên biệt dược của thuốc có hoạt chất là desloratadin. Desloratadine là thuốc thuộc nhóm kháng histamin H1 có tác dụng kháng dị ứng, làm giảm triệu chứng viêm mũi dị ứng như hắt hơi, chảy nước mũi, ngứa mũi, ngứa mắt, chảy nước mắt. Thuốc còn có tác dụng giảm mẩn ngứa, mày đay trên da do dị ứng gây ra.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 100000,
						element:
							'Hoạt chất: desloratadine 5mg\n' +
							'Tá dược: Aerius viên nén: dibasic calcium phosphate dihydrate, microcrystalline cellulose, tinh bột ngô, bột talc, lactose monohydrate, hydroxypropyl methylcellulose, titanium dioxide, polyethylene glycol, FD và Blue No 2 aluminium lake, carnauba wax và white wax.',
						uses: 'Giảm nhanh các triệu chứng liên quan đến viêm mũi dị ứng, như hắt hơi, sổ mũi và ngứa mũi, sung huyết/nghẹt mũi, cũng như ngứa, chảy nước mắt và đỏ mắt, ngứa họng và ho.',
						subject:
							'Aerius được chỉ định để giảm nhanh các triệu chứng liên quan đến viêm mũi dị ứng, như hắt hơi, sổ mũi và ngứa mũi, sung huyết/nghẹt mũi, cũng như ngứa, chảy nước mắt và đỏ mắt, ngứa họng và ho.\n' +
							'Aerius cũng được chỉ định để giảm các triệu chứng liên quan đến mày đay như giảm ngứa, giảm kích cỡ và số lượng ban.',
						guide:
							'Người lớn và thanh thiếu niên (> 12 tuổi): Một viên nén bao film Aerius 5mg hoặc 10ml (5mg) Aerius sirô, uống 1 lần/ngày uống cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao gồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay. Chỉ dùng đường uống.\n' +
							'Trẻ từ 6 đến 11 tuổi: 5ml (2.5mg) Aerius sirô, uống 1 lần/ngày cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao gồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
							'Trẻ từ 1 đến 5 tuổi: 2.5ml (1.25mg) Aerius sirô, uống 1 lần/ngày cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao gồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
							'Trẻ từ 6 tháng đến 11 tháng tuổi: 2ml (1mg) Aerius sirô, uống 1 lần/ngày cùng hoặc không cùng bữa ăn, để giảm các triệu chứng liên quan đến viêm mũi dị ứng (bao gồm viêm mũi dị ứng không liên tục và viêm mũi dị ứng kéo dài) và mày đay.\n' +
							'Viêm mũi dị ứng không liên tục (triệu chứng xuất hiện < 4 ngày/tuần hoặc < 4 tuần) nên được điều trị phù hợp dựa trên đánh giá tiền sử bệnh của bệnh nhân và nên ngừng điều trị khi hết triệu chứng và tái điều trị khi tái xuất hiện triệu chứng. Trong viêm mũi dị ứng kéo dài (triệu chứng xuất hiện > 4 ngày/tuần và kéo dài > 4 tuần), có thể điều trị liên tục trong thời gian tiếp xúc với dị nguyên.',
						preserve: 'Bảo quản từ 2 đến 30°C. Tránh ẩm.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand13 || undefined, // Merck Sharp & Dohme
						origin: origin6 || undefined, // Thái Lan
						images: [P01429_1],
					},
					options: {
						transaction: true,
					},
				}); // Aerius Desloratadine 19

				const brand14 = await this.brandRepository.createOne({
					data: {
						name: 'DHG Pharma',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // DHG Pharma 14
				const [P11242_1, P11242_2, P11242_3] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P11242_1_l.jpg',
							publicId: 'P11242_1_l',
							fileName: 'P11242_1_l.jpg',
							description: 'Telfor',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuocsuckhoe.com/proxy/500/0/1/upload/product/2019/03/thuoc-tri-viem-mui-di-ung-noi-me-day-tu-phat-telfor-60mg-5c79f96bbb4f5-02032019103259.jpg',
							publicId: 'P11242_2_l',
							fileName: 'P11242_2_l.jpg',
							description: 'Telfor',
							width: 500,
							height: 500,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p112423l-4676.jpg',
							publicId: 'P11242_3_l',
							fileName: 'P11242_3_l.jpg',
							description: 'Telfor',
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
						code: 'P11242',
						name: 'Telfor',
						description:
							'Nhóm thuốc kháng Histamin H1 được sử dụng phổ biến trong các tình trạng dị ứng như viêm mũi dị ứng hay mày đay tự phát mãn tính. Trong đó hay gặp nhất là hoạt chất Fexofenadin có trong sản phẩm thương mại Tocimat 60.',
						packingSpec: 'Hộp 2 vỉ x 10 viên',
						unit: 'Hộp',
						price: 26000,
						element:
							'Fexofenadin HCl ........................................................................60 mg\n' +
							'Tá dược vừa đủ ..........................................................................1 viên\n' +
							'(Tinh bột biến tính, microcystalline cellulose M101, croscarmellose sodium, magnesi stearat, HPMC 606, HPMC 615, PEG 6000, titan dioxyd, talc, oxyd sắt đỏ, màu cam E110).',
						uses: 'Điều trị các triệu chứng viêm mũi dị ứng',
						subject: 'Người lớn và trẻ em trên 12 tuổi',
						guide:
							'Người lớn và trẻ em trên 12 tuổi: uống 1 viên x 2 lần / ngày.\n' +
							'Người lớn và trẻ em trên 12 tuổi bị suy thận hay phải thẩm phân máu: uống 1 viên x 1 lần/ ngày.\n' +
							'Không cần điều chỉnh liều cho người suy gan.\n',
						preserve: 'Nơi khô, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand14 || undefined, // DHG Pharma
						origin: origin1 || undefined, // Việt Nam
						images: [P11242_1, P11242_2, P11242_3],
					},
					options: {
						transaction: true,
					},
				}); // Telfor 20

				const origin7 = await this.originRepository.createOne({
					data: {
						name: 'Thuỵ Sĩ',
					},
					options: {
						transaction: true,
					},
				}); // Thuỵ Sĩ 7
				const P00521_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p00521_1_l-9945.jpg',
						publicId: 'P00521_1_l',
						fileName: 'P00521_1_l.jpg',
						description: 'Xyzal',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00521',
						name: 'Xyzal',
						description:
							'Thuốc Xyzal là một trong những thuốc kháng histamin và kháng dị ứng. Công dụng của thuốc Xyzal để điều trị các triệu chứng viêm mũi dị ứng theo mùa và quanh năm hay mày đay mãn tính.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 75000,
						element:
							'Mỗi viên nén bao phim chứa 5mg Levocetirizin dihydroclorid.\n' +
							'Tá dược: Microcrystallin cellulose, Lactose monohydrat, Colloidal anhydrous silica, Magnesium stearat, Opadry Y - 1 - 7000 [chứa Hypromellose (E464), Titanium dioxid (E171), Macrogol 400].',
						uses: 'Điều trị triệu chứng đi kèm với các tình trạng dị ứng:viêm mũi dị ứng theo mùa (bao gồm cả các triệu chứng ở mắt), viêm mũi dị ứng quanh năm, mày đay mạn tính.',
						subject:
							'Levocetirizin được chỉ định điều trị triệu chứng đi kèm với các tình trạng dị ứng:\n' +
							'Viêm mũi dị ứng theo mùa (bao gồm cả các triệu chứng ở mắt).\n' +
							'Viêm mũi dị ứng quanh năm.\n' +
							'Mày đay mạn tính.',
						guide:
							'Thuốc Xyzal được dùng đường uống, uống nguyên 1 viên thuốc cùng với nước hoặc không, có thể uống trong bữa ăn hoặc không.',
						preserve: 'Bảo quản ở nhiệt độ dưới 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand6 || undefined, // GlaxoSmithKline
						origin: origin7 || undefined, // Thuỵ Sĩ
						images: [P00521_1],
					},
					options: {
						transaction: true,
					},
				}); // Xyzal 21

				const [P14195_1, P14195_3] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p14195_1_l-0073.jpg',
							publicId: 'P14195_1_l',
							fileName: 'P14195_1_l.jpg',
							description: 'Allermine',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p141953l-9247.jpg',
							publicId: 'P14195_3_l',
							fileName: 'P14195_3_l.jpg',
							description: 'Allermine',
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
						code: 'P14195',
						name: 'Allermine',
						description:
							'Thuốc Allermine 4mg được bào chế dưới dạng viên nén, có thành phần là hoạt chất Clorpheniramin Maleat. Thuốc được chỉ định sử dụng điều trị các bệnh do dị ứng cấp và mãn tính ở đường hô hấp.',
						packingSpec: 'Hộp 10 vỉ x 20',
						unit: 'Hộp',
						price: 44000,
						element:
							'Mỗi viên nén chứa:\n' +
							'- Clorpheniramin maleat 4mg\n' +
							'- Tá dược vừa đủ 1 viên',
						uses: 'Điều trị bệnh do dị ứng cấp và mãn tính ở đường hô hấp như: Sổ mũi mùa, viêm mũi…; những triệu chứng dị ứng khác như viêm da tiếp xúc, mày đay, phù Quincke…',
						subject:
							'- Bệnh do dị ứng cấp và mãn tính ở đường hô hấp như: Sổ mũi mùa, viêm mũi…\n' +
							'- Những triệu chứng dị ứng khác như viêm da tiếp xúc, mày đay, phù Quincke, dị ứng do thức ăn hoặc thuốc; ngứa ở người bệnh bị sởi hoặc thủy đậu.',
						guide: 'Thuốc được dùng đường uống.',
						preserve: 'Để ở nhiệt độ dưới 30°C, tránh ẩm và ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand1 || undefined, // Agimexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P14195_1, P14195_3],
					},
					options: {
						transaction: true,
					},
				}); // Allermine 22

				const P01336_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://duocare.vn/wp-content/uploads/2020/08/P01336_1_l.jpg',
						publicId: 'P01336_1_l',
						fileName: 'P01336_1_l.jpg',
						description: 'Theralene',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01336',
						name: 'Theralene 5mg',
						description:
							'Thuốc Theralene 5mg có chứa hoạt chất alimemazin, có tác dụng giúp ngăn chặn histamin mà cơ thể tạo ra trong phản ứng dị ứng. Hơn nữa, thuốc Theralene 5mg còn tác động trực tiếp lên não giúp cho bạn cảm thấy thư giãn hơn. Tuy nhiên, khi sử dụng có thể gặp một số tác dụng phụ không mong muốn như: đau đầu, chóng mặt, mệt mỏi, táo bón,...',
						packingSpec: 'Hộp 2 vỉ x 20 viên',
						unit: 'Hộp',
						price: 19200,
						element:
							'Hoạt chất: Alimemazin (dưới dạng Alimemazin tartrat) 5mg\n' +
							'Tá dược:\n' +
							'+ viên nhân: lactose monohydrat, tinh bột mì, colloidal anhydrous silica (Aerosil 200), erythrosin, colloidal hydrated silica (Levilite), magnesi stearat.\n' +
							'+ lớp bao: hydroxypropyl methyl cellulose, polyoxyethylen glycol 6000 (PEG 6000, Macrogol 6000), erythrosin vừa đủ cho 1 viên.',
						uses: 'Giảm ho khan, ho do kích ứng, dị ứng,…',
						subject: 'Trẻ em trên 6 tuổi và người lớn.',
						guide:
							'- Dùng đường uống.\n' +
							'- Uống viên thuốc với một ít nước.\n' +
							'- Thời gian uống thuốc:\n' +
							'Vì thuốc có tác dụng gây buồn ngủ, tốt nhất nên bắt đầu điều trị các biểu hiện dị ứng vào buổi tối.\n' +
							'- Thời gian điều trị:\n' +
							'Chỉ nên điều trị triệu chứng ngắn ngày (vài ngày). Nếu trị ho, chỉ nên dùng thuốc vào những lúc bị ho.',
						preserve: 'Bảo quản ở nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand10 || undefined, // Sanofi
						origin: origin1 || undefined, // Việt Nam
						images: [P01336_1],
					},
					options: {
						transaction: true,
					},
				}); // Theralene 5mg 23

				const origin8 = await this.originRepository.createOne({
					data: {
						name: 'Bỉ',
					},
					options: {
						transaction: true,
					},
				}); // Bỉ 8
				const brand15 = await this.brandRepository.createOne({
					data: {
						name: 'Jassen',
						origin: origin8 || undefined, // Bỉ
					},
					options: {
						transaction: true,
					},
				}); // Jassen 15
				const P00995_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p00995_1_l-6880.jpg',
						publicId: 'P00995_1_l',
						fileName: 'P00995_1_l.jpg',
						description: 'Stugeron',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00995',
						name: 'Stugeron',
						description:
							'Stugeron là một biệt dược hay được sử dụng trong điều trị tình trạng rối loạn tuần hoàn máu, rối loạn tiền đình hay phòng ngừa say tàu xe. Khi dùng thuốc cần lưu ý một số vấn đề về tác dụng phụ của thuốc đối với sức khỏe người bệnh.',
						packingSpec: 'Hộp 25 vỉ x 10 viên',
						unit: 'Hộp',
						price: 187000,
						element:
							'- Hoạt chất: mỗi viên nén chứa 25mg Cinnarizin.\n' +
							'- Tá dược: lactose monohydrat, tinh bột ngô, sucrose, bột talc, dầu thực vật được hydro hóa loại I, polyvidon K90, nước tinh khiết.',
						uses: 'Điều trị rối loạn tuần hoàn não, rối loạn thăng bằng, say tàu xe ...',
						subject: 'Trẻ em trên 6 tuổi và người lớn',
						guide: 'Nên uống STUGERON sau bữa ăn.',
						preserve: 'Bảo quản ở nhiệt độ 15 độ C - 30 độ C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand15 || undefined, // Jassen
						origin: origin6 || undefined, // Thái Lan
						images: [P00995_1],
					},
					options: {
						transaction: true,
					},
				}); // Stugeron 24

				const brand16 = await this.brandRepository.createOne({
					data: {
						name: 'Imexpharm',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Imexpharm 16
				const P04750_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p04750_1_l-0362.jpg',
						publicId: 'P04750_1_l',
						fileName: 'P04750_1_l.jpg',
						description: 'Imexofen',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P04750',
						name: 'Imexofen',
						description:
							'Thuốc Imexofen 180mg có tác dụng trong điều trị các triệu chứng của viêm mũi dị ứng theo mùa và mề đay. Việc tuân thủ chỉ định, liều dùng của thuốc Imexofen sẽ giúp người bệnh nâng cao hiệu quả điều trị và đảm bảo an toàn cho sức khỏe.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 48000,
						element:
							'Fexofenadin hydroclorid: 60mg\n' +
							'Tá dược: Cellulose vi tinh thể, Lactose monohydrat, Natri croscarmellose, Magnesi stearat, Hydroxypropyl methylcellulose, Macrogol, Titan dioxyd, Oxyd sắt đỏ, FD&C yellow 6 lake.',
						uses: 'Điều trị triệu chứng trong viêm mũi',
						subject: 'Người lớn và trẻ em trên 6 tuổi',
						guide:
							'Uống nguyên viên thuốc. Có thể uống thuốc trước, trong hoặc sau bữa ăn.',
						preserve: 'Dưới 30°C, tránh ẩm và ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand16 || undefined, // Imexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P04750_1],
					},
					options: {
						transaction: true,
					},
				}); // Imexofen 25

				const [P11743_1, P11743_2, P11743_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://static.salekit.com/image/shop/3180/products/1575369258-thuocbaty.jpg',
							publicId: 'P11743_1_l',
							fileName: 'P11743_1_l.jpg',
							description: 'Agimfast',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://product.hstatic.net/1000113261/product/thuoc-ba-ty-_97487c1727b945d19171e0853aa9cc0a.jpg',
							publicId: 'P11743_2_l',
							fileName: 'P11743_2_l.jpg',
							description: 'Agimfast',
							width: 300,
							height: 300,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/thuoc-ba-ty--_6d3c02b4dc2e480c8bc319972783d690_grande.jpg',
							publicId: 'P11743_4_l',
							fileName: 'P11743_4_l.jpg',
							description: 'Agimfast',
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
						code: 'P11743',
						name: 'Agimfast',
						description:
							'Thuốc Agimfast 60mg là thuốc kháng histamin thế hệ hai, được sử dụng trong điều trị triệu chứng viêm mũi dị ứng và mày đay vô căn.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 15000,
						element:
							'Công thức cho 1 viên:\n' +
							'Fexofenadin hydroclorid 60mg\n' +
							'Tá dược vừa đủ cho 1 viên',
						uses: 'Điều trị triệu chứng viêm mũi dị ứng như: Hắt hơi, chảy nước mũi, ngứa mũi, ngứa vòm miệng và họng…',
						subject: 'Người lớn và trẻ em từ 12 tuổi trở lên',
						guide:
							'Thuốc Agimfast 60mg dùng đường uống, thời điểm uống thuốc không phụ thuộc vào bữa ăn. Không nên uống thuốc Agimfast với nước hoa quả.',
						preserve: 'Nhiệt độ dưới 30°C, tránh ẩm và ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand1 || undefined, // Agimexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P11743_1, P11743_2, P11743_4],
					},
					options: {
						transaction: true,
					},
				}); // Agimfast 26

				const P04150_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/upload/sanpham/p04150_1-400x400-6000.jpg',
						publicId: 'P04150_1_l',
						fileName: 'P04150_1_l.jpg',
						description: 'Cetirizin',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P04150',
						name: 'Cetirizin',
						description:
							'Nếu bạn bị dị ứng quanh năm hoặc dị ứng theo mùa bác sĩ có thể đề nghị dùng Cetirizin stada 10mg. Thuốc này có thể giúp giảm các triệu chứng dị ứng, nhưng không ngăn được sự xuất hiện của bệnh.',
						packingSpec: 'Hộp 5 vỉ x 10 viên',
						unit: 'Hộp',
						price: 20000,
						element:
							'- Cetirizine dihydrochloride 10mg\n' +
							'- Tá dược: Lactose monohydrat, tinh bột bắp, talc, magnesi stearat, povidon K30, hypromellose, polyethylen glycol 6000, titan dioxyd.',
						uses: 'Điều trị các triệu chứng ở mũi và mắt của viêm mũi dị ứng theo mùa và quanh năm, các triệu chứng của mày đay vô căn mạn tính',
						subject: 'Người lớn/trẻ em từ 12 tuổi trở lên',
						guide:
							'Cetirizin STADA 10mg được dùng bằng đường uống. Thức ăn có thể làm giảm nồng độ đỉnh trong máu và kéo dài thời gian đạt nồng độ đỉnh nhưng không ảnh hưởng đến mức hấp thụ thuốc, cho nên có thể uống cùng hoặc ngoài bữa ăn.',
						preserve:
							'Bảo quản trong bao bì kín, nơi khô. Nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand9 || undefined, // Stella
						origin: origin1 || undefined, // Việt Nam
						images: [P04150_1],
					},
					options: {
						transaction: true,
					},
				}); // Cetirizin 27

				const brand17 = await this.brandRepository.createOne({
					data: {
						name: 'Dược Phẩm 3/2',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Dược Phẩm 3/2 17
				const [P15119_1, P15119_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuochapu.com/img/uploads/eftilora-10mg-dp3-2-1x10.jpg',
							publicId: 'P15119_1_l',
							fileName: 'P15119_1_l.jpg',
							description: 'Eftilora',
							width: 600,
							height: 600,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_c9fad20a2fe94d8e9b4e2d54535b533c_grande.jpg',
							publicId: 'P15119_4_l',
							fileName: 'P15119_4_l.jpg',
							description: 'Eftilora',
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
						code: 'P15119',
						name: 'Eftilora',
						description:
							'Thuốc Eftilora có thành phần chính là Loratadin 10mg. Đây là một thuốc kê đơn sử dụng trong điều trị các triệu chứng dị ứng. Để đảm bảo hiệu quả sử dụng, người dùng cần đọc kỹ hướng dẫn và tuân thủ theo đúng chỉ dẫn của bác sĩ.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 165000,
						element: 'Cho 1 viên nén\n' + '- Hoạt chất: Loratadin 10mg',
						uses: 'Điều trị viêm mũi dị ứng, nổi mề đay tự phát mạn tính.',
						subject: '- Viêm mũi dị ứng.\n' + '- Nổi mề đay tự phát mạn tính.',
						guide: 'Dùng theo đường uống.',
						preserve: 'Nên bảo quản dưới 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand17 || undefined, // Dược Phẩm 3/2
						origin: origin1 || undefined, // Việt Nam
						images: [P15119_1, P15119_4],
					},
					options: {
						transaction: true,
					},
				}); // Eftilora 28

				const P14098_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p140982l-3158.jpg',
						publicId: 'P14098_1_l',
						fileName: 'P14098_1_l.jpg',
						description: 'Fefasdin',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P14098',
						name: 'Fefasdin',
						description:
							'Thuốc Fefasdin 60 là thuốc chống dị ứng (thuộc nhóm thuốc kháng Histamin thế hệ 2) thường dùng trong các trường hợp quá mẫn cảm, dị ứng theo mùa, nổi phát ban và phát ban tự phát mạn tính.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 24000,
						element: 'Fexofenadin HCl 120mg',
						uses: 'Điều trị triệu chứng trong viêm mũi dị ứng theo mùa, mày đay mạn tính vô căn ở người lớn và trẻ em trên 6 tuổi.',
						subject:
							'Điều trị triệu chứng trong viêm mũi dị ứng theo mùa, mày đay mạn tính vô căn ở người lớn và trẻ em trên 6 tuổi.',
						guide:
							'Thuốc Fefasdin có dạng viên nén bao phim nên sẽ hiệu quả nhất nếu người dùng uống nguyên viên thuốc với một ít nước khi bụng đói.',
						preserve: 'Bảo quản ở nhiệt độ không quá 30°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand3 || undefined, // Khánh Hòa
						origin: origin1 || undefined, // Việt Nam
						images: [P14098_1],
					},
					options: {
						transaction: true,
					},
				}); // Fefasdin 29

				const brand18 = await this.brandRepository.createOne({
					data: {
						name: 'An Thien Pharma',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // An Thien Pharma 18
				const [P12776_1, P12776_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://www.duocgiasi.com/image/6037d5729402e33868c3321b/original.jpg',
							publicId: 'P12776_1_l',
							fileName: 'P12776_1_l.jpg',
							description: 'A.T Desloratadin',
							width: 1000,
							height: 1000,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://chothuoctay.com/80257-home_default/sm-desloratadin-25mg5ml-h30a.jpg',
							publicId: 'P12776_2_l',
							fileName: 'P12776_2_l.jpg',
							description: 'Eftilora',
							width: 450,
							height: 478,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				await this.productRepository.createOne({
					data: {
						code: 'P12776',
						name: 'A.T Desloratadin',
						description:
							'At Desloratadin có thành phần chính là Desloratadin 2.5mg, bào chế dạng dung dịch uống. Tuân thủ chỉ định, liều dùng thuốc At Desloratadin sẽ giúp người bệnh nâng cao hiệu quả điều trị và tránh được những tác dụng phụ không mong muốn.',
						packingSpec: 'Hộp 30 ống x 5ml',
						unit: 'Hộp',
						price: 112000,
						element:
							'- Hoạt chất: Desloratadin 2.5mg.\n' +
							'- Tá dược: Sucrose, Sucralose, Acid citric, Sorbitol 70%, Methyl paraben, Propyl paraben, Propylen glycol, Đỏ erythrosin, Hương dâu, Nước tinh khiết.',
						uses: 'Làm giảm triệu chứng trong các bệnh: Viêm mũi dị ứng, ngứa, nổi mề đay mạn tính.',
						subject:
							'Làm giảm triệu chứng trong các bệnh: Viêm mũi dị ứng, ngứa, nổi mề đay mạn tính.',
						guide: 'Uống 1 lần duy nhất trong ngày.',
						preserve:
							'Nơi khô ráo, nhiệt độ không quá 30 độ C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand18 || undefined, // An Thien Pharma
						origin: origin1 || undefined, // Việt Nam
						images: [P12776_1, P12776_2],
					},
					options: {
						transaction: true,
					},
				}); // A.T Desloratadin 30

				const P14749_2 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_af0aac21d87a4774804645ab3ee70658_grande.jpg',
						publicId: 'P14749_2_l',
						fileName: 'P14749_2_l.jpg',
						description: 'Telfast Kids',
						width: 300,
						height: 300,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P14749',
						name: 'Telfast Kids',
						description:
							'Telfast Kids là một thuốc kháng histamin thế hệ 2 được sử dụng để điều trị các trường hợp viêm mũi dị ứng và nổi mày đay tự phát mạn tính. Thuốc dùng được cho cả người lớn và trẻ em trên 6 tuổi. Khuyến cáo không nên dùng thuốc Telfast Kids ở phụ nữ có thai và đang cho con bú.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 28000,
						element:
							'Cho 1 viên nén bao phim:\n' +
							'- Thành phần hoạt chất: Fexofenadin hydroclorid 30mg\n' +
							'- Thành phần tá dược: Microcrystalline cellulose (avicel pHIOI, avicel pH102), pregelatinised starch, croscarmellose natri, magnesi stearat, hypromellose E-5, hypromellose E-15, titan dioxyd, povidon, colloidal anhydrous silica, macrogol 400, hỗn hợp pink iron oxyd (PB1254), hỗn hợp yellow iron oxyd (PB1255).',
						uses: 'Điều trị viêm mũi dị ứng và mày đay vô căn mạn tính.',
						subject: 'Trẻ em từ 6 đến 11 tuổi',
						guide:
							'- Thuốc dùng đường uống với nước. Không uống thuốc với nước hoa quả (như cam, bưởi, táo).\n' +
							'- Nên uống Telfast Kids với nước lọc.',
						preserve: 'Bảo quản ở nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand10 || undefined, // Sanofi
						origin: origin1 || undefined, // Việt Nam
						images: [P14749_2],
					},
					options: {
						transaction: true,
					},
				}); // Telfast Kids 31

				const brand19 = await this.brandRepository.createOne({
					data: {
						name: 'Mega Lifesciences',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Mega Lifesciences 19
				const [P14329_1, P14329_2, P14329_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuocantam.org/wp-content/uploads/2021/05/p14329_1-600x600-1.jpg',
							publicId: 'P14329_1_l',
							fileName: 'P14329_1_l.jpg',
							description: 'Loreze',
							width: 600,
							height: 600,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p143292l-8290.jpg',
							publicId: 'P14329_2_l',
							fileName: 'P14329_2_l.jpg',
							description: 'Loreze',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p143294l-3701.jpg',
							publicId: 'P14329_4_l',
							fileName: 'P14329_4_l.jpg',
							description: 'Loreze',
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
						code: 'P14329',
						name: 'Loreze',
						description:
							'Thuốc Loreze được sản xuất bởi Công ty Mega Lifesciences Public Company Limited - Thái Lan, có thành phần chính là Loratadin. Thuốc Loreze được chỉ định trong điều trị triệu chứng viêm mũi dị ứng; Điều trị triệu chứng mề đay mạn tính tự phát.',
						packingSpec: 'Hộp 5 vỉ x 10 viên',
						unit: 'Hộp',
						price: 210000,
						element:
							'- Mỗi viên nang mềm chứa Loratadin micronized 10mg.\n' +
							'- Tá dược: Polyethylen glycol 400, propylen glycol, polysorbat 80.\n' +
							'- Tá dược nang mềm: Gelatin, glycerin, màu xanh brilliant, nước tinh khiết.',
						uses: 'Điều trị triệu chứng viêm mũi dị ứng (chảy nước mũi, hắt hơi, ngứa mũi hoặc họng) và triệu chứng mề đay mạn tính tự phát.',
						subject: 'Người lớn và trẻ em trên 2 tuổi',
						guide: 'Loreze dùng đường uống.',
						preserve: 'Bảo quản dưới 30°C ở nơi khô ráo, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand19 || undefined, // Mega Lifesciences
						origin: origin6 || undefined, // Thái Lan
						images: [P14329_1, P14329_2, P14329_4],
					},
					options: {
						transaction: true,
					},
				}); // Loreze 32

				const [P04574_1, P04574_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P04574_1_l.jpg',
							publicId: 'P04574_1_l',
							fileName: 'P04574_1_l.jpg',
							description: 'Loratadin',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://dalieutailinh.edu.vn/wp-content/uploads/2021/07/P04574_2_l.jpg',
							publicId: 'P04574_2_l',
							fileName: 'P04574_2_l.jpg',
							description: 'Loratadin',
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
						code: 'P04574',
						name: 'Loratadin',
						description:
							'Dị ứng gây các triệu chứng ngứa ngáy, nổi mề đay, hắt hơi, sổ mũi... khiến cơ thể người bệnh mệt mỏi và khó chịu. Khi đó thuốc dị ứng loratadin là một giải pháp hiệu quả, giúp người bệnh cảm thấy dễ chịu hơn.',
						packingSpec: 'Hộp 2 vỉ x 10 viên',
						unit: 'Hộp',
						price: 16800,
						element:
							'Mỗi viên nén chứa\n' +
							'- Hoạt chất: Loratadin 10mg\n' +
							'- Tá dược: Cellulose vi tinh thể, Cellactose 80, Natri starch glycollat, Magnesi stearat, Aerosil.',
						uses: 'Thuốc Loratadin 10 mg được sản xuất bởi Công ty cổ phần Traphaco, có thành phần chính là loratadin. Thuốc Loratadin được chỉ định trong điều trị viêm mũi dị ứng bao gồm hắt hơi, sổ mũi, chảy nước mũi, ngứa mũi, viêm kết mạc dị ứng, ngứa và chảy nước mắt do dị ứng, ngứa, mày đay và các bệnh về da do dị ứng khác. Thuốc Loratadin được bào chế dưới dạng viên nén. Hộp 1 vỉ x 10 viên.',
						subject: 'Người lớn và trẻ em trên 12 tuổi',
						guide: 'Thuốc Loratadin được dùng đường uống.',
						preserve: 'Dưới 300C, tránh ẩm và ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand16 || undefined, // Imexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P04574_1, P04574_2],
					},
					options: {
						transaction: true,
					},
				}); // Loratadin 33

				const P11167_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoclongchau.com/images/product/2021/05/00020030-cetirizine-10mg-imexpharm-10x10-1219-60a4_large.jpg',
						publicId: 'P11167_1_l',
						fileName: 'P11167_1_l.jpg',
						description: 'Pms-Cetirizine',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11167',
						name: 'Pms-Cetirizine',
						description:
							'Thuốc Cetirizine là một loại thuốc được dùng để điều trị dị ứng, hoạt chất là cetirizine hydrochloride hoặc cetirizine dihydrochloride. Thuốc được bào chế dưới nhiều dạng dùng như: Viên nén bao phim, viên nang, dung dịch uống hoặc siro.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 37000,
						element: 'Cetirizine 10mg',
						uses: 'Điều trị viêm mũi dị ứng theo mùa, viêm mũi dị ứng quanh năm & mề đay tự phát mạn tính như hắt hơi, sổ mũi...',
						subject:
							'Viêm mũi dị ứng theo mùa, viêm mũi dị ứng quanh năm & mề đay tự phát mạn tính như hắt hơi, sổ mũi, xu',
						guide:
							'Người lớn & trẻ >= 12 tuổi: liều khởi đầu 5 - 10 mg/ngày, tùy mức độ. Có thể dùng lâu dài.\n' +
							'Người lớn >= 65 tuổi: 5 mg/ngày',
						preserve: 'Nơi khô thoáng,tránh ánh nắng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand16 || undefined, // Imexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P11167_1],
					},
					options: {
						transaction: true,
					},
				}); // Pms-Cetirizine 34

				const P00624_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p00624_1_l-0062.jpg',
						publicId: 'P00624_1_l',
						fileName: 'P00624_1_l.jpg',
						description: 'Zyrtec',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00624',
						name: 'Zyrtec 10mg',
						description:
							'Zyrtec 10mg chứa hoạt chất chính là certirizine, đây là thuốc điều trị dị ứng được chỉ định trong điều trị mày đay, viêm mũi dị ứng. Để đảm bảo hiệu quả sử dụng, người dùng thuốc cần tuân thủ theo đúng chỉ dẫn của bác sĩ, dược sĩ tư vấn.',
						packingSpec: 'Hộp 1 vỉ x 10 viên',
						unit: 'Hộp',
						price: 71000,
						element:
							'Mỗi viên chứa:\n' +
							'Hoạt chất: 10mg Cetirizine dihydrochloride\n' +
							'Tá dược: microcrystalline cellulose, lactose monohydrate, colloidal anhydrous silica, magnesium stearate vừa đủ cho một viên, Opadry Y-1-7000 vỏ bao.',
						uses: 'giảm các triệu chứng về mũi và mắt của viêm mũi dị ứng theo mùa và viêm mũi dị ứng quanh năm',
						subject:
							'Người lớn, trẻ em từ 2 tuổi trở lên:\n' +
							'- Cetirizin được chỉ định để làm giảm các triệu chứng về mũi và mắt của viêm mũi dị ứng theo mùa và viêm mũi dị ứng quanh năm.\n' +
							'- Cetirizin được chỉ định để làm giảm các triệu chứng của mày đay.',
						guide: 'Thuốc Zyrtec 10mg dạng viên nén bao phim dùng đường uống.',
						preserve: 'Dưới 25°C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand6 || undefined, // GlaxoSmithKline
						origin: origin7 || undefined, // Thuỵ Sĩ
						images: [P00624_1],
					},
					options: {
						transaction: true,
					},
				}); // Zyrtec 10mg 35

				const brand20 = await this.brandRepository.createOne({
					data: {
						name: "Dr Reddy'S",
						origin: origin3 || undefined, // Ấn Độ
					},
					options: {
						transaction: true,
					},
				}); // Dr Reddy'S 20
				const [P07905_1, P07905_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P07905_1_l.jpg',
							publicId: 'P07905_1_l',
							fileName: 'P07905_1_l.jpg',
							description: 'Histalong',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://whitepharma.vn/wp-content/uploads/2021/07/Thuoc-dieu-tri-viem-mui-di-ung-theo-mua-viem-mang-ket-va-noi-me-day-Histalong-5-vi-x-4-vien_2.jpg',
							publicId: 'P07905_2_l',
							fileName: 'P07905_2_l.jpg',
							description: 'Histalong',
							width: 400,
							height: 400,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				await this.productRepository.createOne({
					data: {
						code: 'P07905',
						name: 'Histalong',
						description:
							'Thuốc Histalong (Cetirizine) thường được chỉ định để điều trị các tình trạng liên quan đến dị ứng. Thuốc được dành cho cả trẻ em và người lớn. Tuy nhiên sử dụng thuốc histalong đúng cách không phải ai cũng biết.',
						packingSpec: 'Hộp 5 vỉ x 4 viên',
						unit: 'Hộp',
						price: 22000,
						element: 'Cetirizin',
						uses: 'Thuốc Histalong điều trị viêm mũi theo mùa và viêm màng kết, viêm mũi dị ứng tái viên, ngứa và nổi mề đay.',
						subject:
							'Điều trị viêm mũi theo mùa và viêm màng kết, viêm mũi dị ứng tái viên, ngứa và nổi mề đay.',
						guide: 'Có thể dùng trước và sau khi ăn.',
						preserve:
							'Bảo quản ở nhiệt độ không quá 30 độ C, tránh ánh sáng và ẩm.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand20 || undefined, // Dr Reddy'S
						origin: origin3 || undefined, // Ấn Độ
						images: [P07905_1, P07905_2],
					},
					options: {
						transaction: true,
					},
				}); // Histalong 36

				const brand21 = await this.brandRepository.createOne({
					data: {
						name: 'Pharmedic',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Pharmedic 21
				const P02818_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.nhathuocsuckhoe.com/unsafe/0x0/left/top/smart/filters:quality(350)/https://nhathuocsuckhoe.com/upload/news/content/2021/06/thuoc-allerfar-4mg-co-chua-chlorpheniramine-maleat-jpg-1623403100-11062021161820.jpg',
						publicId: 'P02818_1_l',
						fileName: 'P02818_1_l.jpg',
						description: 'Allerfar',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P02818',
						name: 'Allerfar',
						description:
							'Thuốc Allerfar là thuốc kháng Histamin, có thành phần chính là Chlorpheniramine maleate với hàm lượng 4 mg. Thuốc thường được chỉ định trong các trường hợp viêm mũi dị ứng, điều trị triệu chứng dị ứng khác như mày đay, viêm kết mạc dị ứng, viêm da tiếp xúc...',
						packingSpec: 'Hộp 10 vỉ x 20 viên',
						unit: 'Hộp',
						price: 19000,
						element:
							'Viên nén có chứa:\n' +
							'- Hoạt chất: Chlorphenamine maleat 4mg\n' +
							'- Tá dược: Lactose, tinh bột sắn, povidon, talc, magnesi stearat, vàng tartrazin vừa đủ 1 viên nén dài.',
						uses: 'Điều trị viêm mũi dị ứng theo mùa và quanh năm...',
						subject:
							'- Điều trị viêm mũi dị ứng theo mùa và quanh năm.\n' +
							'- Điều trị những triệu chứng dị ứng khác như: Mày đay, viêm mũi vận mạch do histamin, viêm kết mạc dị ứng, viêm da tiếp xúc, phù mạch, phù quincke, dị ứng thức ăn, phản ứng huyết thanh, côn trùng đốt, ngứa ở người bệnh bị sởi hoặc thủy đậu.',
						guide:
							'Thuốc Allerfar dược dùng đường uống, có thể dùng trong hoặc ngoài bữa ăn. Đối với trẻ dưới 6 tuổi tốt nhất nên nghiền thuốc để tránh nguy cơ hóc thuốc.',
						preserve:
							'- Ở nhiệt độ không quá 30°C.\n' + '- Để xa tầm tay của trẻ em.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand21 || undefined, // Pharmedic
						origin: origin1 || undefined, // Việt Nam
						images: [P02818_1],
					},
					options: {
						transaction: true,
					},
				}); // Allerfar 37

				const brand22 = await this.brandRepository.createOne({
					data: {
						name: 'VNP',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // VNP 22
				const [P15114_1, P15114_2, P15114_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuocchinhhang.vn/wp-content/uploads/2020/10/Eucol-1.jpg',
							publicId: 'P15114_1_l',
							fileName: 'P15114_1_l.jpg',
							description: 'Eucol',
							width: 800,
							height: 800,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/2_4a87345c323a4f128c492608abc80409_grande.jpg',
							publicId: 'P15114_2_l',
							fileName: 'P15114_2_l.jpg',
							description: 'Eucol',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/3_be1b9c09170642fe9beaeebe1ec630bb_grande.jpg',
							publicId: 'P15114_4_l',
							fileName: 'P15114_4_l.jpg',
							description: 'Eucol',
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
						code: 'P15114',
						name: 'Eucol',
						description:
							'Thuốc Eucol 1,25mg/5ml có chứa thành phần chính là hoạt chất Desloratadin có vai trò trong điều trị viêm mũi dị ứng, mày đay. Để đảm bảo hiệu quả sử dụng và tránh được các tác dụng phụ không mong muốn, người bệnh cần đọc kỹ hướng dẫn sử dụng và tham khảo ý kiến của bác sĩ, dược sĩ chuyên môn.',
						packingSpec: 'Hộp 4 vỉ x 5 ống',
						unit: 'Hộp',
						price: 110000,
						element:
							'- Hoạt chất: Desloratadin 1,25 mg.\n' +
							'- Tá dược: Propylen glycol, glycerin, sorbitol, acid citric, trinatri citrat dihydrat, natri benzoat, natri edetat, sucralose, kali sorbat, hương hoa quả tự nhiên, nước tinh khiết.',
						uses: 'Điều trị viêm mũi dị ứng như hắt hơi, sổ mũi và ngứa mũi, sung huyết, nghẹt mũi, cũng như ngứa, chảy nước mắt và đỏ mắt, ngứa họng và ho.',
						subject: 'Người lớn và trẻ em.',
						guide:
							'Thuốc Eucol 1.25 mg/5 ml dạng dung dịch dùng đường uống. Có thể dùng lúc đói hoặc no.',
						preserve: 'Ở nhiệt độ 30 độ C, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand22 || undefined, // VNP
						origin: origin1 || undefined, // Việt Nam
						images: [P15114_1, P15114_2, P15114_4],
					},
					options: {
						transaction: true,
					},
				}); // Eucol 38

				const brand23 = await this.brandRepository.createOne({
					data: {
						name: 'S.P.M',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // S.P.M 23
				const [P13558_1, P13558_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P13558_1_l.jpg',
							publicId: 'P13558_1_l',
							fileName: 'P13558_1_l.jpg',
							description: 'Devomir',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_1a3e01374d1f40b5b49be45bc4497dce_grande.jpg',
							publicId: 'P13558_2_l',
							fileName: 'P13558_2_l.jpg',
							description: 'Devomir',
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
						code: 'P13558',
						name: 'Devomir',
						description:
							'Thuốc Devomir là một loại thuốc hướng tâm thần được sử dụng để khắc phục các vấn đề nhức đầu, choáng váng, buồn nôn,...',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 9000,
						element:
							'- Hoạt chất:Cinnarizin 25 mg\n' +
							'- Tá dược(vừa đủ 1 viên nén): Avicel M102, Lactose monohydrate, Talc, Magnesi stearat, Aerosil.',
						uses: 'Điều trị chóng mặt, đau nữa đầu, say tàu xe,…',
						subject: 'Người lớn và trẻ em.',
						guide: 'Dùng uống.',
						preserve: 'Nơi khô thoáng, tránh ánh sáng.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand23 || undefined, // S.P.M
						origin: origin1 || undefined, // Việt Nam
						images: [P13558_1, P13558_2],
					},
					options: {
						transaction: true,
					},
				}); // Devomir 39

				const [P02586_1, P02586_2, P02586_3] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p02586_1_l-5010.jpg',
							publicId: 'P02586_1_l',
							fileName: 'P02586_1_l.jpg',
							description: 'Bestrip',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p025862l-1504.jpg',
							publicId: 'P02586_2_l',
							fileName: 'P02586_2_l.jpg',
							description: 'Bestrip',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p025863l-158.jpg',
							publicId: 'P02586_3_l',
							fileName: 'P02586_3_l.jpg',
							description: 'Bestrip',
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
						code: 'P02586',
						name: 'Bestrip',
						description:
							'Thuốc Bestrip là sản phẩm của Công ty CP Dược phẩm Dược liệu Pharmedic, với thành phần chính Dimenhydrinat 50mg. Đây là loại thuốc dùng để phòng và điều trị các chứng say tàu xe, phòng và điều trị các chứng buồn nôn do nhiều nguyên nhân khác nhau (trừ do hoá trị liệu ung thư).',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 12000,
						element: 'Dimenhydrinate 50mg',
						uses: 'Phòng và điều trị các chứng buồn nôn, nôn và chóng mặt do say tàu xe, rối loạn tiền đình',
						subject:
							'- Thuốc Bestrip 50mg được chỉ định dùng trong các trường hợp sau:\n' +
							'- Phòng và điều trị các chứng buồn nôn, nôn và chóng mặt do say tàu xe.\n' +
							'- Phòng và điều trị nôn và chóng mặt do chứng Ménière và rối loạn tiền đình.',
						guide:
							'Thuốc Bestrip được sử dụng qua đường uống. Uống trọn viên thuốc với một ly nước.',
						preserve:
							'- Để nơi mát, tránh ánh sáng, nhiệt độ dưới 30⁰C.\n' +
							'- Để xa tầm tay trẻ em.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand21 || undefined, // Pharmedic
						origin: origin1 || undefined, // Việt Nam
						images: [P02586_1, P02586_2, P02586_3],
					},
					options: {
						transaction: true,
					},
				}); // Bestrip 40

				const P15175_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://whitepharma.vn/wp-content/uploads/2021/07/Loratadine-SPM-10mg-ODT-3-vi-x-10-vien-500x500.jpg',
						publicId: 'P15175_1_l',
						fileName: 'P15175_1_l.jpg',
						description: 'Loratadine SPM',
						width: 500,
						height: 500,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P15175',
						name: 'Loratadine SPM',
						description:
							'Dị ứng gây các triệu chứng ngứa ngáy, nổi mề đay, hắt hơi, sổ mũi... khiến cơ thể người bệnh mệt mỏi và khó chịu. Khi đó thuốc dị ứng loratadin là một giải pháp hiệu quả, giúp người bệnh cảm thấy dễ chịu hơn.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 39000,
						element:
							'- Hoạt chất: Loratadin 10,00mg.\n' + '- Tá dược: vừa đủ 1 viên.',
						uses: 'Điều trị viêm mũi dị ứng, viêm kết mạc dị ứng, ngứa, mề đay...',
						subject:
							'- Viêm mũi dị ứng\n' +
							'- Viêm kết mạc dị ứng \n' +
							'- Ngứa và mề đay liên quan đến histamin',
						guide:
							'Đặt viên thuốc lên lưỡi, thuốc tự tan sau 1 -2 phút, không cần uống với nước.',
						preserve:
							'- Để nơi mát, tránh ánh sáng, nhiệt độ dưới 30⁰C.\n' +
							'- Để xa tầm tay trẻ em.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand23 || undefined, // SPM
						origin: origin1 || undefined, // Việt Nam
						images: [P15175_1],
					},
					options: {
						transaction: true,
					},
				}); // Bestrip 41

				const brand24 = await this.brandRepository.createOne({
					data: {
						name: 'Bidiphar',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Bidiphar 24
				const P14865_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://static.salekit.com/image/shop/3180/products/1575368177-thuocbaty.jpg',
						publicId: 'P14865_1_l',
						fileName: 'P14865_1_l.jpg',
						description: 'Tocimat',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P14865',
						name: 'Tocimat',
						description:
							'Thuốc Tocimat 180 có tác dụng làm giảm các triệu chứng của bệnh lý gây ra do tác nhân dị ứng như viêm mũi dị ứng, viêm kết mạc, mày đay... Đây là một loại thuốc kháng dị ứng thế hệ mới, hiệu quả kéo dài hơn và giảm được tác dụng phụ gây buồn ngủ của thuốc thế hệ cũ.',
						packingSpec: 'Hộp 5 vỉ x 10 viên',
						unit: 'Hộp',
						price: 58000,
						element:
							'Cho 1 viên nén bao phim\n' +
							'- Thành phần hoạt chất: Fexofenadin HCl 60mg\n' +
							'- Thành phần tá dược: Tá dược vừa đủ 1 viên.\n' +
							'(Microcrystalline Cellulose, Croscarmellose natri, Pregelatinized Starch, PVP K30, Colloidal Silicon Dioxid, Natri Stearyl Fumarat, Natri Starch Glycolat, Crospovidon, HPMC, bột Talc, Titan dioxyd, PEG 4000, màu đỏ oxyd sắt, màu vàng oxyd sắt).',
						uses: 'Giảm các triệu chứng liên quan đến viêm mũi dị ứng theo mùa.',
						subject:
							'Dùng cho người lớn và trẻ em từ 12 tuổi trở lên để làm giảm các triệu chứng liên quan đến viêm mũi dị ứng theo mùa.',
						guide:
							'Dùng đường uống, thời điểm uống thuốc không phụ thuộc vào bữa ăn. Nuốt nguyên viên với một lượng nước phù hợp.',
						preserve: 'Nơi khô, mát, tránh ánh sáng, nhiệt độ không quá 30⁰C.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand24 || undefined, // Bidiphar
						origin: origin1 || undefined, // Việt Nam
						images: [P14865_1],
					},
					options: {
						transaction: true,
					},
				}); // Tocimat 42

				const brand25 = await this.brandRepository.createOne({
					data: {
						name: 'AMPHARCO U.S.A',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Bidiphar 25
				const [P15227_1, P15227_3, P15227_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://shipthuocnhanh.vn/images/products/2021/11/01/5-529.PNG',
							publicId: 'P15227_1_l',
							fileName: 'P15227_1_l.jpg',
							description: 'Usaallerz',
							width: 579,
							height: 346,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p152273l-1400.jpg',
							publicId: 'P15227_3_l',
							fileName: 'P15227_3_l.jpg',
							description: 'Usaallerz',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p152274l-1052.jpg',
							publicId: 'P15227_4_l',
							fileName: 'P15227_4_l.jpg',
							description: 'Usaallerz',
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
						code: 'P15227',
						name: 'Usaallerz',
						description:
							'Fexofenadine là một thuốc thuộc nhóm thuốc kháng histamin tác dụng kéo dài được sử dụng để điều trị dị ứng, thuốc ít có tác dụng an thần gây ngủ. Đây cũng là hoạt chất chính có trong thuốc Usaallerz 120.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 200000,
						element:
							'Mỗi viên nén bao phim chứa:\n' +
							'Fexofenadin hydroclorid......................... 120 mg\n' +
							'Tá dược: Corn starch, Pregelatinised starch, Lactose, Croscarmellose sodium, Colloidal anhydrous silica, Talc, Magnesi stearat, Opadry II white, Red iron oxide, Yellow iron oxide vđ 1 viên.',
						uses: 'Điều trị triệu chứng viêm mũi dị ứng, mày đay',
						subject: 'Người lớn và trẻ em từ 12 tuổi trở lên',
						guide:
							'Viêm mũi dị ứng theo mùa và bệnh nổi mày đay mạn tính vô căn\n' +
							'Người lớn và trẻ em từ 12 tuổi trở lên: Liều đề nghị 60mg uống 2 lần mỗi ngày hoặc 120-180mg uống ngày 1 lần với nước. Liều khởi đầu cho những bệnh nhân có suy chức năng thận được khuyến nghị là 60mg uống 1 lần mỗi ngày.',
						preserve:
							'Ở nhiệt độ dưới 30°C. Tránh ánh sáng trực tiếp và nơi ẩm ướt.',
						category: cate11 || undefined, // Thuốc kháng dị ứng
						trademark: brand25 || undefined, // AMPHARCO U.S.A
						origin: origin1 || undefined, // Việt Nam
						images: [P15227_1, P15227_3, P15227_4],
					},
					options: {
						transaction: true,
					},
				}); // Usaallerz 43

				// Cate1 / 9 / 12: Dược phẩm / Thuốc không kê đơn / Thuốc kháng viêm
				const brand26 = await this.brandRepository.createOne({
					data: {
						name: 'Novartis',
						origin: origin7 || undefined, // Thụy Sĩ
					},
					options: {
						transaction: true,
					},
				}); // Novartis 26
				const P01421_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p01421_1_l-0887.jpg',
						publicId: 'P01421_1_l',
						fileName: 'P01421_1_l.jpg',
						description: 'Voltaren Emulgel',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01421',
						name: 'Voltaren Emulgel',
						description:
							'Thuốc Voltaren Emulgel là chế phẩm kháng viêm, giảm sưng, giảm đau tại chỗ sản xuất bởi GSK Consumer Healthcare S.A (Thụy Sĩ) có chứa hoạt chất diclofenac được sử dụng trong điều trị giảm đau trong viêm và đau có nguồn gốc do chấn thương hoặc thấp khớp, rút ngắn thời gian phục hồi trở lại hoạt động bình thường.',
						packingSpec: 'Tuýp 20g',
						unit: 'Tuýp',
						price: 66000,
						element:
							'Hoạt chất: 100g Voltaren Emulgel chứa diclofenac diethylamine 1.16g (tương ứng với diclofenac natri 1g).\n' +
							'Tá dược: Carbomer, ether macrogol cetostearyl, cocoyl caprylocaprate, diethylamine, alcd isopropyl, paraffin lỏng, dầu khoáng, kem thơm 45, propylene glycol, nước tinh khiết.',
						uses: 'Điều trị bên ngoài về đau, viêm và sưng trong các trường hợp tổn thương gân, dây chằng, cơ và khớp…',
						subject:
							'- Tổn thương gân, dây chằng, cơ và khớp, ví dụ bong gân, vết bầm tím, căng cơ quá mức và đau lưng sau khi chơi thể thao hoặc bị tai nạn.\n' +
							'- Các dạng bệnh thấp khu trú ở mô mềm như viêm gân (đau khuỷu tay ở người chơi tennis), hội chứng vai - bàn tay, viêm bao hoạt dịch, bệnh viêm quanh khớp.\n' +
							'- Điều trị triệu chứng viêm xương khớp ở các khớp nhỏ và trung bình nằm gần với da như khớp ngón tay hoặc khớp gối.',
						guide:
							'- Trước khi sử dụng lần đầu, xuyên qua màng niêm phong của tuýp bằng đầu nhọn của nắp.\n' +
							'- Nhẹ nhàng bóp ra một lượng nhỏ gel từ tuýp thuốc và bôi lên vùng bị đau hoặc sưng, xoa từ từ vào da. Lượng cần thiết sẽ thay đổi tùy thuộc vào kích thước qủa chỗ đau hoặc sưng; một lượng cỡ bằng kích thước quả anh đào đến quả hạch thường là đủ. Bạn có thể nhận thấy một hiệu ứng mát nhẹ khi bạn chà gel vào.\n' +
							'- Sau khi bôi thuốc, cần rửa tay đúng cách (ngoại trừ khi điều trị viêm khớp ngón tay). Voltaren Emulgel cũng có thể được dùng như điều trị hỗ trợ với các dạng bào chế khác của Voltaren.',
						preserve: 'Không bảo quản trên 30°C. Tránh nhiệt.',
						category: cate12 || undefined, // Thuốc kháng viêm
						trademark: brand26 || undefined, // Novartis
						origin: origin7 || undefined, // Thụy Sĩ
						images: [P01421_1],
					},
					options: {
						transaction: true,
					},
				}); // Voltaren Emulgel 44

				const origin9 = await this.originRepository.createOne({
					data: {
						name: 'Nam Phi',
					},
					options: {
						transaction: true,
					},
				}); // Nam Phi 9
				const brand27 = await this.brandRepository.createOne({
					data: {
						name: 'Olay',
						origin: origin9 || undefined, // Nam Phi
					},
					options: {
						transaction: true,
					},
				}); // Olay 27
				const [P23542_1, P23542_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23542_1_l.jpg',
							publicId: 'P23542_1_l',
							fileName: 'P23542_1_l.jpg',
							description:
								'Sữa tắm dưỡng ẩm bơ hạt mỡ Olay Ultra Moisture Shea Butter Body Wash',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23542_2_l.jpg',
							publicId: 'P23542_2_l',
							fileName: 'P23542_2_l.jpg',
							description:
								'Sữa tắm dưỡng ẩm bơ hạt mỡ Olay Ultra Moisture Shea Butter Body Wash',
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
						code: 'P23542',
						name: 'Sữa tắm dưỡng ẩm bơ hạt mỡ Olay Ultra Moisture Shea Butter Body Wash',
						description:
							'Sữa tắm dưỡng ẩm bơ hạt mỡ Olay Ultra Moisture Shea Butter Body Wash nhập khẩu từ Mỹ, cải thiện làn da sau 14 ngày sử dụng. Chứa phức hợp B3 Complex chống oxy hóa, dưỡng ẩm cũng như bảo vệ lớp màng tự nhiên cho da, tăng khả năng miễn dịch.',
						packingSpec: 'Chai 650ml',
						unit: 'Chai',
						price: 126700,
						element:
							'Water, Petrolatum, Sodium Trideceth Sulfate, Sodium Chloride, Cocamidopropyl Betaine, Trideceth-3, Fragrance, Sodium Citrate, Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Xanthan Gum,...',
						uses: 'Làm sạch da trên cơ thể',
						subject: 'Mọi người',
						guide:
							'- Làm ướt cơ thể.\n' +
							'- Lấy một lượng sản phẩm vừa đủ ra lòng bàn tay hoặc bông tắm rồi tạo bọt với ít nước, sau đó mát-xa lên cơ thể theo chuyển động tròn.\n' +
							'- Tắm sạch lại với nước.',
						preserve: 'Tránh nhiệt độ cao và ánh nắng trực tiếp.',
						category: cate12 || undefined, // Thuốc kháng viêm
						trademark: brand27 || undefined, // Olay
						origin: origin2 || undefined, // Mỹ
						images: [P23542_1, P23542_2],
					},
					options: {
						transaction: true,
					},
				}); // Sữa tắm dưỡng ẩm bơ hạt mỡ Olay Ultra Moisture Shea Butter Body Wash 45

				const brand28 = await this.brandRepository.createOne({
					data: {
						name: 'OPC',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // OPC 28
				const [P15323_1, P15323_2, P15323_5] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p15323_1_l-9020.jpg',
							publicId: 'P15323_1_l',
							fileName: 'P15323_1_l.jpg',
							description: 'Dentanalgi',
							width: 400,
							height: 400,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://medilive.vn/wp-content/uploads/2022/01/Dentanalgi-7ml-2-300x300.jpg',
							publicId: 'P15323_2_l',
							fileName: 'P15323_2_l.jpg',
							description: 'Dentanalgi',
							width: 300,
							height: 300,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://nhathuocminhchaubd.com/resize/180x180/1/upload/baiviet/thuoctridaurangdentanalgi7ml4-8460.jpg',
							publicId: 'P15323_5_l',
							fileName: 'P15323_5_l.jpg',
							description: 'Dentanalgi',
							width: 180,
							height: 180,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				await this.productRepository.createOne({
					data: {
						code: 'P15323',
						name: 'Dentanalgi',
						description:
							'Dentanalgi là thuốc giảm đau kháng viêm được sử dụng để điều trị đau răng, viêm nướu răng, nha chu. Thuốc có các thành phần chính như Menthol, Camphor, Procain hydroclorid và tạo giác,...Tuân thủ chỉ định, liều dùng thuốc Dentanalgi sẽ giúp người bệnh nâng cao hiệu quả điều trị và tránh được những tác dụng phụ không mong muốn.',
						packingSpec: 'Hộp 1 chai 7ml',
						unit: 'Chai',
						price: 17000,
						element:
							'Hoạt chất: Camphor 420mg, Menthol 280mg, Procaine hydroclorid 35mg, Tinh dầu đinh hương 439mg, Sao đen 700mg, Tạo giác 140mg, Thông bạch 140mg.\n' +
							'Tá dược vừa đủ 7ml: Ethanol 96%, nước tinh khiết.',
						uses: 'Ðiều trị đau răng, viêm nướu răng, nha chu.',
						subject: 'Người lớn và trẻ em trên 5 tuổi.',
						guide:
							'Tẩm thuốc vào bông đặt nơi đau, 3 - 4 lần/ngày.\n' +
							'Nhỏ 1 ml thuốc (30 giọt) vào khoảng 60 ml nước chín, khuấy đều, ngậm và súc miệng 3 lần/ngày.\n' +
							'Hoặc dùng theo chỉ dẫn của bác sĩ.',
						preserve: 'Nơi khô mát, nhiệt độ dưới 30°C.',
						category: cate12 || undefined, // Thuốc kháng viêm
						trademark: brand28 || undefined, // OPC
						origin: origin1 || undefined, // Việt Nam
						images: [P15323_1, P15323_2, P15323_5],
					},
					options: {
						transaction: true,
					},
				}); // Dentanalgi 46

				// Cate1 / 9 / 13: Dược phẩm / Thuốc không kê đơn / Thuốc ngừa thai
				const brand29 = await this.brandRepository.createOne({
					data: {
						name: 'Ba Đình',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Ba Đình 29
				const P18119_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P18119_1.jpg',
						publicId: 'P18119_1',
						fileName: 'P18119_1.jpg',
						description: 'Pro Avalo',
						width: 1100,
						height: 1100,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P18119',
						name: 'Pro Avalo',
						description:
							'Thuốc tránh thai hằng ngày Pro Avalo là sản phẩm của Công ty Cổ phần Sinh học Dược phẩm Ba Đình có thành phần chính là Levonorgestrel dùng hằng ngày để tránh thai, thuốc dùng được cho cả người đang cho con bú.',
						packingSpec: 'Hộp 1 vỉ x 28 viên',
						unit: 'Hộp',
						price: 25000,
						element:
							'Cho 1 viên nén bao phim:\n' +
							'- Hoạt chất: Levonorgestrel 0,03mg.\n' +
							'- Tá dược: Lactose, Avicel, Magnesi stearat, Povidon K30, Sodium starch glycolat, Polyethỵlen glycol 6000, Hydroxypropyl methyl cellulose, Bột talc: vừa đủ 1 viên.',
						uses: 'Thuốc tránh thai.',
						subject: 'Người lớn',
						guide:
							'- Dùng đường uống.\n' +
							'- Uống bắt đầu từ ngày đầu của chu kì kinh nguyệt, uống 1 viên mỗi ngày vào cùng 1 giờ, uống không ngắt quãng trong suốt thời gian muốn tránh thai. Thuốc nên được uống liên tục kể cả khi có chảy máu hay không. Nếu có, một biện pháp ngừa thai phụ nên được áp dụng cho đến khi uống hết 14 viên thuốc đầu tiên.\n' +
							'- Nếu lỡ quên uống 1 viên thì cần uống ngay viên đó khi nhớ ra, nếu muộn trên 3 giờ nên sử dụng 1 biện pháp tránh thai phụ trong 14 ngày tiếp theo và vẫn uống tiếp tục như thường lệ.\n' +
							'- Nếu bị ói mửa hoặc tiêu chảy thì tác dụng tránh thai bị ảnh hưởng và cũng nên áp dụng 1 biện pháp tránh thai phụ cho đến hết 14 ngày sau khi ngừng ói mửa hoặc tiêu chảy.',
						preserve: 'Nơi khô, tránh ánh sáng, nhiệt độ dưới 30°C.',
						category: cate13 || undefined, // Thuốc ngừa thai
						trademark: brand29 || undefined, // Ba Đình
						origin: origin1 || undefined, // Việt Nam
						images: [P18119_1],
					},
					options: {
						transaction: true,
					},
				}); // Pro Avalo 47

				// Cate1 / 9 / 14: Dược phẩm / Thuốc không kê đơn / Thuốc cảm lạnh
				const P16412_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://www.khapharco.com/uploads/product/Hohap/acetylcystein.jpg',
						publicId: 'P16412_1_l',
						fileName: 'P16412_1_l.jpg',
						description: 'Acetylcystein',
						width: 320,
						height: 320,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P16412',
						name: 'Acetylcystein',
						description:
							'Acetylcystein là thuốc được sử dụng khá phổ biến để điều trị ho có đờm và được mua dễ dàng, không cần đơn thuốc ở các nhà thuốc với rất nhiều biệt dược khác nhau, nhiều dạng dùng khác nhau thích hợp với các đối tượng từ trẻ em đến người lớn. Tuy nhiên, không vì thế mà có thể lạm dụng thuốc.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 65000,
						element: 'Acetylcystein 200mg',
						uses: 'Tiêu chất nhầy trong bệnh nhầy nhớt, bệnh lý hô hấp có đờm nhầy quánh như trong viêm phế quản cấp và mạn tính và làm sạch thường quy trong mở khí quản.',
						subject:
							'Tiêu chất nhầy trong bệnh nhầy nhớt, bệnh lý hô hấp có đờm nhầy quánh như trong viêm phế quản cấp và mạn tính và làm sạch thường quy trong mở khí quản.',
						guide:
							'Hoà tan Acetylcystein 200mg thuốc bột uống với nước trước khi uống.',
						preserve: 'Nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand3 || undefined, // Khánh Hòa
						origin: origin1 || undefined, // Việt Nam
						images: [P16412_1],
					},
					options: {
						transaction: true,
					},
				}); // Acetylcystein 48

				const P17480_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://thuoctaytot.com/images/medicine/thumb/acetylcystein-boston-200-hop-30-goi.jpg',
						publicId: 'P17480_1_l',
						fileName: 'P17480_1_l.jpg',
						description: 'AcetylCystein Boston 200',
						width: 300,
						height: 300,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P17480',
						name: 'AcetylCystein Boston 200',
						description:
							'Acetylcystein là thuốc được sử dụng khá phổ biến để điều trị ho có đờm và được mua dễ dàng, không cần đơn thuốc ở các nhà thuốc với rất nhiều biệt dược khác nhau, nhiều dạng dùng khác nhau thích hợp với các đối tượng từ trẻ em đến người lớn. Tuy nhiên, không vì thế mà có thể lạm dụng thuốc.',
						packingSpec: 'Hộp 30 gói x 1g',
						unit: 'Hộp',
						price: 55000,
						element:
							'Mỗi gói 1g có chứa:\n' +
							'Hoạt chất: Acetylcystein 200mg\n' +
							'Tá dược: Lactose monohydrat, aspartam, acid ascorbic, màu vàng số 6 lake, mùi cam, silicon dioxid.',
						uses: 'Điều trị rối loạn tiết dịch phế quản (đờm)',
						subject: 'Người lớn và trẻ em từ 2 tuổi trở lên',
						guide:
							'Dùng bằng đường uống. Hoà tan thuốc trong khoảng 100ml nước.',
						preserve: 'Nơi khô, dưới 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand2 || undefined, // Boston
						origin: origin1 || undefined, // Việt Nam
						images: [P17480_1],
					},
					options: {
						transaction: true,
					},
				}); // AcetylCystein Boston 200 49

				const [P18113_1, P18113_2, P18113_3] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p18113_1_l-0433.jpg',
							publicId: 'P18113_1_l',
							fileName: 'P18113_1_l.jpg',
							description: 'Becacold-E',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181132l-4066.jpg',
							publicId: 'P18113_2_l',
							fileName: 'P18113_2_l.jpg',
							description: 'Becacold-E',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://vn-test-11.slatic.net/p/716e6f2073a8300dec7905b960780883.jpg',
							publicId: 'P18113_3_l',
							fileName: 'P18113_3_l.jpg',
							description: 'Becacold-E',
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
						code: 'P18113',
						name: 'Becacold-E',
						description:
							'Becacold-E (acetaminophen 500mg, cafein 25mg, phenylephrin HCl 5mg) là thuốc điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm và các rối loạn của đường hô hấp trên.',
						packingSpec: 'Hộp 5 vỉ x 20 viên',
						unit: 'Hộp',
						price: 95000,
						element:
							'Acetaminophen 500mg, Cafein 25mg, Phenylephrin HCl 5mg\n' +
							'Tá dược: Tinh bột, PVP K30, Natri starch glycolat, Màu Green mint, Màu vàng Tartrazin.',
						uses: 'điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm và các rối loạn của đường hô hấp trên.',
						subject: 'Trẻ em trên 11 tuổi, người lớn',
						guide:
							'Theo chỉ định của bác sĩ. Liều thông thường:\n' +
							'- Người lớn: 1-2 viên/lần, 3-4 lần/ngày.\n' +
							'- Trẻ dưới 11 tuổi: Không khuyến cáo.',
						preserve:
							'Trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand5 || undefined, // ENLIE
						origin: origin1 || undefined, // Việt Nam
						images: [P18113_1, P18113_2, P18113_3],
					},
					options: {
						transaction: true,
					},
				}); // Becacold-E 50

				const brand30 = await this.brandRepository.createOne({
					data: {
						name: 'Becamex',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Becamex 30
				const [P18112_1, P18112_2, P18112_3, P18112_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p18112_1_l-6920.jpg',
							publicId: 'P18112_1_l',
							fileName: 'P18112_1_l.jpg',
							description: 'Becacold-S',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181122l-7190.jpg',
							publicId: 'P18112_2_l',
							fileName: 'P18112_2_l.jpg',
							description: 'Becacold-S',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181123l-9641.jpg',
							publicId: 'P18112_3_l',
							fileName: 'P18112_3_l.jpg',
							description: 'Becacold-S',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p181124l-7817.jpg',
							publicId: 'P18112_4_l',
							fileName: 'P18112_4_l.jpg',
							description: 'Becacold-S',
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
						code: 'P18112',
						name: 'Becacold-S',
						description:
							'Becacold-S (acetaminophen 500mg, clorpheniramin maleat 2mg, phenylephrin HCl 10mg) là thuốc dùng trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm và các rối loạn của đường hô hấp trên.',
						packingSpec: 'Hộp 5 vỉ x 20 viên',
						unit: 'Hộp',
						price: 100000,
						element:
							'Hoạt chất: Paracetamol 500mg, Phenylephrin HCl 10mg, Clorpheniramin maleat 2mg.',
						uses: 'Điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, ...',
						subject: 'Người lớn, trẻ em trên 11 tuổi.',
						guide:
							'Theo chỉ định của bác sĩ. Liều thông thường:\n' +
							'- Người lớn: 1-2 viên/lần, 3-4 lần/ngày\n' +
							'- Trẻ 7-12 tuổi: 2-1 viên/lần, 3-4 lần/ngày\n' +
							'- Trẻ 2-6 tuổi: V2 viên/lần, 3-4 lần/ngày',
						preserve: 'Nhiệt độ dưới 30 độ C, tránh ẩm và ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand30 || undefined, // Becamex
						origin: origin1 || undefined, // Việt Nam
						images: [P18112_1, P18112_2, P18112_3, P18112_4],
					},
					options: {
						transaction: true,
					},
				}); // Becacold-S 51

				const brand31 = await this.brandRepository.createOne({
					data: {
						name: 'Công Ty Cổ Phần Dược Phẩm Trung Ương 3',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Công Ty Cổ Phần Dược Phẩm Trung Ương 3 31
				const P14411_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://sixmd.com/wp-content/uploads/2021/02/Bo-Phe-TW3.jpeg',
						publicId: 'P14411_1_l',
						fileName: 'P14411_1_l.jpeg',
						description: 'Bổ phế TW 3',
						width: 900,
						height: 900,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P14411',
						name: 'Bổ phế TW 3',
						description:
							'Bổ Phế TW3 Chỉ Khái Lộ Foripharm 125 ml là sản phẩm của Công ty Cổ phần Dược phẩm Trung ương 3, có thành phần chiết xuất từ dược liệu. Bổ Phế TW3 Chỉ Khái Lộ Foripharm 125 ml được dùng để chữa ho, tiêu đờm, chuyên trị ho cảm, ho gió, ho khan, viêm họng, viêm phế quản.',
						packingSpec: 'Hộp 125ml',
						unit: 'Chai',
						price: 31000,
						element:
							'Bách bộ, Tỳ bà diệp, Cát cánh, Bán hạ (Thân, Rễ), Tang bạch bì, Bạc hà, Mơ muối, Thiên môn đông, Bạch linh, Ma hoàng, Phèn chua, Tinh dầu bạc hà, Cam thảo\n' +
							'Tá dược: Đường trắng, Methylparaben,Propylparaben,  Ethanol 96%, nước tinh khiết  vđ 125 ml',
						uses: 'Điều trị Chữa ho, tiêu đờm, chuyên trị ho cám, ho gió, ho khan, viêm họng, viêm phế quản...',
						subject: 'Người lớn/ trẻ em trên 3 tuổi.',
						guide:
							'- Ngày uống 3 lần.\n' +
							'- Người lớn và trẻ em trên 10 tuổi : 15 - 20 ml/lần.\n' +
							'- Trẻ em\n' +
							'+ Từ 3 - 6 tuổi: 5 - 7,5 ml/lần.\n' +
							'+ Trên 6 - 10 tuổi: 10 - 15 ml/lần.\n' +
							'- Đợt dùng từ 7 - 10 ngày.',
						preserve:
							'Trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand31 || undefined, // Công Ty Cổ Phần Dược Phẩm Trung Ương 3
						origin: origin1 || undefined, // Việt Nam
						images: [P14411_1],
					},
					options: {
						transaction: true,
					},
				}); // Bổ phế TW 3 52

				const brand32 = await this.brandRepository.createOne({
					data: {
						name: 'Dược Hậu Giang',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Dược Hậu Giang 32
				const [P00017_1, P00017_2, P00017_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://chothuoctay.com/75315-large_default/coldacmin-flu-thuoc-tri-cam-sot-so-mui-nhuc-dau.jpg',
							publicId: 'P00017_1_l',
							fileName: 'P00017_1_l.jpg',
							description: 'Coldacmin Flu',
							width: 800,
							height: 850,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoclongchau.com/images/product/2021/05/00020489-coldamin-flu-100v-dhg-9527-6095_large.png',
							publicId: 'P00017_2_l',
							fileName: 'P00017_2_l.png',
							description: 'Coldacmin Flu',
							width: 600,
							height: 600,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://static.salekit.com/image/shop/3180/products/1575104200-thuocbaty.jpg',
							publicId: 'P00017_4_l',
							fileName: 'P00017_4_l.jpg',
							description: 'Coldacmin Flu',
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
						code: 'P00017',
						name: 'Coldacmin Flu',
						description:
							'Thuốc Coldacmin Flu trên thị trường được ưa chuộng sử dụng rất nhiều do giá cả phải chăng và tác dụng rất hiệu quả trong việc giảm đau, hạ sốt.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 33000,
						element:
							'Paracetamol 325mg\n' +
							'Clorpheniramin maleat 2mg\n' +
							'Tá dược vừa đủ 1 viên (Tinh bột mì, PVA, đường trắng, màu đỏ erythrosin, màu vàng tartrazin)',
						uses: 'Điều trị triệu chứng cảm sốt, đau nhức kèm viêm mũi, viêm xoang…',
						subject: 'Người lớn và trẻ em từ 6 tuổi trở lên.',
						guide:
							'Cách mỗi 4 - 6 giờ uống 1 lần.\n' +
							'Người lớn và trẻ em trên 12 tuổi: uống 1 - 2 viên/ lần.\n' +
							'Trẻ em từ 6 -12 tuổi: uống nửa liều người lớn.\n' +
							'Hoặc theo chỉ dẫn của Thầy thuốc.',
						preserve: 'Nơi khô, nhiệt độ không quá 30 độ C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand32 || undefined, // Dược Hậu Giang
						origin: origin1 || undefined, // Việt Nam
						images: [P00017_1, P00017_2, P00017_4],
					},
					options: {
						transaction: true,
					},
				}); // Coldacmin Flu 53

				const brand33 = await this.brandRepository.createOne({
					data: {
						name: 'Dược Phẩm CPC1',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Dược Phẩm CPC1 33
				const [P16787_1, P16787_2, P16787_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p16787_1_l-3911.jpg',
							publicId: 'P16787_1_l',
							fileName: 'P16787_1_l.jpg',
							description: 'Cynamus CPC1',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p167872l-4745.jpg',
							publicId: 'P16787_2_l',
							fileName: 'P16787_2_l.jpg',
							description: 'Cynamus CPC1',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p167874l-4497.jpg',
							publicId: 'P16787_4_l',
							fileName: 'P16787_4_l.jpg',
							description: 'Cynamus CPC1',
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
						code: 'P16787',
						name: 'Cynamus CPC1',
						description:
							'Thuốc Cynamus được chỉ định điều trị các trường hợp như ho có đờm, tăng tiết nhầy nhớt trong các bệnh lý đường hô hấp như viêm phế quản cấp và mạn tính, hen phế quản, bệnh phổi tắc nghẽn mãn tính.',
						packingSpec: 'Hộp 4 vỉ x 5 ống',
						unit: 'Hộp',
						price: 66000,
						element:
							'Mỗi ống 5ml chứa\n' +
							'- Hoạt chất: Carbocistein 125mg\n' +
							'- Tá dược: Propyl paraben, methyl paraben, natri dihydrophosphat monohydrat, dinatri hydrophosphat, natri hydroxid, sorbitol, glycerin, sucralose, gôm xanhthan, hương cam, nước tinh khiết.',
						uses: 'Chỉ định trong các trường hợp: Ho có đờm, tăng tiết nhiều đờm và nhầy nhớt như trong viêm phế quản cấp và mạn tính, hen phế quản và giãn phế quản.',
						subject: 'Người lớn và trẻ em trên 2 tuổi.',
						guide: 'Thuốc Cynamus được dùng đường uống.',
						preserve:
							'Trong bao bì kín, tránh ẩm, tránh ánh sáng, nhiệt độ dưới 30ºC.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand33 || undefined, // DP Trung uong CPC1
						origin: origin1 || undefined, // Việt Nam
						images: [P16787_1, P16787_2, P16787_4],
					},
					options: {
						transaction: true,
					},
				}); // Cynamus CPC1 54

				const P16181_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuocdaiduong.com/wp-content/uploads/2021/11/dismolan-1.jpg',
						publicId: 'P16181_1_l',
						fileName: 'P16181_1_l.jpg',
						description: 'Dismolan 200mg CPC1',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P16181',
						name: 'Dismolan 200mg CPC1',
						description:
							'Dismolan của Công ty cổ phần dược phẩm CPC1 Hà Nội, thành phần chính là acetylcystein. Thuốc có tác dụng làm thuốc tiêu chất nhầy trong bệnh nhầy nhớt (mucoviscidosis) (xơ nang tuyến tụy), bệnh lý hô hấp có đờm nhầy quánh như trong viêm phế quản cấp và mạn, và làm sạch thường quy trong mở khí quản; được dùng làm thuốc giải độc trong quá liều paracetamol.',
						packingSpec: 'Hộp 4 vỉ x 5 ống nhựa 200ml/10ml',
						unit: 'Hộp',
						price: 82000,
						element:
							'- Hoạt chất: Acetylcystein 200mg\n' +
							'- Tá dược: Sucrose, glycerin, natri edetat, dinatri hydrophosphat, kali dihydrophosphat, sucralose, hương táo, methyl paraben, propyl paraben, FD&C Green 3, nước tinh khiết.',
						uses: 'Dùng làm thuốc tiêu chất nhầy trong bệnh lý viêm phế quản cấp và mạn, thuốc giải độc khi quá liều paracetamol',
						subject: 'Người lớn/ trẻ em trên 2 tuổi.',
						guide:
							'Dismolan được dùng bằng đường uống. Bẻ ống nhựa và uống trực tiếp dung dịch trong ống.',
						preserve:
							'Bảo quản trong bao bì kín, tránh ẩm, tránh ánh sáng, nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand33 || undefined, // Dược Phẩm CPC1
						origin: origin1 || undefined, // Việt Nam
						images: [P16181_1],
					},
					options: {
						transaction: true,
					},
				}); // Dismolan 200mg CPC1 55

				const brand34 = await this.brandRepository.createOne({
					data: {
						name: 'Dược phẩm Trường Tín',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Dược phẩm Trường Tín 34
				const P00746_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.famitaa.com/uploads/noidung/siro-tri-ho-eugica-60ml-0.jpg',
						publicId: 'P00746_1_l',
						fileName: 'P00746_1_l.jpg',
						description: 'Eugica Sirô',
						width: 500,
						height: 500,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00746',
						name: 'Eugica Sirô',
						description:
							'Eugica 100Ml được sản xuất bởi Công ty Cổ phần Dược Hậu Giang thành phần chính gồm sirô húng chanh, eucalyptol, cồn bọ mắm, cao lỏng núc nác, sirô viễn chí, sirô vỏ quýt, sirô an tức hương, natri benzoat; là thuốc giảm ho được sử dụng để điều trị các trường hợp ho có đờm, ho mất tiếng, ho kinh niên, viêm đau họng, viêm khí quản, phế quản, sổ mũi; làm loãng dịch nhầy đường hô hấp, long đờm.',
						packingSpec: 'Hộp 1 chai 100ml',
						unit: 'Hộp',
						price: 38000,
						element:
							'Mỗi chai 100ml chứa:\n' +
							'Hoạt chất: Cồn bọ mắm (Tinct. Pouzolzia zeylanica) 2g, Cao lỏng núc nác (Ext. Oroxylum indicum) 2g, Siro viễn chí (Syr. Polygalo tenuifolia) 10g, Siro vỏ quýt (Syr. Citrus deliciosa) 30g, Siro an tức hương (Syr. Styrax tonkinense) 20g, Siro húng chanh (Syr. Coleus oromaticus) 42.5g, Eucalyptol 0.2g, Natri benzoat 3g.\n' +
							'Tá dược: Acid citric monohydrat, cremophor RH40, tinh dầu lựu, đường sunett, nước tinh khiết vừa đủ 100ml.',
						uses: 'Điều trị ho',
						subject: 'Trẻ em trên 30 tháng tuổi.',
						guide:
							'Trẻ em từ 30 tháng tuổi đến 6 tuổi: uống 5 -10ml (1 - 2 muỗng cà phê hoặc ½ -1 ống) x 3 lần/ngày.\n' +
							'Trẻ em trên 6 tuổi: uống 15ml (1 muỗng canh hoặc 1½ ống) x 3 lần/ngày.\n' +
							'Hoặc theo chỉ dẫn của Thầy thuốc.',
						preserve:
							'Đóng nắp kín và bảo quản sản phẩm nơi khô mát với nhiệt độ không quá 30ºC.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand34 || undefined, // Dược phẩm Trường Tín
						origin: origin1 || undefined, // Việt Nam
						images: [P00746_1],
					},
					options: {
						transaction: true,
					},
				}); // Eugica Sirô 55

				const origin10 = await this.originRepository.createOne({
					data: {
						name: 'Hungary',
					},
					options: {
						transaction: true,
					},
				}); // Hungary 10
				const brand35 = await this.brandRepository.createOne({
					data: {
						name: 'Egis Pharma',
						origin: origin10 || undefined, // Hungary
					},
					options: {
						transaction: true,
					},
				}); // Egis Pharma 35
				const P13200_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/upload/sanpham/p13200_1_l-9876.jpg',
						publicId: 'P13200_1_l',
						fileName: 'P13200_1_l.jpg',
						description: 'Halixol',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P13200',
						name: 'Halixol',
						description:
							'Người bệnh viêm đường hô hấp cấp tính và mãn tính như viêm phế quản, hen phế quản thường có biểu hiện tăng tiết đờm nhớt, từ đó có thể gây tắc nghẽn đường thở. Khi đó bác sĩ thường chỉ định bệnh nhân sử dụng các thuốc long đờm, một trong số đó là thuốc uống Halixol.',
						packingSpec: 'Hộp 2 vỉ x 10 viên',
						unit: 'Hộp',
						price: 24000,
						element:
							'- Hoạt chất: Ambroxol 30mg\n' +
							'- Tá dược: Lactose monohydrate, microcrystaline cellulose, povidone K-30. sodium starch glycolate, magnesium stearate.',
						uses: 'Điều trị các bệnh tắc nghẽn đường hô hấp cấp tính và mạn tính như hen phế quản và viêm phế quản...',
						subject:
							'- Điều trị các bệnh tắc nghẽn đường hô hấp cấp tính và mạn tính như hen phế quản và viêm phế quản, giãn phế quản do sản sinh quá nhiều nhầy và đàm.\n' +
							'- Tăng cường hòa tan dịch nhầy trong các bệnh viêm mũi – họng.',
						guide:
							'- Thuốc dùng đường uống.\n' +
							'- Nên uống thuốc với nhiều nước sau khi ăn. Uống nhiều nước trong khi điều trị sẽ giúp tăng tác dụng hòa tan dịch nhầy của ambroxol.',
						preserve: 'Bảo quản tránh ánh sáng, nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand35 || undefined, // Egis Pharma
						origin: origin10 || undefined, // Hungary
						images: [P13200_1],
					},
					options: {
						transaction: true,
					},
				}); // Halixol 56

				const P11236_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/thuoc-ba-ty_eb30a38f676643f19a530c11489571f5_grande.jpg',
						publicId: 'P11236_1_l',
						fileName: 'P11236_1_l.jpg',
						description: 'Molitoux 50mg',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11236',
						name: 'Molitoux 50mg',
						description:
							'Molitoux 50 của công ty Cổ phần xuất nhập khẩu Y tế Domesco, thành phần chính eprazinon dihydrochlorid 50 mg, là thuốc dùng làm loãng đờm, long đờm để chữa ho, làm dễ thở. Molitoux 50 được bào chế dưới dạng viên nén bao phim.',
						packingSpec: 'Hộp 2 vỉ x 15 viên',
						unit: 'Hộp',
						price: 36000,
						element:
							'Mỗi viên nén bao phim chứa\n' +
							'Hoạt chất: Eprazinon dihydrochlorid 50mg.\n' +
							'Tá dược: Lactose khan, Avicel, Sodium starch glycolat, Talc, Magnesi stearat, Aerosil, Hydroxypropylmethyl cellulose 15cP, Hydroxypropylmethyl cellulose 6cP, Polyethylen glycol 6000,Talc, Titan dioxyd, màu Erythrosin lake.',
						uses: 'Điều trị viêm phế quản',
						subject: 'Nguời lớn',
						guide:
							'Dùng uống\n' +
							'Người lớn 3 - 6 viên/ngày, chia 3 lẩn.\n' +
							'Thời gian điều trị: không quá 5 ngày trừ khi có chỉ định của Bác sĩ.',
						preserve:
							'Bảo quản nơi khô mát, dưới 30 độ C, tránh ánh sáng trực tiếp.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand12 || undefined, // Domesco
						origin: origin1 || undefined, // Việt Nam
						images: [P11236_1],
					},
					options: {
						transaction: true,
					},
				}); // Molitoux 50mg 57

				const P19446_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://static.wixstatic.com/media/830e1e_f77e3f001baf4d7fb234d63d280a8528~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85/830e1e_f77e3f001baf4d7fb234d63d280a8528~mv2.jpg',
						publicId: 'P19446_1_l',
						fileName: 'P19446_1_l.jpg',
						description: 'Muspect 30 Imexpharm',
						width: 640,
						height: 640,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P17309',
						name: 'Muspect 30 Imexpharm',
						description:
							'Muspect chứa thành phần chính là Ambroxol là một chất chuyển hoá của Bromhexin, có tác dụng và công dụng như Bromhexin. Ambroxol được coi như có tác dụng long đờm và làm tiêu chất nhầy nhưng chưa được chứng minh đầy đủ. ',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 12500,
						element:
							'Mỗi viên nén chứa:\n' +
							'- Ambroxol HCl 30mg\n' +
							'- Tá dược: Cellulose vi tinh thể, Lactose monohydrat, Tinh bột mì, Povidon, Natri starch glycolat, Magnesi stearat, Colloidal anhydrous silica.',
						uses: 'Giúp tiêu chất nhầy đường hô hấp dùng điều trị các bệnh cấp và mạn tính ở đường hô hấp có kèm tăng tiết dịch phế quản,...',
						subject:
							'- Thuốc giúp tiêu chất nhầy đường hô hấp dùng điều trị các bệnh cấp và mạn tính ở đường hô hấp có kèm tăng tiết dịch phế quản, đặc biệt trong đợt cấp của viêm phế quản mạn, hen phế quản, viêm phế quản dạng hen.\n' +
							'- Phòng các biến chứng ở phổi cho các bệnh nhân sau mổ và cấp cứu.',
						guide:
							'- Uống sau khi ăn.\n' +
							'- Người lớn và trẻ em trên 10 tuổi: 30 mg/ lần, 3 lần/ ngày.\n' +
							'- Trẻ em 5 - 10 tuổi: 15 mg/ lần, 3 lần/ ngày.\n' +
							'- Điều trị kéo dài có thể giảm xuống 2 lần/ ngày.',
						preserve: 'Nơi khô ráo, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand16 || undefined, // Imexpharm
						origin: origin1 || undefined, // Việt Nam
						images: [P19446_1],
					},
					options: {
						transaction: true,
					},
				}); // Muspect 30 Imexpharm 58

				const brand36 = await this.brandRepository.createOne({
					data: {
						name: 'Bảo Thanh',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Bảo Thanh 36
				const P11034_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://duocare.vn/wp-content/uploads/2020/08/P11034_1_l.jpg',
						publicId: 'P11034_1_l',
						fileName: 'P11034_1_l.jpg',
						description: 'Siro Bảo Thanh',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11034',
						name: 'Siro Bảo Thanh',
						description:
							'Thuốc ho Bảo Thanh 125ml là sản phẩm của Dược phẩm Hoa Linh, thành phần chính chứa dịch chiết (5:1) của Xuyên bối mẫu 0,08 ml tương đương Xuyên bối mẫu (Bulbus Fritillariae) 0,4 g; cao lỏng (1,2:1) của hỗn hợp dược liệu 2,125ml, là thuốc dùng để bổ phế, trừ ho, hóa đờm.',
						packingSpec: 'Hộp 1 chai 90ml',
						unit: 'Hộp',
						price: 42000,
						element:
							'Cho 5ml\n' +
							'- Dịch chiết (5:1) của Xuyên bối mẫu: 0,08ml tương đương: Xuyên bối mẫu (Bulbus Fritillariae): 0,4g.\n' +
							'- Cao lỏng (1,2:1) của hỗn hợp dược liệu: 2,125ml {tương đương: Tỳ bà diệp (Folium Eriobotryae japonicae) 0,5g; Sa sâm (Radix Glehniae) 0,1g; Phục linh (Poria) 0.1g: Trần bì (Pericarpium Citri reticulatae perenne) 0,1 g; Cát cánh (Radix Platicodi grandiflori) 0,4g; Bán hạ (Rhizoma pinelliae) 0,1g; Ngũ vị tử (Fructus Schisandrae) 0,05g: Qua lâu nhân (Semen Trichosan - this) 0,2g; Viễn chí (Radix Polyqalae) 0,1g; Khổ hạnh nhân (Semen Armeniacae amarum) 0,2g; Gừng (Rhizoma Zingiberis) 0,1g; Ô mai (Fructus Mume praeparatus) 0,5g: Cam thảo (Radix Glycyrrhizae) 0,1g}.\n' +
							'- Tinh dầu bạc hà (Oleum Menthae): 0,1mg\n' +
							'- Mật ong (Mel): 1,0g\n' +
							'- Tá dược (acid benzoic, đường trắng, ethanoi 96°, nước tinh khiết) vừa đủ 5ml.',
						uses: 'Điều trị các chứng ho do cảm lạnh, nhiễm lạnh, ho gió, ho khan...',
						subject: 'Người lớn/ trẻ em',
						guide:
							'- Trẻ em từ 30 tháng tuổi đến 36 tháng tuổi: mỗi lần 5ml (01 thìa cà phê).\n' +
							'- Trẻ em trên 36 tháng tuổi: mỗi lần 10ml (02 thìa cà phê).\n' +
							'- Người lớn: mỗi lần 15ml (01 thìa canh).\n' +
							'* Để dễ uống và phát huy nhanh tác dụng nên pha loãng với nước ấm hoặc nuốt từ từ.',
						preserve:
							'Nơi khô, thoáng, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand36 || undefined, // Bảo Thanh
						origin: origin1 || undefined, // Việt Nam
						images: [P11034_1],
					},
					options: {
						transaction: true,
					},
				}); // Siro Bảo Thanh 59

				const brand37 = await this.brandRepository.createOne({
					data: {
						name: 'OLESOM',
						origin: origin3 || undefined, // Ấn Độ
					},
					options: {
						transaction: true,
					},
				}); // OLESOM 37
				const P15656_4 = await this.imageRepository.createOne({
					data: {
						url: 'https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(80):fill(white)/nhathuoclongchau.com/images/product/2018/05/00010000-olesom-100ml-3394-5b0c_large.JPG',
						publicId: 'P15656__4',
						fileName: 'P15656__4.jpg',
						description: 'Siro điều trị viêm khí phế quản Olesom 100ml',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P15656',
						name: 'Siro điều trị viêm khí phế quản Olesom 100ml',
						description:
							'Siro ho Olesom Gracure điều trị bệnh hô hấp, viêm phế quản (100ml) Công dụng: Thuốc Olesom là sản phẩm được sản xuất bởi Gracure Pharmaceuticals Ltd (Ấn Độ), thuốc có dược chất chính là ambroxol, thuốc được chỉ định long đờm, tiêu chất nhầy trong điều trị bệnh hô hấp.',
						packingSpec: 'Hộp 1 lọ 100ml',
						unit: 'Chai',
						price: 47000,
						element:
							'- Mỗi 5ml chứa Ambroxol Hydrochloride BP 30mg \n' +
							'- Tá dược: Sucrose, Natri Methyl Hydroxybenzoate, Natri Propyl Hydroxybenzoate, Acid Citric Monohydrate, Aspartame, Essence Sweet Orange, phẩm màu Tartrazine Supra, nước tinh khiết. ',
						uses: 'Điều trị bệnh cấp và mãn tính ở đường hô hấp kèm theo khó khạc đờm, viêm phế quản mãn với hội chứng tắc nghẽn, hen phế quản kèm theo khó khạc đờm, bệnh giãn phế quản.',
						subject: 'Người lớn và trẻ em trên 2 tuổi',
						guide:
							'- Người lớn: 5 - 10ml siro: 3 - 4 lần/ngày.\n' +
							'- Trẻ em: 2-6 tuổi: 2.5 - 5ml siro, 3 - 4 lần/ngày.\n' +
							'- Trẻ từ 6 - 12 tuổi: 5ml siro, 3 - 4 lần/ngày',
						preserve:
							'Thuốc ở nơi khô mát, nhiệt độ dưới 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand37 || undefined, // OLESOM
						origin: origin3 || undefined, // Ấn Độ
						images: [P15656_4],
					},
					options: {
						transaction: true,
					},
				}); // Siro điều trị viêm khí phế quản Olesom 100ml 60

				const brand38 = await this.brandRepository.createOne({
					data: {
						name: 'DANAPHA',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // DANAPHA 38
				const [P14745_1, P14745_2, P14745_5] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(80):fill(white)/nhathuoclongchau.com/images/product/2021/03/00021197-danospan-danapha-100ml-1621-6063_large.jpg',
							publicId: 'P14745_1_l',
							fileName: 'P14745_1_l.jpg',
							description: 'Danospan',
							width: 600,
							height: 600,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_de823ed51e4a466489cb6725ae78866b_grande.jpg',
							publicId: 'P14745_2_l',
							fileName: 'P14745_2_l.jpg',
							description: 'Danospan',
							width: 300,
							height: 300,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://whitepharma.vn/wp-content/uploads/2021/07/Danospan-Chai-100ml_5.jpg',
							publicId: 'P14745_5_l',
							fileName: 'P14745_5_l.jpg',
							description: 'Danospan',
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
						code: 'P14745',
						name: 'Danospan',
						description:
							'Danospan Danapha 100 ml là sản phẩm của công ty cổ phần dược Danapha, thành phần chính là cao khô lá thường xuân. Thuốc được dùng điều trị viêm đường hô hấp cấp tính có kèm ho, điều trị triệu chứng trong bệnh lý viêm phế quản mạn tính.',
						packingSpec: 'Hộp 1 chai 100ml',
						unit: 'Hộp',
						price: 59000,
						element:
							'Cao khô lá thường xuân 0,7g tương ứng với 4,55g lá thường xuân (Folium Hederae)\n' +
							'Tá dược: Kali sorbat, acid citric monohydrat, dung dịch sorbitol 70%, sucralose, xanthan gum, nước tinh khiết vừa đủ 100ml.',
						uses: 'Điều trị viêm đường hô hấp cấp tính có kèm ho, điều trị triệu chứng trong bệnh lý viêm phế quản mạn tính',
						subject: 'Người lớn/trẻ em',
						guide:
							'- Sử dụng dụng cụ đong thuốc đi kèm trong hộp thuốc.\n' +
							'- Lắc kỹ trước mỗi lần sử dụng.',
						preserve:
							'Trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand38 || undefined, // DANAPHA
						origin: origin1 || undefined, // Việt Nam
						images: [P14745_1, P14745_2, P14745_5],
					},
					options: {
						transaction: true,
					},
				}); // Danospan 61

				const brand39 = await this.brandRepository.createOne({
					data: {
						name: 'Sagopha',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Sagopha 39
				const P00064_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://chothuoctay.com/81614-large_default/pectol-e-siro-tri-ho-cho-tre.jpg',
						publicId: 'P00064_1_l',
						fileName: 'P00064_1_l.jpg',
						description: 'Pectol-E',
						width: 800,
						height: 850,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00064',
						name: 'Pectol-E',
						description:
							'Thuốc Pactol là thuốc của công ty TNHH Dược phẩm Sài Gòn (SAGOPHA), thành phần chiết xuất tự nhiên. Pectol - E® được dùng để điều trị viêm phế quản, ho, cảm, sổ mũi.',
						packingSpec: 'Hộp 1 chai 90ml',
						unit: 'Hộp',
						price: 39000,
						element:
							'Cồn Bọ mắm 1,1:1 (tương ứng với 1,98g Bọ mắm (Herba Pouzolziae zeylanicae)) 1,8g; Eucalyptol 0,18g; Natri benzoat (toàn phần) 2,7g; Cao Núc nác 1,1:1 (tương ứng với 1,98g Núc nác (Cortex Oroxyli)); Dịch chiết Viễn chí 0,3:1 (tương ứng với 0,54g Viễn chí (Radix Polygalae)) 1,8g; Dịch chiết Trần bì 0,1944:1 (tương ứng với 2,8343g Trần bì (Pericarpium Citri reticulatae perenne)) 1,8g; Dịch chiết An tức hương 0,0175:1 (tương ứng với 0,18g An tức hương (Benzoinum)) 10,26g; Dịch chiết Húng chanh 2,778:1 (tương ứng với 45g Húng chanh (Folium Plectranthi amboinici)) 16,2g; Đường trắng 72,72g; Nước tinh khiết vừa đủ 90ml',
						uses: 'Điều trị ho cảm, viêm phế quản cho trẻ em,…',
						subject: 'Trẻ em',
						guide: 'Dùng đường uống.',
						preserve:
							'Trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand39 || undefined, // Sagopha
						origin: origin1 || undefined, // Việt Nam
						images: [P00064_1],
					},
					options: {
						transaction: true,
					},
				}); // Pectol-E 62

				const P00579_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://alphabetpharma.com.vn/image/cache/catalog/alphabet-pharma/73-800x800.jpg',
						publicId: 'P00579_1_l',
						fileName: 'P00579_1_l.jpg',
						description: 'HoAstex',
						width: 800,
						height: 800,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00579',
						name: 'HoAstex',
						description:
							'Thuốc ho Astex là loại dược phẩm được sử dụng nhằm điều trị các bệnh viêm đường hô hấp như ho, viêm khí quản, viêm phế quản. Để đảm bảo hiệu quả điều trị và tránh được các tác dụng phụ, người bệnh cần sử dụng thuốc theo đúng chỉ dẫn của bác sĩ, dược sĩ chuyên môn.',
						packingSpec: 'Hộp 1 chai 90ml',
						unit: 'Hộp',
						price: 38000,
						element:
							'- Hoạt chất: Húng chanh (Folium Plectranthi amboinici) 45.00g, Núc nác (Cortex Oroxyli) 11.25g, Cineol (Cineolum) 83.70mg.\n' +
							'- Tá dược: đường trắng, natri benzoat, polysorbat 80 vừa đủ 90ml.',
						uses: 'Trị ho. Giảm ho trong viêm họng, viêm phế quản, viêm khí quản',
						subject: 'Người lớn và trẻ em',
						guide:
							'Thuốc ho Astex được sử dụng bằng đường uống với liều lượng khác nhau tùy thuộc vào độ tuổi',
						preserve: 'Nơi khô mát, nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand28 || undefined, // OPC
						origin: origin1 || undefined, // Việt Nam
						images: [P00579_1],
					},
					options: {
						transaction: true,
					},
				}); // HoAstex 63

				const P17246_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoclongchau.com/images/product/2021/04/00022004-stacytine-200mg-cap-stada-10x10-1019-6066_large.jpg',
						publicId: 'P17246_1_l',
						fileName: 'P17246_1_l.jpg',
						description: 'Stacytine 200 CAP',
						width: 1000,
						height: 1000,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P17246',
						name: 'Stacytine 200 CAP',
						description:
							'Thuốc Stacytine 200 CAP của Công ty TNHH Liên Doanh STELLAPHARM, có hoạt chất chính là Acetylcysteine. Thuốc Stacytine 200 CAP được dùng làm thuốc tiêu nhầy trong viêm phế quản cấp và mạn tính. Ngoài ra, Stacytine 200 CAP còn được dùng như một chất giải độc trong điều trị quá liều paracetamol.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 75000,
						element:
							'- Hoạt chất: Acetylcysteine 200mg.\n' +
							'- Tá dược: Lactose monohydrat, tinh bột mì, talc, magnesi stearat.',
						uses: 'Acetylcysteine được dùng làm thuốc tiêu chất nhầy trong điều trị bổ sung đối với bệnh nhân có đờm đặc quánh trong viêm phế quản cấp và mạn tính…',
						subject: 'Trên 2 tuổi',
						guide: 'Stacytine 200 CAP được dùng bằng đường uống.',
						preserve:
							'Bảo quản trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand9 || undefined, // Stella
						origin: origin1 || undefined, // Việt Nam
						images: [P17246_1],
					},
					options: {
						transaction: true,
					},
				}); // Stacytine 200 CAP 64

				const brand40 = await this.brandRepository.createOne({
					data: {
						name: 'Hoa Linh',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Hoa Linh 40
				const P00650_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.nhathuocsuckhoe.com/unsafe/0x0/left/top/smart/filters:quality(350)/https://nhathuocsuckhoe.com/upload/news/content/2020/11/6-thuoc-ho-bao-thanh-jpg-jpg-1605320345-14112020091905.jpg',
						publicId: 'P00650_1_l',
						fileName: 'P00650_1_l.jpg',
						description: 'Bảo Thanh',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00650',
						name: 'Bảo Thanh',
						description:
							'Thuốc bổ phế, trừ ho, hóa đờm Bảo Thanh điều trị các chứng ho do cảm lạnh, nhiễm lạnh, ho gió, ho khan, ho có đờm, ho do dị ứng thời tiết. Người bị phế âm hư gây ho dai dẳng lâu ngày, miệng họng khô, cổ họng ngứa, nóng rát, khản tiếng. Hỗ trợ điều trị viêm phổi, viêm họng, viêm phế quản.',
						packingSpec: 'Hộp 1 chai 125ml',
						unit: 'Chai',
						price: 55000,
						element:
							'- Cho 5ml: Dịch chiết (5:1) của Xuyên bối mẫu: 0,08 ml tương đương: Xuyên bối mẫu (Bulbus Fritillariae): 0,4g, Cao lỏng (1,2:1) của hỗn hợp dược liệu: 2,125ml {tương đương: Tỳ bà diệp (Folium Eriobotryae japonicae) 0,5g; Sa sâm (Radix Glehniae) 0,1g; Phục linh (Poria) 0.1g: Trần bì (Pericarpium Citri reticulatae perenne) 0,1 g; Cát cánh (Radix Platicodi grandiflori) 0,4g; Bán hạ (Rhizoma pinelliae) 0,1g; Ngũ vị tử (Fructus Schisandrae) 0,05 g: Qua lâu nhân (Semen Trichosan - this) 0,2g; Viễn chí (Radix Polyqalae) 0,1 g; Khổ hạnh nhân (Semen Armeniacae amarum) 0,2g; Gừng (Rhizoma Zingiberis) 0,1g; Ô mai (Fructus Mume praeparatus) 0,5g: Cam thảo (Radix Glycyrrhizae) 0,1g}, Tinh dầu bạc hà (Oleum Menthae): 0,1 mg, Mật ong (Mel): 1,0g\n' +
							'- Tá dược (acid benzoic, đường trắng, ethanol 96°, nước tinh khiết) vừa đủ 5ml.',
						uses: 'Điều trị các chứng ho do cảm lạnh, nhiễm lạnh, ho gió, ho khan, ho có đờm, ...',
						subject: 'Trẻ em và người lớn.',
						guide:
							'- Ngày dùng 3 lần.\n' +
							'- Trẻ em từ 30 tháng tuổi đến 36 tháng tuổi: mỗi lần 5 ml (01 thìa cà phê).\n' +
							'- Trẻ em trên 36 tháng tuổi: mỗi lần 10 ml (02 thìa cà phê).\n' +
							'- Người lớn: mỗi lần 15 ml (01 thìa canh).\n' +
							'* Để dễ uống và phát huy nhanh tác dụng nên pha loãng với nước ấm hoặc nuốt từ từ.',
						preserve:
							'Nơi khô, thoáng, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand40 || undefined, // Hoa Linh
						origin: origin1 || undefined, // Việt Nam
						images: [P00650_1],
					},
					options: {
						transaction: true,
					},
				}); // Bảo Thanh 65

				const P00047_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.famitaa.com/uploads/noidung/thuoc-duong-ho-hap-acemuc-100-mg_00602.jpg',
						publicId: 'P00047_1_l',
						fileName: 'P00047_1_l.jpg',
						description: 'Bảo Thanh',
						width: 700,
						height: 700,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00047',
						name: 'Acemuc Kids 100mg',
						description:
							'Acemuc® của Công ty Cổ phần Sanofi Việt Nam có thành phần hoạt chất chính là acetylcysteine, là thuốc được dùng trong trường hợp long đờm, tiêu nhày, được sử dụng cho cả người lớn và trẻ nhỏ.',
						packingSpec: 'Hộp 30 gói x 0,5g',
						unit: 'Hộp',
						price: 57000,
						element:
							'Cho 1 gói\n' +
							'- Hoạt chất: Acetylcysteine 100mg\n' +
							'- Tá dược vừa đủ: aspartame, hương cam, Yellow color No.6, lactose monohydrate.',
						uses: 'Tiêu chất nhầy trong bệnh hô hấp có đàm nhầy quánh như trong viêm phế quản cấp và mạn tính',
						subject: 'Trẻ em trên 2 tuổi',
						guide:
							'Dùng đường uống. Hòa tan thuốc trong nửa ly nước và uống ngay.',
						preserve: 'Giữ ở nơi khô/ nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand10 || undefined, // Sanofi
						origin: origin1 || undefined, // Việt Nam
						images: [P00047_1],
					},
					options: {
						transaction: true,
					},
				}); // Acemuc Kids 100mg 66

				const brand41 = await this.brandRepository.createOne({
					data: {
						name: 'Đông Dược Phúc Hưng',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Đông Dược Phúc Hưng 41
				const [P13238_1, P13238_2, P13238_4] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://alphabetpharma.com.vn/image/cache/catalog/alphabet-pharma/1009-800x800.jpg',
							publicId: 'P13238_1_l',
							fileName: 'P13238_1_l.jpg',
							description: 'Long Huyết P/H',
							width: 800,
							height: 800,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://tiemthuoc.org/img/uploads/long-huyet-p-h-giup-tan-bam-tim-chua-lanh-vet-thuong-hieu-qua.jpg',
							publicId: 'P13238_2_l',
							fileName: 'P13238_2_l.jpg',
							description: 'Long Huyết P/H',
							width: 500,
							height: 500,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p132384l-5564.jpg',
							publicId: 'P13238_4_l',
							fileName: 'P13238_4_l.jpg',
							description: 'Long Huyết P/H',
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
						code: 'P13238',
						name: 'Long Huyết P/H',
						description:
							'Thuốc Long Huyết P/H của Công ty TNHH Đông dược Phúc Hưng, với thành phần chính cao khô huyết giác (Lignum Dracaenae cambodianae). Long Huyết là phần thân hóa gỗ màu đỏ của cây Dracaenae cambodianae già cỗi, sống hàng trăm năm trên các núi đá. Từ lâu nó đã được biết đến như là vị thuốc quý bí truyền của các võ sư, thầy thuốc dùng đặc trị nội, ngoại thương như: Giảm đau, cầm máu, giúp nhanh liền vết thương do dao kiếm, các chấn thương do va đập mạnh gây bầm dập, tụ máu, sưng đau...',
						packingSpec: 'Hộp 2 vỉ x 12 viên',
						unit: 'Hộp',
						price: 45000,
						element:
							'Hoạt chất: Cao khô Huyết giác (Lignum Dracaenae cambodianae) 280mg (tương đương với 4g dược liệu).\n' +
							'Tá dược: talc vừa đủ 1 viên.',
						uses: 'Điều trị các trường hợp sưng đau, bầm tím, giảm đau, tiêu sưng...',
						subject:
							'- Sưng đau, bầm tím, bong gân, chấn thương do va đập, bị đòn, té ngã, tai nạn lao động, giao thông, luyện tập thể thao. Giúp giảm đau và làm tan nhanh các vết bầm tím.\n' +
							'- Vết thương hở ngoài da như: vết trầy xước, vết cắt sâu do dao kiếm, tai nạn gây ra. Giúp vị trí tổn thương mau khô – tiêu sưng, chống phù nề một cách hiệu quả, nhanh liền sẹo.\n' +
							'- Vết thương do phẫu thuật: Kết hợp sử dụng Long huyết P/H trong quá trình điều trị giúp nhanh phục hồi.\n' +
							'- Trị mụn nhọt, vết loét lâu ngày không khỏi.',
						guide: 'Thuốc Long Huyết P/H dùng uống sau bữa ăn từ 1 - 2 giờ.',
						preserve: 'Nơi khô, nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand41 || undefined, // Đông Dược Phúc Hưng
						origin: origin1 || undefined, // Việt Nam
						images: [P13238_1, P13238_2, P13238_4],
					},
					options: {
						transaction: true,
					},
				}); // Long Huyết P/H 67

				const brand42 = await this.brandRepository.createOne({
					data: {
						name: 'Abbott',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Abbott 42
				const P11920_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://bvnguyentriphuong.com.vn/uploads/images/Thu%E1%BB%91c/thuoc_hexinvon.jpg',
						publicId: 'P11920_1_l',
						fileName: 'P11920_1_l.jpg',
						description: 'Hexinvon 8mg',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11920',
						name: 'Hexinvon 8mg',
						description:
							'Phổi là cơ quan có vai trò thiết yếu trong hệ hô hấp. Khi hệ hô hấp bị tổn thương có thể sử dụng thuốc để điều trị. Một trong những loại thuốc được sử dụng cho bệnh về phổi nên biết đó là Hexinvon 8mg.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 38000,
						element:
							'- Hoạt chất: Bromhexin hydroclorid 8 mg\n' +
							'- Tá dược: Lactose monohydrat 200, tinh bột ngô, tinh bột lúa mì, magnesi stearat.',
						uses: 'Điều trị ho đờm. viêm phế quản...',
						subject:
							'Phân hủy chất tiết trong các bệnh phế quản - phổi liên quan đến sự tiết chất nhầy bất thường như viêm phế quản cấp tính và mạn tính, các bệnh phổi - phế quản mạn tính khác gây thuyên tắc.',
						guide: 'Nên uống thuốc với 1 ly nước, sau bữa ăn.',
						preserve:
							'Bảo quản nơi khô ráo, tránh ánh sáng, nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand42 || undefined, // Abbott
						origin: origin1 || undefined, // Việt Nam
						images: [P11920_1],
					},
					options: {
						transaction: true,
					},
				}); // Hexinvon 8mg 68

				const brand43 = await this.brandRepository.createOne({
					data: {
						name: 'CÔNG TY CỔ PHẦN DƯỢC PHẨM AN THIÊN',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // CÔNG TY CỔ PHẦN DƯỢC PHẨM AN THIÊN 43
				const [P14777_1, P14777_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocgiasi.com/image/6037eb959402e33868c3520c/thumbnailfix.jpg',
							publicId: 'P14777_1_l',
							fileName: 'P14777_1_l.jpg',
							description: 'A.T Ambroxol 30mg',
							width: 500,
							height: 500,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://cdn.medigoapp.com/product/98daf460efa042f0a71b5b1361f8b844.jpg',
							publicId: 'P14777_2_l',
							fileName: 'P14777_2_l.jpg',
							description: 'A.T Ambroxol 30mg',
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
						code: 'P14777',
						name: 'A.T Ambroxol 30mg',
						description:
							'Thuốc At Ambroxol 30 mg An Thiên 30 ống X 5 ml do công ty Cổ phần Dược phẩm An Thiên sản xuất với công dụng thuốc làm loãng chất nhầy (hoặc đàm) và làm tăng thanh thải chất nhầy trong các trường hợp: Điều trị bệnh cấp và mạn tính ở đường hô hấp có kèm tăng tiết dịch phế quản không bình thường và đặc biệt trong đợt cấp của viêm phế quản mạn, hen phế quản, viêm phế quản dạng hen, bệnh nhân sau mổ và cấp cứu để phòng các biến chứng ở phổi.',
						packingSpec: 'Hộp 30 ống x 5ml',
						unit: 'Hộp',
						price: 135000,
						element:
							'Mỗi ống 5ml chứa:\n' +
							'- Hoạt chất: Ambroxol 30mg.\n' +
							'-Tá dược vừa đủ 5ml (Natri carboxymethylcellulose, PEG 6000, Đường sucrose, Acid citric, Sucralose, Methyl paraben, Propyl paraben, Sorbitol 70 %, Hương cam, Màu sunset yellow, Propylen glycol, Nước tinh khiết).',
						uses: 'Thuốc làm loãng chất nhầy (hoặc đàm) và làm tăng thanh thải chất nhầy.',
						subject: 'Người lớn và trẻ em trên 2 tuổi.',
						guide: 'Thuốc At Ambroxol 30 mg được uống với nước sau khi ăn.',
						preserve: 'Nhiệt độ ≤ 30oC, nơi khô ráo, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand43 || undefined, // CÔNG TY CỔ PHẦN DƯỢC PHẨM AN THIÊN
						origin: origin1 || undefined, // Việt Nam
						images: [P14777_1, P14777_2],
					},
					options: {
						transaction: true,
					},
				}); // A.T Ambroxol 30mg 69

				const P16120_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.famitaa.com/uploads/noidung/agi-bromhexine-4-agimexpharm-10-vi-x-10-vien_00702.jpg',
						publicId: 'P16120_1_l',
						fileName: 'P16120_1_l.jpg',
						description: 'Agi-Bromhexine 4mg',
						width: 700,
						height: 700,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P16120',
						name: 'Agi-Bromhexine 4mg',
						description:
							'Thuốc Agi Bromhexine là dung dịch uống có thành phần chính Bromhexin có tác dụng làm loãng dịch tiết và vận chuyển chất tiết ở đường phế quản giúp thuận lợi việc khạc đờm và ho dễ dàng.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 20900,
						element: 'Hoạt chất: Bromhexin hydroclorid 4mg',
						uses: 'Điều trị rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản mạn tính,…',
						subject:
							'- Rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản mạn tính.\n' +
							'- Bromhexin thường được dùng như một chất bổ trợ với kháng sinh, khi bị nhiễm khuấn nặng đường hô hấp.',
						guide:
							'- Người lớn và trẻ em trên 10 tuổi: 2 viên/lần, ngày uống 3 lần.\n' +
							'- Thời gian điều trị không quá 8-10 ngày trừ khi có ý kiến thầy thuốc.',
						preserve:
							'Bảo quản ở nơi khô, tránh ánh sáng, nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand1 || undefined, //  AGIPHARM
						origin: origin1 || undefined, // Việt Nam
						images: [P16120_1],
					},
					options: {
						transaction: true,
					},
				}); // Agi-Bromhexine 4mg 70

				const origin11 = await this.originRepository.createOne({
					data: {
						name: 'Pháp',
					},
					options: {
						transaction: true,
					},
				}); // Pháp 11
				const brand44 = await this.brandRepository.createOne({
					data: {
						name: 'Bouchara Recordati',
						origin: origin11 || undefined, // Pháp
					},
					options: {
						transaction: true,
					},
				}); // Bouchara Recordati 44
				const P00086_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p00086_1_l-9900.jpg',
						publicId: 'P00086_1_l',
						fileName: 'P00086_1_l.jpg',
						description: 'Exomuc 200mg',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00086',
						name: 'Exomuc 200mg',
						description:
							'Viên ngậm kháng khuẩn, giảm ho Strepsils Original đem lại sự dễ chịu, giảm đau họng. Mỗi viên ngậm chứa sự kết hợp 2 chất kháng khuẩn, giúp giảm đau họng thích hợp cho cả trẻ em và người lớn.',
						packingSpec: 'Hộp 30 gói',
						unit: 'Hộp',
						price: 138000,
						element:
							'- Hoạt chất: Acetylcysteine 200mg.\n' +
							'- Tá dược: hương cam S289, aspartame, beta-carotene, sorbital vừa đủ 1 gói 1g.',
						uses: 'Điều trị rối loạn chất tiết phế quản, đặc biệt trong các bệnh phế quản cấp: viêm phế quản cấp và đợt cấp của bệnh phế quản phổi mãn',
						subject:
							'Điều trị rối loạn chất tiết phế quản, đặc biệt trong các bệnh phế quản cấp: viêm phế quản cấp và đợt cấp của bệnh phế quản phổi mãn.',
						guide:
							'Hòa tan cốm trong nửa ly nước trước khi uống, uống trước hoặc sau bữa ăn.',
						preserve: 'Bảo quản ở nhiệt độ dưới 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand44 || undefined, //  Bouchara Recordati
						origin: origin11 || undefined, // Pháp
						images: [P00086_1],
					},
					options: {
						transaction: true,
					},
				}); // Exomuc 200mg 71

				const brand45 = await this.brandRepository.createOne({
					data: {
						name: 'Dược Nature',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Dược Nature 45
				const P11110_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/thuoc-ba-ty_3e73bf7d52b74718859af1baf163019b_grande.jpg',
						publicId: 'P11110_1_l',
						fileName: 'P11110_1_l.jpg',
						description: 'Mecaflu Forte',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11110',
						name: 'Mecaflu Forte',
						description:
							'Thuốc Mecaflu Forte có tác dụng điều trị các chứng ho, đau họng, sổ mũi, cảm cúm. Giúp sát trùng đường hô hấp và làm loãng niêm dịch, dịu ho.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 69000,
						element:
							'Mỗi viên nang mềm chứa: Eucalyptol 100 mg, Tinh dầu tràm 50 mg, Menthol 0,5 mg, Tinh dầu tần 0,36 mg, Tinh dầu gừng 0,75 mg, Tá dược vừa đủ 1 viên.',
						uses:
							'- Điều trị các chứng ho, đau họng, sổ mũi, cảm cúm.\n' +
							'- Sát trùng đường hô hấp.\n' +
							'- Làm loãng niêm dịch, làm dịu ho.',
						subject:
							'- Người lớn: Uống 1 viên/ lần x 3 – 4 lần mỗi ngày.\n' +
							'- Trẻ em trên 30 tháng tuổi: Uống 1 viên/ lần x 2 lần mỗi ngày, hoặc theo chỉ dẫn của bác sĩ.',
						guide: 'Dùng bằng đường uống.',
						preserve:
							'Bảo quản ở khô ráo, nhiệt độ không quá 30 độ C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand45 || undefined, //  Dược Nature
						origin: origin1 || undefined, // Việt Nam
						images: [P11110_1],
					},
					options: {
						transaction: true,
					},
				}); // Mecaflu Forte 72

				const P00252_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.nhathuocsuckhoe.com/unsafe/0x0/left/top/smart/filters:quality(350)/https://nhathuocsuckhoe.com/upload/news/content/2020/11/7-thuoc-ho-eugica-jpg-jpg-1605320353-14112020091913.jpg',
						publicId: 'P00252_1_l',
						fileName: 'P00252_1_l.jpg',
						description: 'Eugica',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00252',
						name: 'Eugica',
						description:
							'Eugica dùng làm điều trị các chứng ho, đau họng, sổ mũi, cảm cúm. Làm loãng niêm dịch, làm dịu ho.',
						packingSpec: 'Hộp 10 vỉ x 10 viên nang mềm',
						unit: 'Hộp',
						price: 70000,
						element:
							'Mỗi viên nang mềm chứa: Eucalyptol 100 mg, Tinh dầu tràm 50 mg, Menthol 0,5 mg, Tinh dầu tần 0,36 mg, Tinh dầu gừng 0,75 mg, Tá dược vừa đủ 1 viên.',
						uses: 'Điều trị các chứng ho, đau họng, sổ mũi, cảm cúm ...',
						subject: 'Người lớn và trẻ em trên 30 tháng tuổi.',
						guide:
							'- Trẻ em trên 30 tháng tuổi: uống 1 viên x 3 lần/ngày.\n' +
							'- Người lớn: uống 2 viên x 3 lần/ngày.\n' +
							'- Hoặc theo chỉ dẫn của bác sĩ.',
						preserve: 'Nơi khô, nhiệt độ không quá 30oC.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand14 || undefined, //  DHG Pharma
						origin: origin1 || undefined, // Việt Nam
						images: [P00252_1],
					},
					options: {
						transaction: true,
					},
				}); // Eugica 73

				const P00389_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.nhathuocsuckhoe.com/unsafe/0x0/left/top/smart/filters:quality(350)/https://nhathuocsuckhoe.com/upload/news/content/2021/02/eugica-fort-dung-dieu-tri-cac-chung-ho-dau-hong-so-mui-cam-cum-jpg-1613795331-20022021112851.jpg',
						publicId: 'P00389_1_l',
						fileName: 'P00389_1_l.jpg',
						description: 'Eugica Fort',
						width: 600,
						height: 600,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00389',
						name: 'Eugica Fort',
						description:
							'Eugica Fort dùng điều trị các chứng ho, đau họng, sổ mũi, cảm cúm. Làm loãng niêm dịch, làm dịu ho. Sát trung đường hô hấp.',
						packingSpec: 'Hộp 10 vỉ x 10 viên nang mềm',
						unit: 'Hộp',
						price: 80000,
						element:
							'- Eucalyptol 100mg, Tinh dầu tràm 50mg, Menthol 0,5mg, Tinh dầu tần 0,36mg, Tinh dầu gừng 0,75mg.\n' +
							'- Tá dược gelatin, glycerin, vanilin, natri benzoat, màu đỏ ponceau.',
						uses: 'Điều trị các chứng ho, đau họng, sổ mũi, cảm cúm.',
						subject: 'Người lớn.',
						guide:
							'- Người lớn: uống 1 viên/lần x 3 - 4 lần/ngày.\n' +
							'- Hoặc theo chỉ dẫn của Thầy thuốc. Đọc kỹ hướng dẫn sử dụng trước khi dùng. Nếu cần thêm thông tin, xin hỏi ý kiến bác sĩ.',
						preserve: 'Nơi khô, nhiệt độ không quá 30oC.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand14 || undefined, //  DHG Pharma
						origin: origin1 || undefined, // Việt Nam
						images: [P00389_1],
					},
					options: {
						transaction: true,
					},
				}); // Eugica Fort 74

				const P02098_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://cdn.medigoapp.com/product/9e056e88c0854359b53174e7feb6ed52.jpg',
						publicId: 'P02098_1_l',
						fileName: 'P02098_1_l.jpg',
						description: 'Tragutan',
						width: 500,
						height: 500,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P02098',
						name: 'Tragutan',
						description:
							'Thuốc Tragutan thường được sử dụng trong điều trị một số tình trạng ho, đau họng.',
						packingSpec: 'Hộp 40 gói x 5ml',
						unit: 'Hộp',
						price: 47000,
						element:
							'- Hoạt chất: Cineol (Eucalyptol) 100mg, Tinh dầu gừng (Oleum Zingiberis) 0,5mg, Tinh dầu Tần (Húng chanh) (Oleum Plectranthi amboinici) 0,18mg.\n' +
							'- Tá dược: Menthol, clorophyl, Dầu đỗ tương, Gelatin, Glycerin, Sorbitol lỏng, nigagin, nipsol, vanilin, ethanol 96%, nước tinh khiết.',
						uses: 'Điều trị các chứng ho do dị ứng hầu họng, át trùng đường hô hấp, làm dịu cơn đau họng.',
						subject:
							'- Sát trùng đường hô hấp, làm dịu cơn đau họng.\n' +
							'- Trị các chứng ho do dị ứng hầu họng.',
						guide:
							'- Người lớn mỗi lần 2 viên, ngày uống 3 lần.\n' +
							'- Trẻ em trên 2 tuổi: mỗi lần 1 viên, ngày uống 2 - 3 lần.',
						preserve: 'Để nơi khô ráo, nhiệt độ 20 - 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand17 || undefined, //  Dược phẩm 3/2
						origin: origin1 || undefined, // Việt Nam
						images: [P02098_1],
					},
					options: {
						transaction: true,
					},
				}); // Tragutan 75

				const brand46 = await this.brandRepository.createOne({
					data: {
						name: 'Tiffy',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Tiffy 46
				const P00424_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://s.elib.vn/images/doc/2020/20201008//thumb/470x246/tiffy-217.jpg',
						publicId: 'P00424_1_l',
						fileName: 'P00424_1_l.jpg',
						description: 'Tiffy Dey',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00424',
						name: 'Tiffy Dey',
						description:
							'Thuốc Tiffy được dùng để làm giảm các triệu chứng cảm thông thường nghẹt mũi, hạ sốt, giảm đau và viêm mũi dị ứng.',
						packingSpec: 'Hộp 25 vỉ x 4 viên',
						unit: 'Hộp',
						price: 110000,
						element:
							'- Hoạt chất:Paracetamol 500mg, Chlorpheniramin maleat 2mg, Phenylephrin HCl 10mg.\n' +
							'- Tá dược:Pregelatinized starch, Povidone K - 90, Natri Starch Glycolate, Magnesi Stearate, Tartrazine dye.',
						uses: 'Làm giảm các triệu chứng cảm thông thường như: nghẹt mũi, sổ mũi, hắt hơi, nhức đầu và sốt.',
						subject: 'Người lớn và trẻ em từ 6 tuổi trở lên',
						guide:
							'- Người lớn: Uống mỗi lần từ 1 - 2 viên, 4 - 6 giờ mỗi lần.\n' +
							'- Trẻ em từ 6 - 12 tuổi: Uống mỗi lần 1 viên, 4 - 6 giờ mỗi lần.',
						preserve: 'Bảo quản nơi khô mát, không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand46 || undefined, //  Tiffy
						origin: origin1 || undefined, // Việt Nam
						images: [P00424_1],
					},
					options: {
						transaction: true,
					},
				}); // Tiffy Dey 73

				const brand47 = await this.brandRepository.createOne({
					data: {
						name: 'Yên Bái',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Yên Bái 47
				const [P00799_1, P00799_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://www.thuoctaytot.com/images/medicine/cam-xuyen-huong-10-vi-x-10-vienhop.jpg',
							publicId: 'P00799_1_l',
							fileName: 'P00799_1_l.jpg',
							description: 'Cảm Xuyên Hương',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://chothuoctoanquoc.vn/wp-content/uploads/2022/02/Ca%CC%89m-xuye%CC%82n-hu%CC%9Bo%CC%9Bng-Ye%CC%82n-Ba%CC%81i-Ho%CC%A3%CC%82p-10-vi%CC%89-x-10-vie%CC%82n-1.jpg',
							publicId: 'P00799_2_l',
							fileName: 'P00799_2_l.jpg',
							description: 'Cảm Xuyên Hương',
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
						code: 'P00799',
						name: 'Cảm Xuyên Hương',
						description:
							'Cảm (hay cảm mạo) thường gặp ở mọi lứa tuổi đặc biệt khó tránh ở phụ nữ mang thai. Trong khi các thuốc tân dược thường cho đáp ứng nhanh và hiệu quả cao nhưng lại đi kèm với nhiều tác dụng phụ và nguy cơ ảnh hưởng đến thai nhi thì xu hướng sử dụng các bài thuốc đông y hay thuốc có nguồn gốc từ dược liệu ngày càng được ưa dùng.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 70000,
						element:
							'- Hoạt chất: Xuyên khung 206mg, Bạch chỉ 232mg, Hương phụ 195mg, Quế chi 9mg, Sinh khương 70mg, Cam thảo bắc 7,5mg\n' +
							'- Tá dược: PVP, Bột Talc vừa đủ 1 viên.',
						uses: 'Điều trị các trường hợp cảm cúm, cảm lạnh, nhức đầu, hắt hơi, số mũi do cảm lạnh.',
						subject:
							'Điều trị các trường hợp cảm cúm, cảm lạnh, nhức đầu, hắt hơi, số mũi do cảm lạnh.',
						guide: 'Uống thuốc với nước đun sôi để nguội.',
						preserve: 'Để nơi khô, thoáng, nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand47 || undefined, //  Yên Bái
						origin: origin1 || undefined, // Việt Nam
						images: [P00799_1, P00799_2],
					},
					options: {
						transaction: true,
					},
				}); // Cảm Xuyên Hương 74

				const brand48 = await this.brandRepository.createOne({
					data: {
						name: 'Mekophar',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Mekophar 48
				const P15277_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://duocare.vn/wp-content/uploads/2020/08/P15277_1_l.jpg',
						publicId: 'P15277_1_l',
						fileName: 'P15277_1_l.jpg',
						description: 'Paracold Fort',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P15277',
						name: 'Paracold Fort',
						description:
							'Paracold Fort điều trị các triệu chứng do cảm cúm như sốt, nghẹt mũi, sổ mũi, hắt hơi,… hoặc viêm mũi dị ứng, viêm xoang và các rối loạn đường hô hấp trên.',
						packingSpec: 'Hộp 25 vỉ x 4 viên',
						unit: 'Hộp',
						price: 84000,
						element:
							'- Hoạt chất chính: Paracetamol 500mg, Phenylephrine hydrochloride 10mg, Chlorpheniramine maleate 2mg\n' +
							'- Tá dược: Pregelatinized starch, croscarmellose sodium, gelatin, tinh bột ngô, màu tartrazine, tinh bột sắn, magnesium stearate',
						uses: 'Điều trị các triệu chứng do cảm cúm như sốt, nghẹt mũi, sổ mũi, hắt hơi,... hoặc viêm mũi dị ứng, viêm xoang và các rối loạn đường hô hấp trên.',
						subject: 'Trẻ em trên 4 tuổi.',
						guide:
							'- Người lớn và trẻ em trên 12 tuổi: uống 1 – 2 viên/lần, ngày 3 lần. Không quá 6 viên/ngày.\n' +
							'- Trẻ em 4 – 12 tuổi: uống 1/2 – 1 viên/lần, ngày 2 – 3 lần. Không quá 3 viên/ngày.\n' +
							'- Khoảng cách giữa các lần dùng thuốc tối thiểu là 4 giờ.',
						preserve: 'Nơi khô, nhiệt độ không quá 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand48 || undefined, //  Mekophar
						origin: origin1 || undefined, // Việt Nam
						images: [P15277_1],
					},
					options: {
						transaction: true,
					},
				}); // Paracold Fort 75

				const [P17042_1, P17042_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p17042_1-5159.jpg',
							publicId: 'P17042_1_l',
							fileName: 'P17042_1_l.jpg',
							description: 'Paralmax',
							width: 820,
							height: 820,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p170422l-5847.jpg',
							publicId: 'P17042_2_l',
							fileName: 'P17042_2_l.jpg',
							description: 'Paralmax',
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
						code: 'P17042',
						name: 'Paralmax',
						description:
							'Paralmax làm giảm các triệu chứng của cảm cúm như sốt, đau và xung huyết mũi.',
						packingSpec: 'Hộp 10 vỉ x 12 viên',
						unit: 'Hộp',
						price: 80000,
						element:
							'Mỗi viên nén bao phim chứa:\n' +
							'Hoạt chất: Paracetamol 500mg, Cafein 25mg, Phenylephrin HCl 5mg.\n' +
							'Tá dược: pregelatinized starch, tinh bột mì, povidon K30, sunset yellow, natri lauryl sulfat, kali sorbat, avicel PH 101, talc, acid stearic; HPMC 606, polyethylen glycol 400, titan dioxid, quinolin lake.',
						uses: 'Điều trị cảm cúm, cảm lạnh',
						subject: 'Người lớn và trẻ em trên 12 tuổi',
						guide:
							'Dùng uống. Không dùng quá liều quy định. Không dùng chung với các thuốc khác có paracetamol, các thuốc chống xung huyết và các thuốc cảm cúm khác.',
						preserve: 'Nơi khô, dưới 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand2 || undefined, //  Boston
						origin: origin1 || undefined, // Việt Nam
						images: [P17042_1, P17042_2],
					},
					options: {
						transaction: true,
					},
				}); // Paralmax 76

				const [P11224_1, P11224_2, P11224_3] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://duocare.vn/wp-content/uploads/2020/08/P11224_1_l.jpg',
							publicId: 'P11224_1_l',
							fileName: 'P11224_1_l.jpg',
							description: 'Andol S',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p112242l-3297.jpg',
							publicId: 'P11224_2_l',
							fileName: 'P11224_2_l.jpg',
							description: 'Andol S',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p112243l-9184.jpg',
							publicId: 'P11224_3_l',
							fileName: 'P11224_3_l.jpg',
							description: 'Andol S',
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
						code: 'P11224',
						name: 'Andol S',
						description:
							'Andol S điều trị các triệu chứng cảm như: Sốt, nhức đầu, đau nhức bắp thịt kèm theo sổ mũi, nghẹt mũi, viêm mũi, viêm xoang do cảm cúm hoặc dị ứng với thời tiết.',
						packingSpec: 'Hộp 25 vỉ x 20 viên',
						unit: 'Hộp',
						price: 415000,
						element:
							'Mỗi viên nén chứa:\n' +
							'Thành phần dược chất: Paracetamol 500 mg, Phenylephrin HCl 10 mg, Clorpheniramin maleat  4 mg\n' +
							'Thành phần tá dược: Cellulose vi tinh thể, Crospovidon, Povidon, Natri lauryl sulphat, Quinolin, Colloidal anhydrous silica, Magnesi stearat.',
						uses: 'Điều trị các triệu chứng cảm như: sốt, nhức đầu, đau nhức bắp thịt kèm theo sổ mũi, nghẹt mũi, viêm mũi, viêm xoang do cảm cúm hoặc dị ứng với thời tiết.',
						subject: 'Người lớn và trẻ em trên 11 tuổi',
						guide: 'dùng đường uống. Uống sau khi ăn và với một ít nước',
						preserve: 'Dưới 30 độ C, tránh ẩm và ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand16 || undefined, //  IMEXPHARM
						origin: origin1 || undefined, // Việt Nam
						images: [P11224_1, P11224_2, P11224_3],
					},
					options: {
						transaction: true,
					},
				}); // Andol S 77

				const brand49 = await this.brandRepository.createOne({
					data: {
						name: 'Mediplantex',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Mediplantex 49
				const P11171_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_66c8dca19b4c439fabdf2a37372f20ee_grande.jpg',
						publicId: 'P11171_1_l',
						fileName: 'P11171_1_l.jpg',
						description: 'MediEucalyptol',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P11171',
						name: 'MediEucalyptol',
						description:
							'Medi Eucalyptol là thuốc điều trị các chứng ho, đau họng, sổ mũi, cảm cúm, sát trùng đường hô hấp, làm loãng niêm dịch, làm dịu ho.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 95000,
						element:
							'Hoạt chất: Eucalypol 100mg, Methol 0,5mg, Tinh dầu tần 0.18mg, Tinh dầu gừng 0.5mg.\n' +
							'Tá dược: Gelatin, dầu đậu nành, xanh green S, glycerin, vanillin, methyl paraben, propyl paraben vừa đủ 1 viên.',
						uses: 'Điều trị các chứng ho, đau họng, sổ mũi, cảm cúm ...',
						subject: 'Người lớn/ trẻ em trên 5 tuổi',
						guide:
							'Trị các chứng ho, đau họng, sổ mũi, cảm cúm.\n' +
							'Sát trùng đường hô hấp, làm loãng niêm dịch, làm dịu ho.',
						preserve: 'Nơi khô, tránh ánh sáng, nhiệt độ dưới 30oC.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand49 || undefined, //  Mediplantex
						origin: origin1 || undefined, // Việt Nam
						images: [P11171_1],
					},
					options: {
						transaction: true,
					},
				}); // MediEucalyptol 78

				const brand50 = await this.brandRepository.createOne({
					data: {
						name: 'Terpinzoat',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Terpinzoat 50
				const [P10318_1, P10318_2, P10318_3, P10318_5] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p10318_1_l-1079.jpg',
							publicId: 'P10318_1_l',
							fileName: 'P10318_1_l.jpg',
							description: 'Terpinzoat',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://s.elib.vn/images/doc/2020/20201008//thumb/600x254/terpinzoat-657.jpg',
							publicId: 'P10318_2_l',
							fileName: 'P10318_2_l.jpg',
							description: 'Terpinzoat',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://vinmec-prod.s3.amazonaws.com/images/20220716_135945_101601_facoral.max-1800x1800.jpg',
							publicId: 'P10318_3_l',
							fileName: 'P10318_3_l.jpg',
							description: 'Terpinzoat',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://pharma.muatheme.com/wp-content/uploads/2019/02/Thu%E1%BB%91c-%C4%91i%E1%BB%81u-tr%E1%BB%8B-ho-long-%C4%91%E1%BB%9Dm-trong-c%C3%A1c-tr%C6%B0%E1%BB%9Dng-h%E1%BB%A3p-vi%C3%AAm-ph%E1%BA%BF-qu%E1%BA%A3n-c%E1%BA%A5p-v%C3%A0-m%C3%A3n-t%C3%ADnh-Terpinzoat-4.jpg',
							publicId: 'P10318_5_l',
							fileName: 'P10318_5_l.jpg',
							description: 'Terpinzoat',
							width: 238,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
				]);
				await this.productRepository.createOne({
					data: {
						code: 'P10318',
						name: 'Terpinzoat',
						description:
							'Terpinzoat là thuốc giúp làm loãng đờm và hỗ trợ điều trị các triệu chứng ho trong các trường hợp: Viêm phế quản, khí quản cấp hay mãn tính.',
						packingSpec: 'Hộp 10 vỉ x 10 viên',
						unit: 'Hộp',
						price: 38000,
						element:
							'- Terpin hydrat 100mg, Natri benzoat 50mg.\n' +
							'- Tá dược: Avicel, Magnesi stearat, Sellac, Cetyl alcohol, PVP, Talc, Gelatin, Đường saccarose, Gôm arabic, Oxyd titan, Sáp ong tráng, Sáp carnauba, Paratin, Màu xanh patent, cồn 96°, Ether vừa đủ 1 viên bao đường.',
						uses: 'Trị các triệu chứng ho, long đờm trong các trường hợp viêm phế quản cấp hay mãn tính',
						subject: 'Trên 3 tuổi',
						guide: 'Dùng đường uống.',
						preserve: 'Nơi khô, không quá 30°C, tránh ánh sáng',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand50 || undefined, //  TV.PHARM
						origin: origin1 || undefined, // Việt Nam
						images: [P10318_1, P10318_2, P10318_3, P10318_5],
					},
					options: {
						transaction: true,
					},
				}); // Terpinzoat 79

				const brand51 = await this.brandRepository.createOne({
					data: {
						name: 'F.T Pharma',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // F.T Pharma 51
				const P00411_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://alphabetpharma.com.vn/image/cache/catalog/alphabet-pharma/77-800x800.jpg',
						publicId: 'P00411_1_l',
						fileName: 'P00411_1_l.jpg',
						description: 'Bromhexin 8mg',
						width: 800,
						height: 800,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00411',
						name: 'Bromhexin 8mg',
						description:
							'Bromhexin 8 dạng viên nén của Công ty Cổ phần Dược phẩm 3/2 (F.T.Pharma), dùng trong các trường hợp liên quan đến rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản mạn tính. Thường được dùng như một chất bổ trợ với kháng sinh, khi bị nhiễm khuẩn nặng đường hô hấp.',
						packingSpec: 'Hộp 10 vỉ x 20 viên',
						unit: 'Hộp',
						price: 16000,
						element:
							'- Hoạt chất: Bromhexin HCl 8mg\n' +
							'- Tá dược: Microcrystalline cellulose 101 (Avicel 101), Lactose monohydrat, Tinh bột ngô, Magnesi stearat, Tinh bột ngô. ',
						uses: 'Điều trị rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản',
						subject:
							'Rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản mạn tính.',
						guide: 'Đường uống.',
						preserve: 'Để ở nơi khô ráo, nhiệt độ dưới 30°C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand51 || undefined, //  F.T Pharma
						origin: origin1 || undefined, // Việt Nam
						images: [P00411_1],
					},
					options: {
						transaction: true,
					},
				}); // Bromhexin 8mg 80

				const brand52 = await this.brandRepository.createOne({
					data: {
						name: 'Hà Tây',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // F.T Pharma 52
				const [P13319_1, P13319_2, P13319_4, P13319_5] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/sanpham/p13319_1_l-0902.jpg',
							publicId: 'P13319_1_l',
							fileName: 'P13319_1_l.jpg',
							description: 'Anpemux 250mg',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p133192l-5681.jpg',
							publicId: 'P13319_2_l',
							fileName: 'P13319_2_l.jpg',
							description: 'Anpemux 250mg',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p133194l-2656.jpg',
							publicId: 'P13319_4_l',
							fileName: 'P13319_4_l.jpg',
							description: 'Anpemux 250mg',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p133195l-4988.jpg',
							publicId: 'P13319_5_l',
							fileName: 'P13319_5_l.jpg',
							description: 'Anpemux 250mg',
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
						code: 'P13319',
						name: 'Anpemux 250mg',
						description:
							'Anpemux 250mg điều trị những rối loạn của sự tiết phế quản, nhất là trong các bệnh phế quản cấp tính: Viêm phế quản cấp, giai đoạn cấp tính của các bệnh phổi – phế quản mạn.',
						packingSpec: 'Hộp 6 vỉ x 10 viên',
						unit: 'Hộp',
						price: 78000,
						element:
							'Mỗi viên nang cứng chứa:\n' +
							'- Hoạt chất: Carbocystein 250mg\n' +
							'- Tá dược: Bột talc, magnesi stearat, microcrystalline cellulose, bột hưdng cam, bột hương đào vừa đủ 1 viên.',
						uses: 'Điều trị ho đàm trong viêm phế quản.',
						subject:
							'Điều trị những rối loạn của sự tiết phế quản, nhất là trong các bệnh phế quản cấp tính: Viêm phế quản cấp, giai đoạn cấp tính của các bệnh phổi - phế quản mạn.',
						guide:
							'- Người lớn và trẻ em trên 15 tuổi: mỗi lần 2 viên, 3 lần/ngày. Nên uống thuốc xa bữa ăn.\n' +
							'- Trẻ em dưới 15 tuổi: nên dùng dạng syrup.',
						preserve: 'Nơi khô, nhiệt độ dưới 30 độ C, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand52 || undefined, // Hà Tây
						origin: origin1 || undefined, // Việt Nam
						images: [P13319_1, P13319_2, P13319_4, P13319_5],
					},
					options: {
						transaction: true,
					},
				}); // Anpemux 250mg 81

				const P02416_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p02416_1_l-2404.jpg',
						publicId: 'P02416_1_l',
						fileName: 'P02416_1_l.jpg',
						description: 'Bromhexin 8mg',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P02416',
						name: 'Coldfed',
						description:
							'Coldfed điều trị các triệu chứng cảm, sốt, nhức đầu, sổ mũi, đau khớp, đau cơ.',
						packingSpec: 'Hộp 10 vỉ x 20 viên',
						unit: 'Hộp',
						price: 34000,
						element:
							'Paracetamol, Chlorpheniramine\n' +
							'Tá dược: Lactose, Tinh bột ngô, Povidon, Nipagin, Nipaso, Vàng quinolein, Natristarchglycolat, Talc, Magnesistearat.',
						uses: 'Ðiều trị triệu chứng cảm, sốt, nhức đầu, sổ mũi, đau khớp, đau cơ....',
						subject: 'Người lớn/ trẻ em trên 2 tuổi',
						guide:
							'- Người lớn: 1 – 2 viên/lần, cách 4 giờ uống 1 lần, không quá 3 lần/ngày.\n' +
							'- Trẻ em 7 – 15 tuổi: ½ - 1 viên/lần, cách 4 giờ uống 1 lần, không quá 3 lần/ngày.',
						preserve:
							'Trong bao bì kín, nơi khô, tránh ánh sáng. Nhiệt độ không quá 30°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand21 || undefined, //  Pharmedic
						origin: origin1 || undefined, // Việt Nam
						images: [P02416_1],
					},
					options: {
						transaction: true,
					},
				}); // Coldfed 82

				const [P02125_1, P02125_2] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://cdn.medigoapp.com/product/8b64fb2c950d43d582dd68bf1ba1f06e.jpg',
							publicId: 'P02125_1_l',
							fileName: 'P02125_1_l.jpg',
							description: 'Pectol',
							width: 700,
							height: 700,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'http://product.hstatic.net/1000113261/product/quay-thuoc-ba-ty_6bfb4d2cc8f348fd8cde8fbc49eddec7_grande.jpg',
							publicId: 'P02125_2_l',
							fileName: 'P02125_2_l.jpg',
							description: 'Pectol',
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
						code: 'P02125',
						name: 'Pectol',
						description:
							'Thuốc điều trị chứng ho đờm, cảm mạo Pectol (30 viên/chai) giúp điều trị chứng ho đàm, suyễn do cảm mạo. Phù hợp cho cả người lớn và trẻ em.',
						packingSpec: 'Lọ 30 viên',
						unit: 'Chai',
						price: 13000,
						element:
							'Hoạt chất: Cao lỏng Cát cánh 0,050g, Cao lỏng Bán hạ 0,050g, Cao lỏng Viễn chí 0,050g, Bột Bìm Bìm 0,050g, Terpin hydrate 0,050g, Natri benzoate 0,030g\n' +
							'Tá dược: Magnesi stearat, Magnesi carbonat, Đường, Gôm A rập, Gelatin Titan dioxyd, Bột Talc, Ethanol 96% Vừa đủ 1 viên bao đườngg my',
						uses: 'Điều trị các chứng ho đàm, suyễn do cảm mạo.',
						subject: 'Người lớn và trẻ em trên 6 tuổi.',
						guide:
							'Người lớn: Ngày uống 3 lần, mỗi lần 1 - 2 viên.\n' +
							'Trẻ em 5 - 9 tuổi: Ngày uống 2 lần, mỗi lần 1/2 - 1 viên.\n' +
							'Trẻ từ 10 - 15 tuổi: Ngày uống 3 lần, mỗi lần 1 viên.',
						preserve: 'Để nơi khô mát, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand39 || undefined, // Sagopha
						origin: origin1 || undefined, // Việt Nam
						images: [P02125_1, P02125_2],
					},
					options: {
						transaction: true,
					},
				}); // Pectol 83

				const brand53 = await this.brandRepository.createOne({
					data: {
						name: 'Unique Pharmaceutical Labs',
						origin: origin3 || undefined, // Ấn Độ
					},
					options: {
						transaction: true,
					},
				}); // Unique Pharmaceutical Labs 53
				const P14103_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://product.hstatic.net/1000113261/product/cufo_lozenges-thuocbaty.vn-duocsitranthiha_4fd676cf53f547a18ed0f7d3b0113bf0_grande.jpg',
						publicId: 'P14103_1_l',
						fileName: 'P14103_1_l.jpg',
						description: 'Cufo Lozenges',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P14103',
						name: 'Cufo Lozenges',
						description:
							'Cufo Lozenges hỗ trợ điều trị trong nhiễm khuẩn hầu, họng, miệng và đau rát họng.',
						packingSpec: 'Hộp 2 vỉ x 12 viên',
						unit: 'Hộp',
						price: 35000,
						element:
							'- 2.4- Dichlorobenzyl Alcohol 1.2 mg, Amylmetacresol BP 0.6 mg.\n' +
							'- Tá dược: Sucrose, Liquid Glucose, Citric Acid Monohydrate, Mentha Oil, Blackcurrant flavor, Colour Carmosine, Colour Brilliant Blue, Nước tinh khiết.',
						uses: 'Hỗ trợ điều trị trong nhiễm khuẩn hầu, họng, miệng và đau rát họng.',
						subject: 'Người lớn và trẻ em trên 6 tuổi',
						guide:
							'- Người lớn và trẻ em trên 6 tuổi: Thuốc dùng bằng đường miệng\n' +
							'- Ngậm 1 viên/lần, mỗi lần dùng cách nhau 2- 3 giờ, sử dụng tối đa 12 viên trong 24 giờ\n' +
							'- Không dùng cho trẻ em dưới 6 tuổi',
						preserve:
							'Nơi khô mát tránh ánh sáng, nhiệt độ dưới 30°C. Để thuốc xa tầm tay trẻ em.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand53 || undefined, //  Unique Pharmaceutical Labs
						origin: origin3 || undefined, // Ấn Độ
						images: [P14103_1],
					},
					options: {
						transaction: true,
					},
				}); // Cufo Lozenges 84

				const origin12 = await this.originRepository.createOne({
					data: {
						name: 'Hàn Quốc',
					},
					options: {
						transaction: true,
					},
				}); // Hàn Quốc 12
				const brand54 = await this.brandRepository.createOne({
					data: {
						name: 'AhnGook Pharmaceutical',
						origin: origin12 || undefined, // Hàn Quốc
					},
					options: {
						transaction: true,
					},
				}); // AhnGook Pharmaceutical 54
				const [P16559_1, P16559_4, P16559_5] = await Promise.all([
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p16559_1_l-2665.jpg',
							publicId: 'P16559_1_l',
							fileName: 'P16559_1_l.jpg',
							description: 'Synatura Syrup',
							width: 400,
							height: 400,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p165594l-8650.jpg',
							publicId: 'P16559_4_l',
							fileName: 'P16559_4_l.jpg',
							description: 'Synatura Syrup',
							width: 460,
							height: 460,
						},
						options: {
							transaction: true,
						},
					}),
					this.imageRepository.createOne({
						data: {
							url: 'https://nhathuoctuelamso8.com/upload/hinhthem/p165595l-709.jpg',
							publicId: 'P16559_5_l',
							fileName: 'P16559_5_l.jpg',
							description: 'Synatura Syrup',
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
						code: 'P16559',
						name: 'Synatura Syrup',
						description:
							'Thuốc Siro điều trị nhiễm khuẩn đường hô hấp trên cấp tính và viêm phế quản mạn tính Synatura Syrup AhnGook (Chai100ml)',
						packingSpec: 'Chai 100ml',
						unit: 'Chai',
						price: 98000,
						element:
							'Hoạt chất: Cao khô lá Thường Xuân (chiết xuất bằng cồn Ethanol 30%) 265.5mg. Cao khô rễ Hoàng Liên 87.5mg.\n' +
							'Tá dược: Acid citric khan, betadex, natri citrat hydrat, dl-malic acid, natri clorid, isomalt, đường, sucralose, kali sorbat, xanthan gum, dung dịchh sorbitol, hương cherry SC10-0945, hương nho SC905-107, hương mixed-berry 20.4557.1G PHA, LS300, nước tinh khiết.',
						uses: 'Nhiễm khuẩn đường hô hấp trên cấp tính và viêm phế quản mạn tính.',
						subject: 'Người lớn và trẻ em trên 2 tuổi.',
						guide:
							'- 2-6 tuổi: 5ml x 3 lần/ngày\n' +
							'- 7-14 tuổi: 10ml x 3 lần/ngày\n' +
							'- Từ 15 tuổi trở lên: 15ml x 3 lần/ngày',
						preserve: 'Trong bao bì kín, dưới 30 độ C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand54 || undefined, // AhnGook Pharmaceutical
						origin: origin12 || undefined, // Hàn Quốc
						images: [P16559_1, P16559_4, P16559_5],
					},
					options: {
						transaction: true,
					},
				}); // Synatura Syrup 85

				const brand55 = await this.brandRepository.createOne({
					data: {
						name: 'Decolgen',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Decolgen 55
				const P00003_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://product.hstatic.net/200000376269/product/p00003_1_l_528d33d4245e4136b3eae1a36bd5b805_large.jpg',
						publicId: 'P00003_1_l',
						fileName: 'P00003_1_l.jpg',
						description: 'Decolgen Forte',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00003',
						name: 'Decolgen Forte',
						description:
							'DECOLGEN® FORTE được sản xuất bởi CÔNG TY TNHH UNITED INTERNATIONAL PHARMA được dùng để điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm, viêm xoang và các rối loạn của đường hô hấp trên.',
						packingSpec: 'Hộp 25 vỉ x 4 viên nén',
						unit: 'Hộp',
						price: 125000,
						element:
							'Mỗi viên DECOLGEN FORTE chứa \n' +
							'- Hoạt chất: Paracetamol (Acetaminophen) 500mg, Phenylephrine Hydrochloride 10mg, Chlorpheniramine Maleate 2mg.\n' +
							'- Tá dược: Povidone, Starch, Sodium starch Glycolate, Magnesium stearate, D&C Red # 22, D&C Red # 33, D&C Yellow# 10.',
						uses: 'Điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm, viêm xoang và các rối loạn của đường hô hấp trên.',
						subject: 'Người lớn và trẻ em từ 2 tuổi trở lên',
						guide: 'Uống 3 hay 4 lần một ngày sau khi ăn',
						preserve:
							'Bảo quản nơi khô, ở nhiệt độ không quá 30°C, tránh ánh sáng',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand55 || undefined, //  Decolgen
						origin: origin1 || undefined, // Việt Nam
						images: [P00003_1],
					},
					options: {
						transaction: true,
					},
				}); // Decolgen Forte 86

				const P00002_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://demo.gbotweb.com/goodpharma/data/fileserver/images/resize-540x540/upload/P00002_1_l.jpg',
						publicId: 'P00002_1_l',
						fileName: 'P00002_1_l.jpg',
						description: 'Decolgen ND',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P00002',
						name: 'Decolgen ND',
						description:
							'Thuốc Decolgen ND là một loại thuốc kết hợp, có tác dụng giảm đau, hạ sốt và giảm các triệu chứng sổ mũi, ngạt mũi trong các trường hợp mắc bệnh lý viêm đường hô hấp trên. Để sử dụng thuốc đúng cách bạn cần hiểu rõ về thành phần, công dụng của thuốc.',
						packingSpec: 'Hộp 25 vỉ x 4 viên',
						unit: 'Hộp',
						price: 125000,
						element:
							'Mỗi viên DECOLGEN ND chứa\n' +
							'- Hoạt chất: Paracetamol (acetaminophen) 500mg, Phenylephrine Hydrochloride 10mg.\n' +
							'- Tá dược: Povidone K-30, Starch, Silicified Microcrystalline Cellulose, Citric Acid Anhydrous, Hydroxypropyl Cellulose, FD&C Blue #1 87 - 93%, D&C Yellow #10 88 - 94%, Sodium Starch Glycolate, Magnesium Stearate.',
						uses: 'Điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cảm, viêm xoang và các rối loạn của đường hô hấp trên.',
						subject: 'Người lớn và trẻ em từ 2 tuổi trở lên',
						guide:
							'- Uống 3 hay 4 lần một ngày\n' +
							'- Người lớn: 1- 2 viên/lần.\n' +
							'- Trẻ em: 2 - 6 tuổi: 1/2 viên/lần, 7 - 12 tuổi: 1/2 - 1 viên/lần.\n' +
							'- Không khuyến cáo dùng cho trẻ em dưới 2 tuổi.',
						preserve:
							'Bảo quản nơi khô, ở nhiệt độ không quá 30°C, tránh ánh sáng',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand55 || undefined, //  Decolgen
						origin: origin1 || undefined, // Việt Nam
						images: [P00002_1],
					},
					options: {
						transaction: true,
					},
				}); // Decolgen ND 87

				const brand56 = await this.brandRepository.createOne({
					data: {
						name: 'Mebiphar',
						origin: origin1 || undefined, // Việt Nam
					},
					options: {
						transaction: true,
					},
				}); // Mebiphar 56
				const P01978_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://nhathuoctuelamso8.com/thumb/400x400x1x90/upload/sanpham/p01978_1_l-2729.jpg',
						publicId: 'P01978_1_l',
						fileName: 'P01978_1_l.jpg',
						description: 'Eprazinone 50mg',
						width: 400,
						height: 400,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01978',
						name: 'Eprazinone 50mg',
						description:
							'Medi Eucalyptol là thuốc điều trị các chứng ho, đau họng, sổ mũi, cảm cúm. Sát trùng đường hô hấp, làm loãng niêm dịch, làm dịu ho.',
						packingSpec: 'Hộp 3 vỉ x 10 viên',
						unit: 'Hộp',
						price: 24000,
						element:
							'- Hoạt chất: Eprazinon dihydroclorid 50mg\n' +
							'- Tá dược vừa đủ 1 viên: Lactose, Tinh bột sắn, Bột Talc, Magnesi stearat, PVP, HPMC 606, HPMC 615, PEG 6000, Titan dioxyd, Màu đỏ Erythrosin lake, Ethanol 96%, ...',
						uses: 'Điều trị viêm phế quản, suy hô hấp mạn tính, viêm mũi, ho, cúm, hen phế quản.',
						subject: 'Người lớn.',
						guide: 'Người lớn: uống từ 3 - 6 viên/ngày, chia làm 3 lần.',
						preserve: 'Để nơi khô mát, tránh ánh sáng.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand56 || undefined, // Mebiphar
						origin: origin1 || undefined, // Việt Nam
						images: [P01978_1],
					},
					options: {
						transaction: true,
					},
				}); // Eprazinone 50mg 88

				const brand57 = await this.brandRepository.createOne({
					data: {
						name: 'Strepsils',
						origin: origin6 || undefined, // Thái Lan
					},
					options: {
						transaction: true,
					},
				}); // Strepsils 57
				const P06367_1 = await this.imageRepository.createOne({
					data: {
						url: 'http://img4.tmon.kr/cdn4/deals/2022/04/12/10608053434/front_sub1_f90a7_nbhw0.jpg',
						publicId: 'P06367_1_l',
						fileName: 'P06367_1_l.jpg',
						description: 'Strepsils Throat Irritation & Cough 15mg',
						width: 720,
						height: 758,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P06367',
						name: 'Strepsils Throat Irritation & Cough 15mg',
						description:
							'Thuốc Strepsils Throat Irritation Cough là sản phẩm của Công ty Reckitt Benckiser Healthcare Manufacturing (Thailand) có chứa Ambroxol Hydrochlorid với công dụng giúp làm sạch đường thở và kiểm soát ho do phổi gây ra bởi chất nhầy dầy đặc.',
						packingSpec: 'Hộp 2 vỉ x 12 viên ngậm',
						unit: 'Hộp',
						price: 51000,
						element:
							'Mỗi viên ngậm chứa:\n' +
							'- Hoạt chất: Ambroxol hydrochloric 15mg.\n' +
							'- Tá dược: tinh dầu hồi, tinh dầu cam (IFF), menthol, acid tartaric, natri saccharin, bột sorbitol, đường tinh chế, glucose lỏng, ponceau 4R edicol, sunset yellow FC edicol, quinoline yellow.',
						uses: 'Điều trị ho, đau họng...',
						subject:
							'Giúp làm sạch đường thở và kiểm soát ho do phổi gây ra bởi chất nhầy dầy đặc.',
						guide:
							'Người lớn: Ngậm 2 viên, (ngậm lần lượt từng viên), 3 lần mỗi ngày.\n' +
							'Trẻ em 6 - 12 tuổi: Ngậm 1 viên, 3 lần mỗi ngày.\n' +
							'Không dùng quá liều quy định. Nếu triệu chứng không giảm, tham khảo ý kiến bác sĩ.\n' +
							'Lưu ý rằng trẻ nhỏ có thể bị nghẹt thở do viên ngậm.',
						preserve:
							'Bảo quản nơi khô ráo, dưới 30°C. Để thuốc xa tầm tay của trẻ em.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand57 || undefined, // Strepsils
						origin: origin6 || undefined, // Thái Lan
						images: [P06367_1],
					},
					options: {
						transaction: true,
					},
				}); // Strepsils Throat Irritation & Cough 15mg 89

				const origin13 = await this.originRepository.createOne({
					data: {
						name: 'Đức',
					},
					options: {
						transaction: true,
					},
				}); // Đức 13
				const brand58 = await this.brandRepository.createOne({
					data: {
						name: 'Medice arzneimitel',
						origin: origin13 || undefined, // Đức
					},
					options: {
						transaction: true,
					},
				}); // Medice arzneimitel 58
				const P01031_1 = await this.imageRepository.createOne({
					data: {
						url: 'https://sg-live-01.slatic.net/p/2e7cb3d813a1ee9307e9c19c9971c6a8.png',
						publicId: 'P01031_1_l',
						fileName: 'P01031_1_l.jpg',
						description: 'Dorithricin',
						width: 460,
						height: 460,
					},
					options: {
						transaction: true,
					},
				});
				await this.productRepository.createOne({
					data: {
						code: 'P01031',
						name: 'Dorithricin',
						description:
							'Dorithricin của Medice Arzneimittel Pütter GmbH & Co. KG, có thành phần chính là tyrothricin, benzalkonium và benzocain. Viên ngậm dùng để điều trị các triệu chứng nhiễm khuẩn miệng - họng như đau họng, nuốt khó.',
						packingSpec: 'Hộp 2 vỉ x 10 viên',
						unit: 'Hộp',
						price: 50000,
						element:
							'- Tyrothiricin: 0,5mg, Benzalkonium: 1,00mg, Benzocaine: 1,5mg\n' +
							'- Bệnh nhân tiểu đường lưu ý: mỗi viên thuốc có chứa Sorbitol: 870,925mg',
						uses: 'Trị đau nhức họng, viêm hầu họng,...',
						subject: 'Mọi người',
						guide: 'Để viên ngậm họng',
						preserve: 'Bảo quản dưới 25°C.',
						category: cate14 || undefined, // Thuốc cảm lạnh
						trademark: brand58 || undefined, // Medice arzneimitel
						origin: origin13 || undefined, // Đức
						images: [P01031_1],
					},
					options: {
						transaction: true,
					},
				}); // Dorithricin 90

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
			await this.imageRepository.hardDelete({
				product: Not(IsNull()),
			});
			await this.productRepository.hardDelete({});
			await this.brandRepository.hardDelete({});
			await this.originRepository.hardDelete({});
			await this.imageRepository.hardDelete({
				category: Not(IsNull()),
			});
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
