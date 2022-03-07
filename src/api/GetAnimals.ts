import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import { getShelterluvAnimals } from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

import redis from "../redis";

class AnimalNotFoundError extends Error {}

export const getAllAnimals = async () => {
	const cachedAnimalsRaw = await redis.get("allAnimals");

	if (cachedAnimalsRaw) {
		console.log("Cached animals found. Returning parsed results.");

		const cachedAnimals: Animal[] = JSON.parse(cachedAnimalsRaw);
		return cachedAnimals;
	} else {
		console.log("No cache found for all animals. Retrieving new data...");

		const allAnimals: Animal[] = await retrieveAnimalData();
		const jsonAnimals = JSON.stringify(allAnimals);
		redis.set("allAnimals", jsonAnimals, "EX", 3600);
		return allAnimals;
	}
};

const retrieveAnimalData = async () => {
	const animalData = await Promise.all([
		retrieveShelterluvData(),
		retrievePetfinderData(),
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
