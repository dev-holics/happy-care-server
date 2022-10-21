export interface IPaginationService {
	skip(page: number, limit: number): number;

	totalPage(totalData: number, limit: number): number;
}
