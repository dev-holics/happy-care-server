import { options } from 'joi';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryInputQueryDto } from 'src/modules/category/dtos/category.input.query.dto';
import { CategoryTreeRepository } from 'src/modules/category/repositories/category.tree.repository';
import { CategoryPublicRepository } from 'src/modules/category/repositories/category.public.repository';
import { IResponseBase } from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Injectable()
export class CategoryPublicService {
	constructor(
		private readonly categoryPublicRepository: CategoryPublicRepository,
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
}
