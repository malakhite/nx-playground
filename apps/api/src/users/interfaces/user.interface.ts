import { Social } from './social.interface';

export interface User {
	id: string;
	email: string;
	password: string;
	create_date: Date;
	name: string;
	bio: string;
	links: Social[];
}
