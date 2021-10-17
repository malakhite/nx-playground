import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { Link } from './links.entity';

const Role = ['admin', 'author', 'editor', 'inactive', 'guest'] as const;
export type Role = typeof Role[number];

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true })
	@IsEmail()
	email: string;

	@Exclude()
	@Column('varchar')
	password: string;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await argon2.hash(this.password);
	}

	@Column('varchar')
	name: string;

	@Column({
		nullable: true,
		type: 'text',
	})
	bio: string;

	@Exclude()
	@Column({
		type: 'enum',
		enum: Role,
		default: 'guest',
	})
	role: Role;

	@OneToMany(() => Link, (link) => link.user_id)
	links: Link[];

	@ManyToMany(() => Article, (article) => article.authors)
	articles: Article[];

	@CreateDateColumn({
		type: 'timestamptz',
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
	})
	updated_at: Date;

	@DeleteDateColumn({
		type: 'timestamptz',
	})
	deleted_at: Date;

	@VersionColumn()
	version: number;
}
