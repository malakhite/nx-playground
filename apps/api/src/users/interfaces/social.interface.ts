export type SocialService =
	| 'blog'
	| 'facebook'
	| 'instagram'
	| 'other'
	| 'twitter'
	| 'website'
	| 'youtube';

export interface Social {
	id: string;
	user_id: string;
	service: SocialService;
	data: string;
}
