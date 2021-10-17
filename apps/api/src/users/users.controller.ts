import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(':id')
	async findOneById(@Param('id') id: string): Promise<User> {
		return await this.usersService.findOneById(id);
	}

	@Get('email/:email')
	async findOneByEmail(@Param('email') email: string): Promise<User> {
		return await this.usersService.findOneByEmail(email);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.createUser(createUserDto);
	}
}
