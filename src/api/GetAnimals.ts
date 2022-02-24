import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import getShelterluvAnimals from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import cache from "memory-cache";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

const cacheTimeout = 60 * 19 * 1000; // 19 minutes

export const getAllAnimals = async () => {
	return (
		(cache.get("allAnimals") as Animal[]) ??
		cache.put("allAnimals", await retrieveAnimalData(), cacheTimeout)
	);
};

export const getAnimals = async (maxResults: number) => {
	const animals = await retrieveAnimalData(maxResults * 2);
	return animals.slice(0, maxResults);
};

export const getAnimalById = async (animalId: string) => {
	console.log(`Getting animal with id: ${animalId}`);

	return (await getAllAnimals()).find((a) => a.id === animalId);
};

const retrieveAnimalData = async (limit = 0) => {
	const animalData = await Promise.all([
		retrieveShelterluvData(),
		retrievePetfinderData(limit),
	]);
	return animalData.flat();
};

const retrievePetfinderData = async (limit = 0) => {
	let pfAnimals: PetfinderAnimal[];
	try {
		pfAnimals = await getPetfinderAnimals(limit);
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve data from Petfinder.",
			error
		);
	}
	return pfAnimals.map((animal) => convertPetfinderAnimal(animal));
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
	return shelterluvAnimals.map((animal) => convertShelterluvAnimal(animal));
};
