import { Organization } from "./Organization";
export interface Animal {
	id: string;
	service: "petfinder" | "shelterluv";
	name: string;
	type: string;
	sex: string;
	ageString: string;
	breed: string;
	location: string;

	link?: string;

	organization: Organization;
	organizationEmail: string;
	organizationPhone: string;

	description: string;
	photos: string[];
}
