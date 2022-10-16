import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Entity('aws_files')
export class AwsFileEntity extends DatabaseEntityAbstract {
	@Column({
		length: 1000,
		nullable: true,
	})
	path: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	pathWithFileName: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	fileName: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	completedUrl: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	baseUrl: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	mime: string;

	@OneToMany(() => UserEntity, user => user.photo)
	users: UserEntity[];

	@OneToMany(() => CategoryEntity, category => category.image)
	categories: CategoryEntity[];
}
