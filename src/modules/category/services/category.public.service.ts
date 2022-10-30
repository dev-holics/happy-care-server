import { ProductPublicRepository } from 'src/modules/product/repositories';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryPublicRepository } from 'src/modules/category/repositories/category.public.repository';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { In } from 'typeorm';

@Injectable()
export class CategoryPublicService {
	constructor(
		private readonly categoryPublicRepository: CategoryPublicRepository,
		private readonly productPublicRepository: ProductPublicRepository,
		private readonly categoryTreeRepository: CategoryTreeRepository,
		private readonly paginationService: PaginationService,
	) {}

	async getCategories(query: CategoryInputQueryDto): Promise<IResponseBase> {
		let result;
		if (query.parentId) {
			const parent = await this.categoryPublicRepository.findOne({
				where: {
					id: query.parentId,
				},
				options: {
					relations: {
						parent: true,
					},
				},
			});
			if (!parent) {
				throw new NotFoundException({
					statusCode: 404,
					message: 'categoryId.error.notFound',
				});
			}
			result = await this.categoryTreeRepository.findDescendantsTreeCategories(
				parent,
			);
		} else {
			result = await this.categoryTreeRepository.findTreeCategories();
		}
		return this.paginationService.formatResult(result);
	}

	async getAllCategories(): Promise<IResponseBase> {
		const categories = await this.categoryPublicRepository.findMany({});
		return this.paginationService.formatResult(categories);
	}

	async getCountProductCategoryParent(): Promise<IResponseBase> {
		const parentCategories =
			await this.categoryTreeRepository.findTreeCategories(0);
		await Promise.all(
			parentCategories.map(async (item: any) => {
				const ids = await this.categoryTreeRepository.getCategoryIds(item.id);
				const countProducts = await this.productPublicRepository.count({
					where: {
						category: { id: In(ids) },
					},
				});
				item.countProducts = countProducts;
				return item;
			}),
		);
		return this.paginationService.formatResult(parentCategories);
	}
}
