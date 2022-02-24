import { Petfinder } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import getShelterluvAnimals from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import cache from "memory-cache";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

const pf = new Petfinder();
const cacheTimeout = 60 * 19 * 1000; // 19 minutes

export const getAllAnimals = async () => {
	return (
		(cache.get("allAnimals") as Animal[]) ??
		cache.put("allAnimals", await getAnimals(), cacheTimeout)
	);
};

export const getAnimalById = async (animalId: string) => {
	console.log(`Getting animal with id: ${animalId}`);

	return (await getAllAnimals()).find((a) => a.id === animalId);
};

const getAnimals = async () => {
	let pfAnimals: PetfinderAnimal[];
	let shelterluvAnimals: ShelterluvAnimal[];

	try {
		pfAnimals = await pf.getAllAnimals();
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Petfinder.",
			error
		);
	}

	try {
		shelterluvAnimals = await getShelterluvAnimals();
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Shelterluv.",
			error
		);
	}

	const convertedPetfinderAnimals = pfAnimals.map((animal) =>
		convertPetfinderAnimal(animal)
	);
	const convertedShelterluvAnimals = shelterluvAnimals.map((animal) =>
		convertShelterluvAnimal(animal)
	);

	const results = [...convertedShelterluvAnimals, ...convertedPetfinderAnimals];

	return results;
};
