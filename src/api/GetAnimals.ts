import { Petfinder } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import getShelterluvAnimals from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";

const pf = Petfinder.getInstance();

export const getAnimals = async () => {
	const pfAnimals = await pf.getAnimals();
	const shelterluvAnimals = await getShelterluvAnimals();

	const convertedPetfinderAnimals = pfAnimals.map((animal) =>
		convertPetfinderAnimal(animal)
	);
	const convertedShelterluvAnimals = shelterluvAnimals.map((animal) =>
		convertShelterluvAnimal(animal)
	);

	return [...convertedShelterluvAnimals, ...convertedPetfinderAnimals];
};
