export interface Animal {
	id: number;
	service: "petfinder" | "shelterluv";
	name: string;
	type: string;
	sex: string;
	ageString: string;
	breed: string;
	location: string;

	organization: string;
	organizationEmail: string;
	organizationPhone: string;

	description: string;
	photos: string[];
}
