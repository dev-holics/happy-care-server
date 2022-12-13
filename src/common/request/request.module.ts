import {
	HttpStatus,
	Module,
	UnprocessableEntityException,
	ValidationError,
	ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from 'src/common/request/constants';
import { RequestTimestampInterceptor } from 'src/common/request/interceptors/request.timestamp.interceptor';
import { IsPasswordMediumConstraint } from 'src/common/request/validations/request.is-password-medium.validation';
import { IsPasswordStrongConstraint } from 'src/common/request/validations/request.is-password-strong.validation';
import { IsPasswordWeakConstraint } from 'src/common/request/validations/request.is-password-weak.validation';
import { IsStartWithConstraint } from 'src/common/request/validations/request.is-start-with.validation';
import { MaxGreaterThanConstraint } from 'src/common/request/validations/request.max-greater-than.validation';
import { MaxGreaterThanEqualConstraint } from 'src/common/request/validations/request.max-greater-than-equal.validation';
import { MinGreaterThanConstraint } from 'src/common/request/validations/request.min-greater-than.validation';
import { MinGreaterThanEqualConstraint } from 'src/common/request/validations/request.min-greater-than-equal.validation';
import { SkipConstraint } from 'src/common/request/validations/request.skip.validation';
import { StringOrNumberOrBooleanConstraint } from 'src/common/request/validations/request.string-or-number-or-boolean.validation';
import { SafeStringConstraint } from 'src/common/request/validations/request.safe-string.validation';
import { IsOnlyDigitsConstraint } from 'src/common/request/validations/request.only-digits.validation';
import { MinDateTodayEqualConstraint } from 'src/common/request/validations/request.min-date-equal.validation';

@Module({
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useFactory: () =>
				new ValidationPipe({
					transform: true,
					skipNullProperties: false,
					skipUndefinedProperties: false,
					skipMissingProperties: false,
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					exceptionFactory: async (errors: ValidationError[]) => {
						new UnprocessableEntityException({
							statusCode:
								ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
							message: 'http.clientError.unprocessableEntity',
							errors,
						});
					},
				}),
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: RequestTimestampInterceptor,
		},
		// IsPasswordWeakConstraint,
		// IsPasswordMediumConstraint,
		// IsPasswordStrongConstraint,
		// IsStartWithConstraint,
		// MaxGreaterThanConstraint,
		// MaxGreaterThanEqualConstraint,
		// MinGreaterThanConstraint,
		// MinGreaterThanEqualConstraint,
		// SkipConstraint,
		// StringOrNumberOrBooleanConstraint,
		// SafeStringConstraint,
		// IsOnlyDigitsConstraint,
		// MinDateTodayEqualConstraint,
	],
	imports: [],
})
export class RequestModule {}
