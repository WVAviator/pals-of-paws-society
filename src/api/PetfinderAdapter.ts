import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "./../types/PetfinderAnimal";
import { Petfinder } from "./Petfinder";

export const convertPetfinderAnimal = (pfAnimal: PetfinderAnimal) => {
	const animal: Animal = {
		id: `pf${pfAnimal.id}`,
		service: "petfinder",
		name: pfAnimal.name.toLowerCase() ?? "Unnamed",
		type: pfAnimal.type.toLowerCase() ?? "Other",
		sex: pfAnimal.gender.toLowerCase() ?? "Unknown",
		ageString: pfAnimal.age ?? "Unknown",
		breed: extractBreed(pfAnimal),
		location: `${pfAnimal.contact.address.city}, ${pfAnimal.contact.address.state}`,
		organization: pfAnimal.orgName,
		organizationEmail: pfAnimal.contact.email,
		organizationPhone: pfAnimal.contact.phone,
		description: pfAnimal.description,
		photos: pfAnimal.photos?.map((photo) => photo.large) ?? [],
	};

	return animal;
};

const extractBreed = ({ breeds }: PetfinderAnimal) => {
	if (breeds.mixed && breeds.primary) return `Mixed ${breeds.primary}`;
	if (breeds.primary) return breeds.primary;
	return "Mixed";
};
