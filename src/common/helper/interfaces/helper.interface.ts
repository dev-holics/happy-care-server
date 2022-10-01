import {
	ENUM_HELPER_DATE_DIFF,
	ENUM_HELPER_DATE_FORMAT,
} from 'src/common/helper/constants';

// Date Helper
export interface IHelperDateOptions {
	timezone?: string;
}

export interface IHelperDateOptionsDiff extends IHelperDateOptions {
	format?: ENUM_HELPER_DATE_DIFF;
}

export interface IHelperDateOptionsCreate extends IHelperDateOptions {
	date?: string | number | Date;
}

export interface IHelperDateOptionsFormat extends IHelperDateOptions {
	format?: ENUM_HELPER_DATE_FORMAT | string;
}

export interface IHelperDateOptionsForward extends IHelperDateOptions {
	fromDate?: Date;
}

export type IHelperDateOptionsBackward = IHelperDateOptionsForward;

export interface IHelperDateOptionsMonth extends IHelperDateOptions {
	year?: number;
}

// Helper Encryption
export interface IHelperJwtVerifyOptions {
	audience: string;
	issuer: string;
	subject: string;
	secretKey: string;
}

export interface IHelperJwtOptions extends IHelperJwtVerifyOptions {
	expiredIn: number | string;
	notBefore?: number | string;
}

// Helper File
export type IHelperFileExcelRows = Record<string, string | number>;

// Helper String
export interface IHelperStringRandomOptions {
	upperCase?: boolean;
	safe?: boolean;
	prefix?: string;
}
