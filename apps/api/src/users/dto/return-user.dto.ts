import { Link } from '../entities/links.entity';

export class ReturnUserDto {
	id: string;
	email: string;
	name: string;
	bio: string;
	links?: Link[];
}
