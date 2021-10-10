import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateLinkDto } from './create-link.dto';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	name: string;

	bio?: string;

	@ValidateNested({ each: true })
	links?: CreateLinkDto[];
}
