import { ProductEntity } from 'src/modules/product/entities';
import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ITagEntity } from 'src/modules/tag/interfaces/tag.interface';
import { snakeCase } from 'change-case';

@Entity('tags')
export class TagEntity extends DatabaseEntityAbstract implements ITagEntity {
	@Column({ unique: true })
	name: string;

	@Column({ nullable: true })
	description: string;

	@ManyToMany(() => ProductEntity, product => product.tags)
	@JoinTable({
		name: 'product_tags',
		joinColumn: {
			name: snakeCase('tagId'),
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: snakeCase('productId'),
			referencedColumnName: 'id',
		},
	})
	products: ProductEntity[];
}
