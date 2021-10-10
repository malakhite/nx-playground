import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
	constructor(
		@InjectRepository(Article)
		private articlesRepository: Repository<Article>,
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
		const { authors, content, slug, title } = createArticleDto;
		const qb = this.articlesRepository.createQueryBuilder();
		await qb
			.insert()
			.into(Article)
			.values({
				content,
				slug,
				title,
				tsv: () =>
					"(setweight(to_tsvector('english', coalesce(title, ''), 'A') || (setweight(to_tsvector('english', coalesce(content, ''), 'B'))",
			})
			.execute();

		const article = await this.findOneBySlug(slug);

		await qb.relation(Article, 'authors').of(article).add(authors);

		return article;
	}
}
