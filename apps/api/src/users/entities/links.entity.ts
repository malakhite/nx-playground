import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

const LinkType = [
	'blog',
	'facebook',
	'github',
	'gitlab',
	'instagram',
	'other',
	'twitter',
	'youtube',
];
export type LinkType = typeof LinkType[number];

@Entity('links')
export class Link {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user) => user.links)
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
	})
	user_id: string;

	@Column()
	data: string;

	@Column({
		type: 'enum',
		enum: LinkType,
		default: 'other',
	})
	link_type: LinkType;

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
}
