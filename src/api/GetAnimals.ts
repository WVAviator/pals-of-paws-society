import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import { getShelterluvAnimals } from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

export const getAllAnimals = async () => {
	const allAnimals: Animal[] = await retrieveAnimalData();
	return allAnimals;
};

const retrieveAnimalData = async () => {
	const animalData = await Promise.all([
		retrieveShelterluvData(),
		retrievePetfinderData(),
	]);

	return animalData.flat();
};

const retrievePetfinderData = async () => {
	console.log("Retrieving data from Petfinder...", new Date());

	let pfAnimals: PetfinderAnimal[];
	try {
		pfAnimals = await getPetfinderAnimals();
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Petfinder.",
			error
		);
	}
	console.log("Petfinder data retrieved.", new Date());
	return pfAnimals?.map((animal) => convertPetfinderAnimal(animal)) ?? [];
};

const retrieveShelterluvData = async () => {
	console.log("Retrieving data from Shelterluv...", new Date());

	let shelterluvAnimals: ShelterluvAnimal[];
	try {
		shelterluvAnimals = await getShelterluvAnimals();
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Shelterluv.",
			error
		);
	}

	return (
		shelterluvAnimals?.map((animal) => convertShelterluvAnimal(animal)) ??
		[]
	);
};
