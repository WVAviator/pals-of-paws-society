import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "./../types/PetfinderAnimal";

export const convertPetfinderAnimal = (pfAnimal: PetfinderAnimal) => {
	const animal: Animal = {
		id: `pf${pfAnimal.id}`,
		service: "petfinder",
		name: capitalize(pfAnimal.name.toLowerCase()) ?? "Unnamed",
		type: pfAnimal.type.toLowerCase() ?? "Other",
		sex: pfAnimal.gender.toLowerCase() ?? "Unknown",
		ageString: pfAnimal.age ?? "Unknown",
		breed: extractBreed(pfAnimal),
		location: `${pfAnimal.contact.address.city}, ${pfAnimal.contact.address.state}`,
		organization: pfAnimal.organization,
		organizationEmail: pfAnimal.contact.email,
		organizationPhone: pfAnimal.contact.phone,
		description: fixDescription(pfAnimal.description),
		photos: pfAnimal.photos?.map((photo) => photo.large) ?? [],
		link: pfAnimal.url,
	};

	return animal;
};

const extractBreed = ({ breeds }: PetfinderAnimal) => {
	if (breeds.mixed && breeds.primary) return `Mixed ${breeds.primary}`;
	if (breeds.primary) return breeds.primary;
	return "Mixed";
};

const capitalize = (str: string) => {
	const words = str.trim().split(" ");

	return words
		.map((word) => {
			return word[0].toUpperCase() + word.substring(1);
		})
		.join(" ");
};

const fixDescription = (desc: string) => {
	const correctedDesc = desc;

	correctedDesc = correctedDesc.replace("&amp;#39;", "'");
	correctedDesc = correctedDesc.replace("&amp;amp;", "&");
	correctedDesc = correctedDesc.replace("&amp;", "&");

	return correctedDesc;
}
