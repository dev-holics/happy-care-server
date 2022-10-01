export interface IUserCreate {
	readonly phoneNumber: string;

	readonly password: string;

	readonly fullname: string;

	readonly email?: string;

	readonly gender?: string;
}
