import { ENUM_GENDERS } from './../constants/user.enum.constant';

export interface IUserUpdate {
	fullname: string;
	gender: ENUM_GENDERS;
	birthday: Date;
}
