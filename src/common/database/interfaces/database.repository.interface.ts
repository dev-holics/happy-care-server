import { DeepPartial, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// Find interfaces
export interface IDatabaseFindOneOptions<Entity> {
	select?: FindOptionsSelect<Entity>;
	relations?: Record<string, any>;
	order?: Record<string, any>;
	transaction?: boolean;
	withDeleted?: boolean;
}

export interface IDatabaseFindOne<Entity> {
	where?: Record<string, any>;
	options?: IDatabaseFindOneOptions<Entity>;
}

export interface IDatabaseFindManyOptions<Entity>
	extends IDatabaseFindOneOptions<Entity> {
	page: number;
	limit: number;
}

export interface IDatabaseFindMany<Entity> {
	where?: Record<string, any> | Record<string, any>[];
	options?: IDatabaseFindManyOptions<Entity>;
}

export type IDatabaseFindAllOptions<Entity> = IDatabaseFindOneOptions<Entity>;

export interface IDatabaseFindAll<Entity> {
	where?: Record<string, any>;
	options?: IDatabaseFindAllOptions<Entity>;
}

export type GeneralQueryType<Entity> =
	| IDatabaseFindMany<Entity>
	| IDatabaseFindOne<Entity>
	| IDatabaseFindAll<Entity>;

// Create interfaces
export interface IDatabaseCreateOptions {
	listeners?: boolean;
	transaction?: boolean;
	chunk?: number;
}

export interface IDatabaseCreateOne<Entity> {
	data?: DeepPartial<Entity>;
	options?: IDatabaseCreateOptions;
}

export interface IDatabaseCreateMany<Entity> {
	data?: DeepPartial<Entity>[];
	options?: IDatabaseCreateOptions;
}

// Update interfaces
export interface IDatabaseUpdateOne<Entity> {
	criteria: FindOptionsWhere<Entity>;
	data: DeepPartial<Entity>;
}

export interface IDatabaseUpdateMany<Entity> {
	criteria: Record<string, any>;
	data: QueryDeepPartialEntity<Entity>;
}

// Delete interfaces
export type IDatabaseDelete<Entity> = FindOptionsWhere<Entity>;
