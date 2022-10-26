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
		code: 10,
		name: 'read_user_profile',
		description: 'can_read_user_profile',
		module: ENUM_PERMISSION_MODULE.USER,
	},
	UPDATE_USER_PROFILE: {
		code: 20,
		name: 'update_user_profile',
		description: 'can_update_user_profile',
		module: ENUM_PERMISSION_MODULE.USER,
	},
	CREATE_CATEGORY: {
		code: 30,
		name: 'create_category',
		description: 'can_create_category',
		module: ENUM_PERMISSION_MODULE.CATEGORY,
	},
	UPDATE_CATEGORY: {
		code: 31,
		name: 'update_category',
		description: 'can_update_category',
		module: ENUM_PERMISSION_MODULE.CATEGORY,
	},
	CREATE_PRODUCT: {
		code: 40,
		name: 'create_product',
		description: 'can_create_product',
		module: ENUM_PERMISSION_MODULE.PRODUCT,
	},
	UPDATE_PRODUCT: {
		code: 41,
		name: 'update_product',
		description: 'can_update_product',
		module: ENUM_PERMISSION_MODULE.PRODUCT,
	},
	CREATE_PERMISSION: {
		code: 50,
		name: 'create_permission',
		description: 'can_create_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
	READ_PERMISSION: {
		code: 60,
		name: 'read_permission',
		description: 'can_read_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
	UPDATE_PERMISSION: {
		code: 70,
		name: 'update_permission',
		description: 'can_update_permission',
		module: ENUM_PERMISSION_MODULE.PERMISSION,
	},
	READ_ROLE: {
		code: 80,
		name: 'read_role',
		description: 'can_read_role',
		module: ENUM_PERMISSION_MODULE.ROLE,
	},
	UPDATE_ROLE: {
		code: 90,
		name: 'update_role',
		description: 'can_update_role',
		module: ENUM_PERMISSION_MODULE.ROLE,
	},
});
