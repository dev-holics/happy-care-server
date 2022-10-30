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
	CREATE_PRODUCT: {
		code: 40,
		name: 'create_product',
		description: 'can_create_product',
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
	UPDATE_CATEGORY: {
		code: 100,
		name: 'update_category',
		description: 'can_update_category',
		module: ENUM_PERMISSION_MODULE.CATEGORY,
	},
	UPDATE_PRODUCT: {
		code: 110,
		name: 'update_product',
		description: 'can_update_product',
		module: ENUM_PERMISSION_MODULE.PRODUCT,
	},
	READ_ALL_USER_CART: {
		code: 120,
		name: 'read_all_user_cart',
		description: 'can_read_all_user_cart',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	READ_USER_CART: {
		code: 130,
		name: 'read_user_cart',
		description: 'can_read_user_cart',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	CREATE_USER_CART: {
		code: 140,
		name: 'create_user_cart',
		description: 'can_create_user_cart',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	UPDATE_USER_CART: {
		code: 150,
		name: 'update_user_cart',
		description: 'can_update_user_cart',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	DELETE_USER_CART: {
		code: 160,
		name: 'delete_user_cart',
		description: 'can_delete_user_cart',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	CREATE_USER_CART_ITEM: {
		code: 170,
		name: 'create_user_cart_item',
		description: 'can_create_user_cart_item',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	UPDATE_USER_CART_ITEM: {
		code: 180,
		name: 'update_user_cart_item',
		description: 'can_update_user_cart_item',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	DELETE_USER_CART_ITEM: {
		code: 190,
		name: 'delete_user_cart_item',
		description: 'can_delete_user_cart_item',
		module: ENUM_PERMISSION_MODULE.CART,
	},
	CREATE_BRANCH: {
		code: 200,
		name: 'create_branch',
		description: 'can_create_branch',
		module: ENUM_PERMISSION_MODULE.BRANCH,
	},
	UPDATE_BRANCH: {
		code: 210,
		name: 'update_branch',
		description: 'can_update_branch',
		module: ENUM_PERMISSION_MODULE.BRANCH,
	},
	DELETE_BRANCH: {
		code: 220,
		name: 'delete_branch',
		description: 'can_delete_branch',
		module: ENUM_PERMISSION_MODULE.BRANCH,
	},
	CREATE_ORIGIN: {
		code: 230,
		name: 'create_origin',
		description: 'can_create_origin',
		module: ENUM_PERMISSION_MODULE.ORIGIN,
	},
	UPDATE_ORIGIN: {
		code: 240,
		name: 'update_origin',
		description: 'can_update_origin',
		module: ENUM_PERMISSION_MODULE.ORIGIN,
	},
	DELETE_ORIGIN: {
		code: 250,
		name: 'delete_origin',
		description: 'can_delete_origin',
		module: ENUM_PERMISSION_MODULE.ORIGIN,
	},
	CREATE_FEEDBACK: {
		code: 260,
		name: 'create_feedback',
		description: 'can_create_feedback',
		module: ENUM_PERMISSION_MODULE.FEEDBACK,
	},
	UPDATE_FEEDBACK: {
		code: 270,
		name: 'update_feedback',
		description: 'can_update_feedback',
		module: ENUM_PERMISSION_MODULE.FEEDBACK,
	},
	DELETE_FEEDBACK: {
		code: 280,
		name: 'delete_feedback',
		description: 'can_delete_feedback',
		module: ENUM_PERMISSION_MODULE.FEEDBACK,
	},
	READ_ALL_USER: {
		code: 290,
		name: 'read_all_user',
		description: 'can_read_all_user',
		module: ENUM_PERMISSION_MODULE.USER,
	},
	READ_USER: {
		code: 300,
		name: 'read_user',
		description: 'can_read_user',
		module: ENUM_PERMISSION_MODULE.USER,
	},
});
