export interface PetfinderAnimal {
	id: number;
	organization_id: string;
	orgName: string;
	url: string;
	type: string;
	breeds: {
		primary: string | null;
		secondary: string | null;
		mixed: boolean;
		unknown: boolean;
	};
	colors: {
		primary: string | null;
		secondary: string | null;
		tertiary: string | null;
	};
	age: string;
	gender: string;
	size: string;
	coat: string | null;
	attributes: {
		spayed_neutered: boolean;
		house_trained: boolean;
		declawed: boolean | null;
		special_needs: boolean;
		shots_current: boolean;
	};
	environment: {
		children: boolean;
		dogs: boolean;
		cats: boolean;
	};
	tags: string[];
	name: string;
	description: string;
	photos: {
		small: string;
		medium: string;
		large: string;
		full: string;
	}[];
	videos: {
		embed: string;
	}[];
	status: string;
	published_at: Date | string;
	contact: {
		email: string;
		phone: string;
		address: {
			address1: string;
			address2: string;
			city: string;
			state: string;
			postcode: string;
			country: string;
		};
	};
	_links: {
		self: {
			href: string;
		};
		type: {
			href: string;
		};
		organization: {
			href: string;
		};
	};
}
