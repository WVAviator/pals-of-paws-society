import { Animal } from "../types/Animal";
import { Organization } from "../types/Organization";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";
export const convertShelterluvAnimal = (shelterluvAnimal: ShelterluvAnimal) => {
	const animal: Animal = {
		id: `sl${shelterluvAnimal["Internal-ID"]}`,
		name: shelterluvAnimal.Name,
		type: shelterluvAnimal.Type.toLowerCase(),
		sex: shelterluvAnimal.Sex.toLowerCase(),
		ageString: parseAgeString(shelterluvAnimal.Age),
		breed: shelterluvAnimal.Breed,
		location: "Hernando, MS",
		organization: PalsOfPawsSociety,
		description: shelterluvAnimal.Description,
		photos: shelterluvAnimal.Photos,
	};
	return animal;
};

const parseAgeString = (ageInMonths: number) => {
	if (ageInMonths < 12) return `${ageInMonths} months`;
	return `${Math.round(ageInMonths / 12)} years`;
};

const PalsOfPawsSociety: Organization = {
	id: "1",
	name: "Pals of Paws Society",
	email: "info@palsofpawssociety.org",
	phone: "(954) 224-9779",
	address: {
		address1: "12 W Commerce St Unit 49",
		city: "Hernando",
		state: "Mississippi",
		postcode: "38632",
		country: "United States",
	},
	website: "https://www.palsofpawssociety.org/",
	social_media: {
		facebook: "https://www.facebook.com/PalsofPawsSociety/",
	},
};
