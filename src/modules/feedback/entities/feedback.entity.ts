import { DatabaseEntityAbstract } from 'src/common/database/abstracts/database.entity.abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IFeedbackEntity } from 'src/modules/feedback/interfaces';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { snakeCase } from 'change-case';
import { ProductEntity } from 'src/modules/product/entities';

@Entity('feedbacks')
export class FeedbackEntity
	extends DatabaseEntityAbstract
	implements IFeedbackEntity
{
	@Column({ type: 'numeric', default: 0 })
	rating: number;

	@Column()
	content: string;

	@ManyToOne(() => UserEntity, user => user.feedbacks)
	@JoinColumn({ name: snakeCase('userId'), referencedColumnName: 'id' })
	user: UserEntity;

	@ManyToOne(() => ProductEntity, product => product.feedbacks)
	@JoinColumn({ name: snakeCase('productId'), referencedColumnName: 'id' })
	product: ProductEntity;
}
