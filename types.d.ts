export interface SanityImageAsset {
	_key?: string;
	_type: string;
	asset: {
		_ref: string;
		_type: string;
	};
	alt?: string;
}

export interface SanityItem {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
}

export interface PageContent extends SanityItem {
	title: string;
	pageUrl: { current: string };
	description: string;
	body: any;
}

export interface Category extends PageContent {
	title: string;
	categoryUrl: { current: string };
}

export interface Page extends PageContent {
	category: Category;
}

export interface Fundraiser extends PageContent {
	startDate: string;
	endDate: string;
	mainImage: SanityImageAsset;
}
