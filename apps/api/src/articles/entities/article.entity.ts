import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('articles')
export class Article {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true })
	@Index('slug_idx', { unique: true })
	slug: string;

	@Column('varchar')
	title: string;

	@ManyToMany(() => User, (user) => user.articles)
	@JoinTable({
		joinColumn: {
			name: 'article_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'author_id',
			referencedColumnName: 'id',
		},
	})
	authors: User[];

	@Column({
		type: 'text',
	})
	content: string;

	@Exclude()
	@CreateDateColumn({
		type: 'timestamptz',
	})
	created_at: Date;

	@Exclude()
	@UpdateDateColumn({
		type: 'timestamptz',
	})
	updated_at: Date;

	@Exclude()
	@DeleteDateColumn({
		type: 'timestamptz',
	})
	deleted_at: Date;

	@Exclude()
	@VersionColumn()
	version: number;

	@Column({ type: 'tsvector' })
	@Index('tsv_idx', { synchronize: false })
	tsv: string;
}
