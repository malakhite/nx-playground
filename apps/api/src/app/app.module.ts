import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from '../articles/articles.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST || 'localhost',
			port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			synchronize: process.env.NODE_ENV === 'development',
			autoLoadEntities: process.env.NODE_ENV === 'development',
			logging: 'all',
		}),
		ArticlesModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
