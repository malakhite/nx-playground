import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
	constructor(private articlesService: ArticlesService) {}

	@Get()
	async findAll(): Promise<Article[]> {
		return await this.articlesService.findAll();
	}

	@Get(':id')
	async findOneById(@Param('id') id: string): Promise<Article> {
		return await this.articlesService.findOneById(id);
	}

	@Get('slug/:slug')
	async findOneBySlug(@Param('slug') slug: string): Promise<Article> {
		return await this.articlesService.findOneBySlug(slug);
	}

	@Post()
	async create(@Body() createArticleDto: CreateArticleDto) {
		return await this.articlesService.createArticle(createArticleDto);
	}
}
