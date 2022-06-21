export interface Organization {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: {
		address1: string;
		address2?: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
	website: string | null;

	social_media?: {
		facebook?: string | null;
	};
	_links?: {
		self?: {
			href: string;
		};
		animals?: {
			href: string;
		};
	};
}
