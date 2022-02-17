import { Animal } from "../types/Animal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";
export const convertShelterluvAnimal = (shelterluvAnimal: ShelterluvAnimal) => {
	const animal: Animal = {
		id: shelterluvAnimal["Internal-ID"],
		name: shelterluvAnimal.Name,
		type: shelterluvAnimal.Type.toLowerCase(),
		sex: shelterluvAnimal.Sex.toLowerCase(),
		ageString: parseAgeString(shelterluvAnimal.Age),
		breed: shelterluvAnimal.Breed,
		location: "Hernando, MS",
		organization: "Pals of Paws Society",
		organizationEmail: "palsofpawssociety@gmail.com",
		organizationPhone: "954-224-9779",
		description: shelterluvAnimal.Description,
		photos: shelterluvAnimal.Photos,
	};
	return animal;
};

const parseAgeString = (ageInMonths: number) => {
	if (ageInMonths < 12) return `${ageInMonths} months`;
	return `${Math.round(ageInMonths / 12)} years`;
};