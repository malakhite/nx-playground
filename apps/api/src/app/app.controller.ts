import {
	ClassSerializerInterceptor,
	Controller,
	Post,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@UseInterceptors(ClassSerializerInterceptor)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}
