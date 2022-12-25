import { DatabaseTransactionService } from 'src/common/database/services/database.transaction.service';
import { ImageService } from 'src/common/media/services/image.service';
import {
	ProductCreateDto,
	ProductLogCreateDto,
	ProductLogExportDto,
	ProductLogImportDto,
	ProductLogListQueryDto,
	ProductUpdateDto,
} from 'src/modules/product/dtos';
import {
	ProductConsignmentRepository,
	ProductDetailRepository,
	ProductLogRepository,
	ProductRepository,
} from 'src/modules/product/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/modules/product/entities';
import {
	ENUM_PRODUCT_STATUS_CODE_ERROR,
	ENUM_TRANSACTION_TYPES,
} from 'src/modules/product/constants';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import moment from 'moment';
import { Equal } from 'typeorm';
import { BranchEntity } from 'src/modules/location/entities';

@Injectable()
export class ProductService {
	constructor(
		private readonly imageService: ImageService,
		private readonly productRepository: ProductRepository,
		private readonly productDetailRepository: ProductDetailRepository,
		private readonly productLogRepository: ProductLogRepository,
		private readonly databaseTransactionService: DatabaseTransactionService,
		private readonly paginationService: PaginationService,
		private readonly productConsignmentRepository: ProductConsignmentRepository,
	) {}

	async createProduct(productCreateDto: ProductCreateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			const images = await this.imageService.createImages(
				productCreateDto.images,
			);
			await this.productRepository.createOne({
				data: {
					...productCreateDto,
					trademark: {
						id: productCreateDto.trademarkId,
					},
					category: {
						id: productCreateDto.categoryId,
					},
					origin: {
						id: productCreateDto.originId,
					},
					images: images,
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		}
	}

	async updateProduct(productId: string, productUpdateDto: ProductUpdateDto) {
		const queryRunner = await this.databaseTransactionService.getQueryRunner();
		await queryRunner.startTransaction();
		try {
			// eslint-disable-next-line prefer-const
			let images = [];
			// eslint-disable-next-line prefer-const
			let productIds: string[] = [];
			if (productUpdateDto.images) {
				for (const item of productUpdateDto.images) {
					const image = await this.imageService.findImagesByPublicId(
						item.publicId,
					);
					if (!image) {
						const product = new ProductEntity();
						product.id = productId;
						images.push({ ...item, product: product });
					} else {
						productIds.push(item.publicId);
					}
				}
				await this.imageService.deleteSoftImages(productIds);
				await this.imageService.createImages(images);
			}
			await this.productRepository.updateOne({
				criteria: {
					id: productId,
				},
				data: {
					...productUpdateDto,
					trademark: {
						id: productUpdateDto.trademarkId,
					},
					origin: {
						id: productUpdateDto.originId,
					},
					category: {
						id: productUpdateDto.categoryId,
					},
				},
			});
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		}
	}

	async getProductLogs(productLogListQueryDto: ProductLogListQueryDto) {
		const totalData = await this.productLogRepository.count({
			where: {
				transactionDate: productLogListQueryDto.transactionDate
					? productLogListQueryDto.transactionDate
					: undefined,
				type: productLogListQueryDto.type
					? productLogListQueryDto.type
					: undefined,
				branch: {
					id: productLogListQueryDto.branchId
						? productLogListQueryDto.branchId
						: undefined,
				},
			},
		});
		const productLogs = await this.productLogRepository.findMany({
			where: {
				transactionDate: productLogListQueryDto.transactionDate
					? productLogListQueryDto.transactionDate
					: undefined,
				type: productLogListQueryDto.type
					? productLogListQueryDto.type
					: undefined,
				branch: {
					id: productLogListQueryDto.branchId
						? productLogListQueryDto.branchId
						: undefined,
				},
			},
			options: {
				relations: {
					product: true,
					branch: true,
				},
				page: productLogListQueryDto.page,
				limit: productLogListQueryDto.limit,
			},
		});
		return this.paginationService.formatPaginationResult(
			totalData,
			productLogListQueryDto.page,
			productLogListQueryDto.limit,
			null,
			null,
			productLogs,
		);
	}

	async importProductLog(productLogImportDto: ProductLogImportDto) {
		if (
			moment(productLogImportDto.expired).format('YYYY-MM-DD') <
			moment().add(6, 'months').format('YYYY-MM-DD')
		) {
			throw new BadRequestException({
				statusCode:
					ENUM_PRODUCT_STATUS_CODE_ERROR.PRODUCT_EXPIRED_MORE_THAN_SIX_MONTH,
				message: 'expired input more than six month',
			});
		}
		const [productConsignment, productDetail] = await Promise.all([
			this.productConsignmentRepository.findOne({
				where: {
					expired: Equal(
						moment(productLogImportDto.expired).format('YYYY-MM-DD'),
					),
					productDetail: {
						product: {
							id: productLogImportDto.productId,
						},
						branch: {
							id: productLogImportDto.branchId,
						},
					},
				},
			}),
			this.productDetailRepository.findOne({
				where: {
					product: {
						id: productLogImportDto.productId,
					},
					branch: {
						id: productLogImportDto.branchId,
					},
				},
			}),
		]);

		let newProductDetail;

		if (!productDetail) {
			newProductDetail = await this.productDetailRepository.createOne({
				data: {
					product: {
						id: productLogImportDto.productId,
					},
					branch: {
						id: productLogImportDto.branchId,
					},
				},
			});
		} else {
			newProductDetail = productDetail;
		}

		if (!productConsignment) {
			const newProductConsignment =
				await this.productConsignmentRepository.createOne({
					data: {
						expired: moment(productLogImportDto.expired).format('YYYY-MM-DD'),
						quantity: productLogImportDto.quantity,
						productDetail: newProductDetail,
					},
				});
			if (!newProductConsignment) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product consignment update failed',
				});
			}
		} else {
			const updateProductConsignment =
				await this.productConsignmentRepository.updateOne({
					criteria: {
						id: productConsignment.id,
					},
					data: {
						quantity:
							productLogImportDto.quantity + productConsignment.quantity,
					},
				});
			if (!updateProductConsignment) {
				throw new BadRequestException({
					statusCode: 400,
					message: 'product consignment update failed',
				});
			}
		}

