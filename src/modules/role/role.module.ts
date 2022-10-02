import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { RoleRepository } from 'src/modules/role/repositories/role.repository';

@Module({
	controllers: [],
	providers: [RoleRepository],
	exports: [RoleRepository],
	imports: [TypeOrmModule.forFeature([RoleEntity])],
})
export class RoleModule {}
