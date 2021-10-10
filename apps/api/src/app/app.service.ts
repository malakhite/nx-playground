import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	findAll(): { message: string } {
		return { message: 'Welcome to api!' };
	}
}