		const productLogCreate = await this.productLogRepository.createOne({
			data: {
				transactionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
				quantity: productLogImportDto.quantity,
				expired: moment(productLogImportDto.expired).format('YYYY-MM-DD'),
				type: ENUM_TRANSACTION_TYPES.IMPORT,
				branch: {
					id: productLogImportDto.branchId,
				},
				product: {
					id: productLogImportDto.productId,
				},
			},
		});

		if (!productLogCreate) {
			throw new BadRequestException();
		}

		return productLogCreate;
	}

	async exportProductLog(productLogExportDto: ProductLogExportDto) {
		const productConsignment = await this.productConsignmentRepository.findOne({
			where: {
				id: productLogExportDto.productConsignmentId,
			},
		});

		if (!productConsignment) {
			throw new BadRequestException({
				statusCode: ENUM_PRODUCT_STATUS_CODE_ERROR.CANNOT_EXPORT_PRODUCT,
				message: 'productDetail.error.doesNotHaveProductConsignment',
			});
		}

		if (productConsignment.quantity < productLogExportDto.quantity) {
			throw new BadRequestException({
				statusCode: ENUM_PRODUCT_STATUS_CODE_ERROR.CANNOT_EXPORT_PRODUCT,
				message: 'productDetail.error.quantityProductConsignNotEnough',
			});
		}

		const productConsignmentUpdate =
			await this.productConsignmentRepository.updateOne({
				criteria: {
					id: productLogExportDto.productConsignmentId,
				},
				data: {
					quantity: productConsignment.quantity - productLogExportDto.quantity,
				},
			});

		if (!productConsignmentUpdate) {
			throw new BadRequestException();
		}

		const productLogCreate = await this.productLogRepository.createOne({
			data: {
				transactionDate: moment().format('YYYY-MM-DD HH:mm:ss'),
				quantity: productLogExportDto.quantity,
				type: ENUM_TRANSACTION_TYPES.EXPORT,
				branch: {
					id: productLogExportDto.branchId,
				},
				product: {
					id: productLogExportDto.productId,
				},
			},
		});

		if (!productLogCreate) {
			throw new BadRequestException();
		}

		return productLogCreate;
	}

	async updateStock(productLogCreateDto: ProductLogCreateDto) {
		// const queryRunner = await this.databaseTransactionService.getQueryRunner();
		// await queryRunner.startTransaction();
		// try {
		// 	const productDetail = await this.productDetailRepository.findOne({
		// 		where: {
		// 			product: {
		// 				id: productLogCreateDto.productId,
		// 			},
		// 			branch: {
		// 				id: productLogCreateDto.branchId,
		// 			},
		// 		},
		// 	});

		// 	if (productDetail) {
		// 		// If this branch has already had this product
		// 		if (productLogCreateDto.type === ENUM_TRANSACTION_TYPES.IMPORT) {
		// 			productDetail.quantity += productLogCreateDto.quantity;
		// 		} else {
		// 			if (productDetail.quantity < productLogCreateDto.quantity) {
		// 				// If the quantity of product in this branch is not enough
		// 				throw new BadRequestException({
		// 					statusCode: ENUM_PRODUCT_STATUS_CODE_ERROR.CANNOT_EXPORT_PRODUCT,
		// 					message: 'productDetail.error.notEnoughProduct',
		// 				});
		// 			}
		// 			productDetail.quantity -= productLogCreateDto.quantity;
		// 		}
		// 		await this.productDetailRepository.updateOne({
		// 			criteria: {
		// 				id: productDetail.id,
		// 			},
		// 			data: {
		// 				quantity: productDetail.quantity,
		// 			},
		// 		});
		// 	} else {
		// 		// If this branch has not had this product
		// 		if (productLogCreateDto.type === ENUM_TRANSACTION_TYPES.IMPORT) {
		// 			await this.productDetailRepository.createOne({
		// 				data: {
		// 					quantity: productLogCreateDto.quantity,
		// 					product: {
		// 						id: productLogCreateDto.productId,
		// 					},
		// 					branch: {
		// 						id: productLogCreateDto.branchId,
		// 					},
		// 				},
		// 			});
		// 		} else {
		// 			throw new BadRequestException({
		// 				statusCode: ENUM_PRODUCT_STATUS_CODE_ERROR.CANNOT_EXPORT_PRODUCT,
		// 				message: 'productDetail.error.doesNotHaveProduct',
		// 			});
		// 		}
		// 	}

		// 	await this.productLogRepository.createOne({
		// 		data: {
		// 			...productLogCreateDto,
		// 			branch: {
		// 				id: productLogCreateDto.branchId,
		// 			},
		// 			product: {
		// 				id: productLogCreateDto.productId,
		// 			},
		// 		},
		// 	});
		// } catch (e) {
		// 	await queryRunner.rollbackTransaction();
		// 	throw e;
		// }
		return;
	}
}
