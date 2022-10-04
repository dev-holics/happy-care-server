import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatabaseOptionsService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: this.configService.get<string>('database.url'),
			host: this.configService.get<string>('database.host'),
			port: this.configService.get<number>('database.port'),
			username: this.configService.get<string>('database.username'),
			password: this.configService.get<string>('database.password'),
			database: this.configService.get<string>('database.name'),
			synchronize: this.configService.get<boolean>('database.synchronize'),
			dropSchema: false,
			keepConnectionAlive: true,
			logging:
				this.configService.get<boolean>('database.logging') &&
				this.configService.get<string>('app.env') !== 'production',
			autoLoadEntities: true,
			entities: [__dirname + '/../**/*.entity{.ts,.js}'],
			migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
			namingStrategy: new SnakeNamingStrategy(),
			extra: {
				// based on https://node-postgres.com/api/pool
				// max connection pool size
				max: this.configService.get('database.maxConnections'),
				ssl: this.configService.get('database.sslEnabled')
					? {
							rejectUnauthorized: this.configService.get(
								'database.rejectUnauthorized',
							),
							ca: this.configService.get('database.ca') ?? undefined,
							key: this.configService.get('database.key') ?? undefined,
							cert: this.configService.get('database.cert') ?? undefined,
					  }
					: undefined,
			},
		} as TypeOrmModuleOptions;
	}
}
