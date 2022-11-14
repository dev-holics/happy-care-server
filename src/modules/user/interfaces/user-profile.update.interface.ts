import { ENUM_GENDERS } from 'src/modules/user/constants';

export interface IProfileUpdate {
	fullname: string;
	gender: ENUM_GENDERS;
	birthday: Date;
}
