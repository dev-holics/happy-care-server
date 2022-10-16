/* eslint-disable @typescript-eslint/naming-convention */
export const PERMISSIONS = Object.freeze({
	BASIC: {
		code: 0,
		name: 'basic',
		description: 'Basic permission',
		module: 'basic',
	},
	USER_GET_PROFILE: {
		code: 1,
		name: 'user_get_profile',
		description: 'user_can_get_profile',
		module: 'users',
	},
	USER_UPDATE_PROFILE: {
		code: 2,
		name: 'user_update_profile',
		description: 'user_can_update_profile',
		module: 'users',
	},
	USER_CREATE_CATEGORY: {
		code: 3,
		name: 'user_create_category',
		description: 'user_can_create_category',
		module: 'users',
	},
});
