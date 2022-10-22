import { applyDecorators, UsePipes } from '@nestjs/common';
import { isString, isEmpty, lowerize } from 'radash';
import { Expose, Transform, Type } from 'class-transformer';
import {
	IsOptional,
	ValidateIf,
	IsNotEmpty,
	IsDate,
	IsString,
} from 'class-validator';
import {
	PAGINATION_AVAILABLE_SORT,
	PAGINATION_MAX_PAGE,
	PAGINATION_MAX_LIMIT,
	PAGINATION_PAGE,
	PAGINATION_LIMIT,
	PAGINATION_SORT,
} from 'src/common/pagination/constants/pagination.constant';
import { ENUM_PAGINATION_AVAILABLE_SORT_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';
import {
	IPaginationFilterDateOptions,
	IPaginationFilterStringOptions,
} from 'src/common/pagination/interfaces/pagination.interface';
import { RequestAddDatePipe } from 'src/common/request/pipes/request.add-date.pipe';
import { MinGreaterThan } from 'src/common/request/validations/request.min-greater-than.validation';
import { Skip } from 'src/common/request/validations/request.skip.validation';
import { ILike, In } from 'typeorm';

export function PaginationSearch(availableSearch: string[]): any {
	return applyDecorators(
		Expose(),
		IsOptional(),
		ValidateIf(e => e.search !== ''),
		Transform(({ value }) => {
			if (!isString(value)) return value ?? [];
			const searchCriteria = [];
			availableSearch.forEach(searchKey => {
				searchCriteria.push({
					[searchKey]: ILike(`%${value}%`),
				});
			});
			return !isEmpty(searchCriteria) ? searchCriteria : [];
		}),
	);
}

export function PaginationAvailableSearch(availableSearch: string[]): any {
	return applyDecorators(
		Expose(),
		Transform(() => availableSearch),
	);
}

export function PaginationPage(page = PAGINATION_PAGE): any {
	return applyDecorators(
		Expose(),
		Type(() => Number),
		Transform(({ value }) =>
			!value ? page : value > PAGINATION_MAX_PAGE ? PAGINATION_MAX_PAGE : value,
		),
	);
}

export function PaginationLimit(limit = PAGINATION_LIMIT): any {
	return applyDecorators(
		Expose(),
		Type(() => Number),
		Transform(({ value }) =>
			!value
				? limit
				: value > PAGINATION_MAX_LIMIT
				? PAGINATION_MAX_LIMIT
				: value,
		),
	);
}

export function PaginationSort(
	sort = PAGINATION_SORT,
	availableSort = PAGINATION_AVAILABLE_SORT,
): any {
	return applyDecorators(
		Expose(),
		Transform(({ value, obj }) => {
			if (value && !isString(value)) return value;

			const bSort = PAGINATION_SORT.split('@')[0];
			const rSort = value || sort;

			const rAvailableSort = obj._availableSort || availableSort;
			const field: string = rSort.split('@')[0];
			const type: string = rSort.split('@')[1];
			const convertField: string = rAvailableSort.includes(field)
				? field
				: bSort;
			const convertType: number =
				type === 'desc'
					? ENUM_PAGINATION_AVAILABLE_SORT_TYPE.DESC
					: ENUM_PAGINATION_AVAILABLE_SORT_TYPE.ASC;

			return { [convertField]: convertType };
		}),
	);
}

export function PaginationAvailableSort(
	availableSort = PAGINATION_AVAILABLE_SORT,
): any {
	return applyDecorators(
		Expose(),
		Transform(({ value }) => (!value ? availableSort : value)),
	);
}

export function PaginationFilterBoolean(_defaultValue: boolean[]): any {
	return applyDecorators(
		Expose(),
		Transform(({ value }) => {
			if (!isString(value)) return undefined;
			return value === 'true';
		}),
	);
}

export function PaginationFilterNumber(): any {
	return applyDecorators(
		Expose(),
		Transform(({ value }) => {
			if (!isString(value)) return undefined;
			const formatted = value.split(',').map((val: string) => Number(val));
			return In(formatted) || undefined;
		}),
	);
}

export function PaginationFilterEnum<T>(defaultEnum: Record<string, any>): any {
	return applyDecorators(
		Expose(),
		Transform(({ value }) => {
			if (!isString(value)) return undefined;
			const formatted = value
				.split(',')
				.map((val: string) => lowerize(defaultEnum)[val.toLowerCase()]);
			return In(formatted) || undefined;
		}),
	);
}

export function PaginationFilterDate(
	field: string,
	options?: IPaginationFilterDateOptions,
): any {
	return applyDecorators(
		Expose(),
		IsDate(),
		Type(() => Date),
		options && options.required ? IsNotEmpty() : IsOptional(),
		options && options.required
			? Skip()
			: options.asEndDate
			? ValidateIf(
					e =>
						e[field] !== '' &&
						e[options.asEndDate.moreThanField] !== '' &&
						e[field] &&
						e[options.asEndDate.moreThanField],
			  )
			: ValidateIf(e => e[field] !== '' && e[field]),
		options && options.asEndDate
			? MinGreaterThan(options.asEndDate.moreThanField)
			: Skip(),
		options && options.asEndDate ? UsePipes(RequestAddDatePipe(1)) : Skip(),
	);
}

export function PaginationFilterString(
	field: string,
	options?: IPaginationFilterStringOptions,
) {
	return applyDecorators(
		Expose(),
		IsString(),
		options && options.lowercase
			? Transform(({ value }) =>
					value
						? value.split(',').map((val: string) => val.toLowerCase())
						: undefined,
			  )
			: Skip(),
		options && options.required ? IsNotEmpty() : IsOptional(),
		options && options.required
			? Skip()
			: ValidateIf(e => e[field] !== '' && e[field]),
	);
}
