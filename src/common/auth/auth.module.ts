import { Global, Module } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/common/auth/entities/auth.token.entity';
import { AuthTokenRepository } from 'src/common/auth/repositories/auth.token.repository';
import { JwtRefreshStrategy } from 'src/common/auth/guards/jwt-refresh/auth.jwt-refresh.strategy';
import { AuthApiService } from 'src/common/auth/services/auth.api.service';
import { AuthApiKeyRepository } from 'src/common/auth/repositories/auth.api-key.repository';
import { ApiKeyEntity } from 'src/common/auth/entities/auth.api-key.entity';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Global()
@Module({
	controllers: [],
	providers: [
		AuthService,
		AuthApiService,
		AuthTokenRepository,
		AuthApiKeyRepository,
		JwtRefreshStrategy,
	],
	exports: [AuthService, AuthTokenRepository],
	imports: [
		TypeOrmModule.forFeature([TokenEntity, ApiKeyEntity]),
		PermissionModule,
	],
})
export class AuthModule {}
