import { Column, Entity } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';

@Entity('api_keys')
export class ApiKeyEntity extends DatabaseEntityAbstract {
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
}
