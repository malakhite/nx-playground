import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.usersService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, password))) {
			return user;
		}
		return null;
	}

	async login(user: User) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
