import { PaginationListAbstract } from 'src/common/pagination/abstracts/pagination.abstract';
import {
	PaginationPage,
	PaginationLimit,
} from 'src/common/pagination/decorators/pagination.decorator';

import {
	PERMISSION_DEFAULT_LIMIT,
	PERMISSION_DEFAULT_PAGE,
} from 'src/modules/permission/constants';

export class FeedbackListDto implements PaginationListAbstract {
	@PaginationPage(PERMISSION_DEFAULT_PAGE)
	readonly page: number;

	@PaginationLimit(PERMISSION_DEFAULT_LIMIT)
	readonly limit: number;
}
