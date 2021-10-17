/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(new ValidationPipe());
	const host = process.env.HOST || 'localhost';
	const port = process.env.PORT || 3333;
	await app.listen(port, host, () => {
		Logger.log('Listening at ' + host + ':' + port + '/' + globalPrefix);
	});
}

bootstrap();
