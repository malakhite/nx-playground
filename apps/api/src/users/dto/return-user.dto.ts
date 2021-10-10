import { Exclude } from 'class-transformer';
import type { Social } from '../interfaces/social.interface';

export class ReturnUserDto {
	id: string;
	email: string;
	name: string;
	bio: string;
	links?: Social[];
}
