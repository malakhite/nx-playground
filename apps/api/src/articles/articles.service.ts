import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
	constructor(
		@InjectRepository(Article)
		private articlesRepository: Repository<Article>,

		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async findAll(): Promise<Article[]> {
		return await this.articlesRepository.find();
	}

	async findOneById(id: string): Promise<Article> {
		return await this.articlesRepository.findOne(id);
	}

	async findOneBySlug(slug: string): Promise<Article> {
		return await this.articlesRepository.findOne({ where: { slug } });
	}

	async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
		const { authors: authorIds, content, slug, title } = createArticleDto;

		const authors = await this.usersRepository.findByIds(authorIds);
		const article = new Article();
		article.authors = authors;
		article.content = content;
		article.slug = slug;
		article.title = title;

		const savedArticle = await this.articlesRepository.save(article);

		return savedArticle;
	}
}
