import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettingEntity } from 'src/modules/user/entities';
import { DatabaseRepositoryAbstract } from 'src/common/database/abstracts/database.repository.abstract';

@Injectable()
export class UserSettingRepository extends DatabaseRepositoryAbstract<UserSettingEntity> {
	constructor(
		@InjectRepository(UserSettingEntity)
		private userSettingRepository: Repository<UserSettingEntity>,
	) {
		super(userSettingRepository);
	}
}
