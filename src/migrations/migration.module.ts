import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoleSeed } from 'src/migrations/seeds/role.seed';

@Module({
	imports: [CommonModule, CommandModule, UserModule, RoleModule],
	providers: [RoleSeed],
	exports: [],
})
export class MigrationModule {}
