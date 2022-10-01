import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IHelperDateService } from '../interfaces/helper.date-service.interface';
import {
	IHelperDateOptions,
	IHelperDateOptionsBackward,
	IHelperDateOptionsCreate,
	IHelperDateOptionsDiff,
	IHelperDateOptionsFormat,
	IHelperDateOptionsForward,
	IHelperDateOptionsMonth,
} from 'src/common/helper/interfaces/helper.interface';
import {
	ENUM_HELPER_DATE_DIFF,
	ENUM_HELPER_DATE_FORMAT,
} from 'src/common/helper/constants';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(duration);

@Injectable()
export class HelperDateService implements IHelperDateService {
	private readonly timezone: string;

	constructor(private readonly configService: ConfigService) {
		this.timezone = this.configService.get<string>('app.timezone');
	}

	calculateAge(dateOfBirth: Date, options?: IHelperDateOptions): number {
		return dayjs
			.tz(options?.timezone ?? this.timezone)
			.diff(dateOfBirth, 'years');
	}

	diff(dateOne: Date, dateTwo: Date, options?: IHelperDateOptionsDiff): number {
		const mDateOne = dayjs.tz(dateOne, options?.timezone ?? this.timezone);
		const mDateTwo = dayjs.tz(dateTwo, options?.timezone ?? this.timezone);

		const diff = dayjs.duration(mDateTwo.diff(mDateOne));

		if (options?.format) {
			switch (options.format) {
				case ENUM_HELPER_DATE_DIFF.MILIS:
					return diff.asMilliseconds();
				case ENUM_HELPER_DATE_DIFF.SECONDS:
					return diff.asSeconds();
				case ENUM_HELPER_DATE_DIFF.HOURS:
					return diff.asHours();
				case ENUM_HELPER_DATE_DIFF.MINUTES:
					return diff.asMinutes();
				default:
					return diff.asDays();
			}
		}
	}

	check(date: string | Date | number, options?: IHelperDateOptions): boolean {
		return dayjs(date)
			.tz(options?.timezone ?? this.timezone)
			.isValid();
	}

	checkTimestamp(timestamp: number, options?: IHelperDateOptions): boolean {
		return dayjs(timestamp)
			.tz(options?.timezone ?? this.timezone)
			.isValid();
	}

	checkTimezone(timezone: string): boolean {
		return !!dayjs().tz(timezone);
	}

	create(options?: IHelperDateOptionsCreate): Date {
		return dayjs
			.tz(options?.date ?? undefined, options?.timezone ?? this.timezone)
			.toDate();
	}

	timestamp(options?: IHelperDateOptionsCreate): number {
		return dayjs
			.tz(options?.date ?? undefined, options?.timezone ?? this.timezone)
			.valueOf();
	}

	format(date: Date, options?: IHelperDateOptionsFormat): string {
		return dayjs
			.tz(date, options?.timezone ?? this.timezone)
			.format(options?.format ?? ENUM_HELPER_DATE_FORMAT.DATE);
	}

	forwardInMilliseconds(
		milliseconds: number,
		options?: IHelperDateOptionsForward,
	): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.add(milliseconds, 'ms')
			.toDate();
	}

	backwardInMilliseconds(
		milliseconds: number,
		options?: IHelperDateOptionsBackward,
	): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.subtract(milliseconds, 'ms')
			.toDate();
	}

	forwardInSeconds(seconds: number, options?: IHelperDateOptionsForward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.add(seconds, 's')
			.toDate();
	}

	backwardInSeconds(
		seconds: number,
		options?: IHelperDateOptionsBackward,
	): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.subtract(seconds, 's')
			.toDate();
	}

	forwardInMinutes(minutes: number, options?: IHelperDateOptionsForward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.add(minutes, 'm')
			.toDate();
	}

	backwardInMinutes(
		minutes: number,
		options?: IHelperDateOptionsBackward,
	): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.subtract(minutes, 'm')
			.toDate();
	}

	forwardInDays(days: number, options?: IHelperDateOptionsForward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.add(days, 'd')
			.toDate();
	}

	backwardInDays(days: number, options?: IHelperDateOptionsBackward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.subtract(days, 'd')
			.toDate();
	}

	forwardInMonths(months: number, options?: IHelperDateOptionsForward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.add(months, 'M')
			.toDate();
	}

	backwardInMonths(months: number, options?: IHelperDateOptionsBackward): Date {
		return dayjs
			.tz(options?.fromDate ?? undefined, options?.timezone ?? this.timezone)
			.subtract(months, 'M')
			.toDate();
	}

	endOfMonth(month: number, options?: IHelperDateOptionsMonth): Date {
		const year =
			options?.year ?? dayjs.tz(options?.timezone ?? this.timezone).year();
		return dayjs
			.tz(options?.timezone ?? this.timezone)
			.year(year)
			.month(month - 1)
			.endOf('month')
			.toDate();
	}

	startOfMonth(month: number, options?: IHelperDateOptionsMonth): Date {
		const year =
			options?.year ?? dayjs.tz(options?.timezone ?? this.timezone).year();
		return dayjs
			.tz(options?.timezone ?? this.timezone)
			.year(year)
			.month(month - 1)
			.startOf('month')
			.toDate();
	}

	endOfYear(year: number, options?: IHelperDateOptions): Date {
		return dayjs
			.tz(options?.timezone ?? this.timezone)
			.year(year)
			.endOf('year')
			.toDate();
	}

	startOfYear(year: number, options?: IHelperDateOptions): Date {
		return dayjs
			.tz(options?.timezone ?? this.timezone)
			.year(year)
			.startOf('year')
			.toDate();
	}

	endOfDay(date?: Date, options?: IHelperDateOptions): Date {
		return dayjs
			.tz(date, options?.timezone ?? this.timezone)
			.endOf('day')
			.toDate();
	}

	startOfDay(date?: Date, options?: IHelperDateOptions): Date {
		return dayjs
			.tz(date, options?.timezone ?? this.timezone)
			.startOf('day')
			.toDate();
	}
}
