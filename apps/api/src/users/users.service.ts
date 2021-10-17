import { sign } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Link } from './entities/links.entity';
import { User } from './entities/user.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,

		@InjectRepository(Link)
		private linksRepository: Repository<Link>,
	) {}

	async findAll(): Promise<User[]> {
		return await this.usersRepository.find({ relations: ['links'] });
	}

	async findOneById(id: string): Promise<User> {
		return await this.usersRepository.findOne(id, { relations: ['links'] });
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.usersRepository.findOne({
			where: { email },
			relations: ['links'],
		});
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const { email, name, password, bio, links } = createUserDto;

		const user = await this.findOneByEmail(email);

		if (user) {
			const errors = { email: 'Email must be unique.' };
			throw new HttpException(
				{ message: 'Input data validation failed', errors },
				HttpStatus.BAD_REQUEST,
			);
		}

		const newUser = new User();
		newUser.email = email;
		newUser.name = name;
		newUser.password = password;
		newUser.bio = bio;

		const savedUser = await this.usersRepository.save(newUser);

		const newLinks: CreateLinkDto[] = [];
		if (links) {
			links.forEach((link) =>
				newLinks.push({
					user_id: savedUser.id,
					...link,
				}),
			);
		}

		const savedLinks = await this.linksRepository.save(newLinks);
		savedUser.links = savedLinks;

		return savedUser;
	}

	public generateJWT(user: User) {
		const today = new Date();
		const exp = new Date(today);
		exp.setDate(today.getDate() + 60);

		return sign(
			{
				id: user.id,
				email: user.email,
				exp: exp.getTime() / 1000,
			},
			process.env.JWT_SECRET,
		);
	}
}
