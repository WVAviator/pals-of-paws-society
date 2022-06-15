import { Organization } from "./Organization";
export interface Animal {
	id: string;
	name: string;
	type: string;
	sex: string;
	ageString: string;
	breed: string;
	location: string;

	link?: string;

	organization: Organization;

	description: string;
	photos: string[];
}
