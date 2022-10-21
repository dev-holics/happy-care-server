/* eslint-disable @typescript-eslint/naming-convention */
import { ENUM_PERMISSION_MODULE } from 'src/modules/permission/constants';

export const PERMISSIONS = Object.freeze({
	BASIC: {
		code: 0,
		name: 'basic',
		description: 'Basic permission',
		module: ENUM_PERMISSION_MODULE.BASIC,
	},
	READ_USER_PROFILE: {
		code: 1,
		name: 'read_user_profile',
		description: 'can_read_user_profile',
		module: ENUM_PERMISSION_MODULE.USER,
	},
	UPDATE_USER_PROFILE: {
		code: 2,
		name: 'update_user_profile',
		description: 'can_update_user_profile',
		module: ENUM_PERMISSION_MODULE.USER,
	},
	CREATE_CATEGORY: {
		code: 3,
		name: 'create_category',
		description: 'can_create_category',
		module: ENUM_PERMISSION_MODULE.CATEGORY,
	},
	CREATE_PRODUCT: {
		code: 4,
		name: 'create_product',
		description: 'can_create_product',
		module: ENUM_PERMISSION_MODULE.PRODUCT,
	},
	CREATE_PERMISSION: {
		code: 5,
		name: 'create_permission',
		description: 'can_create_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
	READ_PERMISSION: {
		code: 6,
		name: 'read_permission',
		description: 'can_read_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
	UPDATE_PERMISSION: {
		code: 7,
		name: 'update_permission',
		description: 'can_update_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
});
