import { Column, Entity, OneToMany } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IImageEntity } from 'src/common/media/interfaces/image.entity.interface';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Entity('images')
export class ImageEntity
	extends DatabaseEntityAbstract
	implements IImageEntity
{
	@Column({
		length: 2000,
		nullable: true,
	})
	url: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	publicId: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	fileName: string;

	@Column({
		length: 1000,
		nullable: true,
	})
	description: string;

	@Column({
		nullable: true,
		unsigned: true,
	})
	width: number;

	@Column({
		nullable: true,
		unsigned: true,
	})
	height: number;

	@OneToMany(() => UserEntity, user => user.photo)
	users: UserEntity[];

	@OneToMany(() => CategoryEntity, category => category.image)
	categories: CategoryEntity[];
}
