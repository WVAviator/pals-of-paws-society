import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import { getShelterluvAnimals } from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";
import redis from "../redis";

export const getAllAnimals = async () => {
	const allAnimals: Animal[] = await retrieveAnimalData();
	return allAnimals;
};

export const fetchAndCacheAllAnimals = async (): Promise<Animal[]> => {
	const cachedAnimals = await redis.get(`animals`);
	if (cachedAnimals) {
		return JSON.parse(cachedAnimals);
	}

	const animals = await getAllAnimals();

	console.log(`${animals.length} animals retrieved. Caching and returning...`);

	const animalsJson = JSON.stringify(animals);

	try {
		await redis.set(`animals`, animalsJson, "EX", 120);
	} catch (err) {
		console.error("Error updating the animals cache.", err);
	}

	return animals;
};

const retrieveAnimalData = async () => {
	const animalData = await Promise.all([
		retrieveShelterluvData(),
		// retrievePetfinderData(), // Petfinder deprecated support for public API December 2025
	]);

	return animalData.flat();
};

const retrievePetfinderData = async () => {
	let pfAnimals: PetfinderAnimal[];
	try {
		pfAnimals = await getPetfinderAnimals();
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Petfinder.",
			error
		);
	}
	return pfAnimals?.map((animal) => convertPetfinderAnimal(animal)) ?? [];
};

const retrieveShelterluvData = async () => {
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
		shelterluvAnimals?.map((animal) => convertShelterluvAnimal(animal)) ?? []
	);
};
