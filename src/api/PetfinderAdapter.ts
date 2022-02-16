import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "./../types/PetfinderAnimal";
import { Petfinder } from "./Petfinder";

const pf = Petfinder.getInstance();

export const convertPetfinderAnimal = (pfAnimal: PetfinderAnimal) => {
	const animal: Animal = {
		id: pfAnimal.id,
		name: pfAnimal.name ?? "Unnamed",
		type: pfAnimal.type ?? "Other",
		sex: pfAnimal.gender ?? "Unknown",
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

const extractBreed = (pfAnimal: PetfinderAnimal) => {
	if (pfAnimal.breeds.mixed && pfAnimal.breeds.primary)
		return `Mixed ${pfAnimal.breeds.primary}`;
	if (pfAnimal.breeds.primary) return pfAnimal.breeds.primary;
	return "Mixed";
};
