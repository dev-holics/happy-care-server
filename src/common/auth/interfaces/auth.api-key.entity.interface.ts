export interface IApiKeyEntity {
	name: string;

	description: string;

	key: string;

	hash: string;

	encryptionKey: string;

	passphrase: string;
}
