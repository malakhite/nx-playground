import { IsNotEmpty } from 'class-validator';
import { LinkType } from '../entities/links.entity';
import { User } from '../entities/user.entity';

export class CreateLinkDto {
	user_id?: string;

	@IsNotEmpty()
	link_type: LinkType;

	@IsNotEmpty()
	data: string;
}
