import { IsLowercase, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
	@IsNotEmpty()
	@IsLowercase()
	slug: string;

	@IsNotEmpty()
	title: string;

	@IsUUID('all', { each: true })
	authors: string[];

	@IsString()
	content: string;
}
