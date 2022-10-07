import {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	Repository,
} from 'typeorm';
import {
	GeneralQueryType,
	IDatabaseCreateMany,
	IDatabaseCreateOne,
	IDatabaseDelete,
	IDatabaseFindAll,
	IDatabaseFindMany,
	IDatabaseFindOne,
	IDatabaseUpdateMany,
	IDatabaseUpdateOne,
} from 'src/common/database/interfaces/database.repository.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { PAGINATION_MAX_PER_PAGE } from 'src/common/pagination/constants';
import { ENUM_DATABASE_STATUS_CODE_ERROR } from 'src/common/database/constants';

@Injectable()
export abstract class DatabaseRepositoryAbstract<E> {
	protected _repository: Repository<E>;

	protected constructor(
		repository: Repository<E>,
		private readonly paginationService?: PaginationService,
	) {
		this._repository = repository;
	}

	initGeneralQuery(
		query: GeneralQueryType<E>,
	): FindOneOptions<E> | FindManyOptions<E> {
		const initWhereOptions = Object.assign(
			{
				isActive: true,
			},
			query?.where || {},
		);

		let initQuery: FindOneOptions<E> | FindManyOptions<E> = {
			where: initWhereOptions,
			relations: query?.options?.relations || {},
			select: query?.options?.select || undefined,
			transaction: query?.options?.transaction || true,
			order: query?.options?.order || {},
			withDeleted: query?.options?.withDeleted || false,
		};

		if (
			query?.options?.hasOwnProperty('page') &&
			query?.options?.hasOwnProperty('limit')
		) {
			const skip = this.paginationService.skip(
				(query as IDatabaseFindMany<E>).options.page,
				(query as IDatabaseFindMany<E>).options.limit,
			);
			const take = Math.min(
				(query as IDatabaseFindMany<E>).options.limit,
				PAGINATION_MAX_PER_PAGE,
			);
			initQuery = {
				...initQuery,
				skip,
				take,
			};
		}

		return initQuery;
	}

	async findOne<Y = E>(query: IDatabaseFindOne<E>): Promise<E> {
		const initQuery = this.initGeneralQuery(query);

		return this._repository.findOne(initQuery);
	}

	async findMany<Y = E>(query: IDatabaseFindMany<E>): Promise<E[]> {
		const initQuery = this.initGeneralQuery(query);

		return this._repository.find(initQuery);
	}

	async findAll<Y = E>(query: IDatabaseFindAll<E>): Promise<E[]> {
		const initQuery = this.initGeneralQuery(query);

		return this._repository.find(initQuery);
	}

	async createOne<Y = E>(
		createQuery: IDatabaseCreateOne<E>,
	): Promise<DeepPartial<E> & E> {
		return this._repository.save(createQuery.data, createQuery.options);
	}

	createMany<Y = E>(
		createQuery: IDatabaseCreateMany<E>,
	): Promise<(DeepPartial<E> & E)[]> {
		return this._repository.save(createQuery.data, createQuery.options);
	}

	async updateOne<Y = E>(
		updateQuery: IDatabaseUpdateOne<E>,
	): Promise<DeepPartial<E> & E> {
		const entityExisted =
			(await this.findOne({
				where: updateQuery.criteria,
			})) || {};

		if (!entityExisted) {
			throw new BadRequestException({
				statusCode:
					ENUM_DATABASE_STATUS_CODE_ERROR.DATABASE_DATA_NOT_EXIST_ERROR,
				message: 'data.error.dataNotExisted',
			});
		}

		return this._repository.save({
			...entityExisted,
			...updateQuery.data,
		});
	}

	updateMany<Y = E>(updateQuery: IDatabaseUpdateMany<E>) {
		return this._repository.update(updateQuery.criteria, updateQuery.data);
	}

	delete<Y = E>(deleteCriteria: IDatabaseDelete<E>) {
		return this._repository.softDelete(deleteCriteria);
	}

	hardDelete<Y = E>(deleteCriteria: IDatabaseDelete<E>) {
		return this._repository.delete(deleteCriteria);
	}

	count(countQuery: IDatabaseFindMany<E>) {
		const initQuery = this.initGeneralQuery(countQuery);

		return this._repository.count(initQuery);
	}

	async checkExists(where: Record<string, any>): Promise<boolean> {
		const entityExisted = await this.findOne({
			where,
		});

		return !!entityExisted;
	}
}
