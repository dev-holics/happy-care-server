import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IDatabaseEntity } from 'src/common/database/interfaces/database.entity.interface';

export abstract class DatabaseEntityAbstract
	extends BaseEntity
	implements IDatabaseEntity
{
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		default: true,
	})
	isActive: boolean;

	@DeleteDateColumn({
		type: 'timestamp',
	})
	deletedAt: Date;

	@CreateDateColumn({
		type: 'timestamp',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updatedAt: Date;
}
