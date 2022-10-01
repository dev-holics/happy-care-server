import { ENUM_PAGINATION_AVAILABLE_SORT_TYPE } from 'src/common/pagination/constants';

export type IPaginationSort = Record<
	string,
	ENUM_PAGINATION_AVAILABLE_SORT_TYPE
>;

export interface IPaginationOptions {
	limit: number;
	skip: number;
	sort?: IPaginationSort;
}

export interface IPaginationFilterOptions {
	required?: boolean;
}

export interface IPaginationFilterDateOptions
	extends IPaginationOptions,
		IPaginationFilterOptions {
	asEndDate?: {
		moreThanField?: string;
		lessThanField?: string;
	};
}

export interface IPaginationFilterStringOptions
	extends IPaginationFilterOptions {
	lowercase?: boolean;
	caseSensitive: boolean;
}
