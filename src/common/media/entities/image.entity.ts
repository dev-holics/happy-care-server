import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IImageEntity } from 'src/common/media/interfaces/image.entity.interface';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { snakeCase } from 'change-case';
import { ProductEntity } from 'src/modules/product/entities';

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

	@ManyToOne(() => UserEntity, user => user.photos, { nullable: true })
	@JoinColumn({ name: snakeCase('userId'), referencedColumnName: 'id' })
	user: UserEntity;

	@ManyToOne(() => CategoryEntity, category => category.images, {
		nullable: true,
	})
	@JoinColumn({ name: snakeCase('categoryId'), referencedColumnName: 'id' })
	categorie: CategoryEntity;

	@ManyToOne(() => ProductEntity, product => product.images, { nullable: true })
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;
}
