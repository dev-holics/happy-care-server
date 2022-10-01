export interface IPaginationService {
	skip(page: number, perPage: number): number;

	totalPage(totalData: number, limit: number): number;
}
