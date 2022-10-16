import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Unique,
} from 'typeorm';
import { snakeCase } from 'change-case';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { AwsFileEntity } from 'src/common/aws/entities/aws.file.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ICategoryEntity } from 'src/modules/category/interfaces/category.entity.interface';

@Entity('categories')
@Unique(['order', 'parent'])
export class CategoryEntity
	extends DatabaseEntityAbstract
	implements ICategoryEntity
{
	@Column({
		length: 255,
		unique: true,
	})
	name: string;

	@Column({
		nullable: true,
	})
	description: string;

	@Column({
		unsigned: true,
	})
	order: number;

	@ManyToOne(() => AwsFileEntity, awsFile => awsFile.categories, {
		nullable: true,
	})
	@JoinColumn({ name: snakeCase('imageId'), referencedColumnName: 'id' })
	image: AwsFileEntity;

	@ManyToOne(() => CategoryEntity, parent => parent.children)
	@JoinColumn({ name: snakeCase('parentId'), referencedColumnName: 'id' })
	parent: CategoryEntity;

	@OneToMany(() => CategoryEntity, child => child.parent)
	children: CategoryEntity[];

	@OneToMany(() => ProductEntity, product => product.category)
	products: ProductEntity[];
}
