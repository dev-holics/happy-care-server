import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { IApiKeyEntity } from 'src/common/auth/interfaces/auth.api-key.entity.interface';
import { Column, Entity, Index } from 'typeorm';

@Entity('api_keys')
export class ApiKeyEntity
	extends DatabaseEntityAbstract
	implements IApiKeyEntity
{
	@Index()
	@Column({
		length: 2000,
		transformer: {
			from: (value: string) => value,
			to: (value: string) => value.toLowerCase(),
		},
	})
	name: string;

	@Column({
		nullable: true,
	})
	description: string;

	@Index()
	@Column({
		unique: true,
		transformer: {
			from: (value: string) => value,
			to: (value: string) => value.trim(),
		},
	})
	key: string;

	@Column({
		transformer: {
			from: (value: string) => value,
			to: (value: string) => value.trim(),
		},
	})
	hash: string;

	@Index()
	@Column({
		transformer: {
			from: (value: string) => value,
			to: (value: string) => value.trim(),
		},
	})
	encryptionKey: string;

	@Column({
		transformer: {
			from: (value: string) => value,
			to: (value: string) => value.trim(),
		},
		length: 16,
	})
	passphrase: string;

	@Index()
	@Column({
		default: true,
	})
	isActive: boolean;
}
