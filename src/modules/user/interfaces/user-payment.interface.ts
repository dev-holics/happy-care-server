import { UserSettingEntity } from 'src/modules/user/entities';

export interface IUserPayment {
	name: string;

	type: string;

	status: string;

	provider: string;

	accountNo: string;

	userSetting: UserSettingEntity;
}
