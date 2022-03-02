import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import { getShelterluvAnimals, getShelterluvAnimal } from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

import redis from "../redis";

class AnimalNotFoundError extends Error {}

const cacheTimeout = 60 * 20 * 1000; // 20 minutes

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

	//if (!allAnimals) {
	// 	allAnimals = await retrieveAnimalData();
	// }

	// return cache.put("allAnimals", allAnimals, cacheTimeout);

	//const allAnimals = await retrieveAnimalData();
	//if (!allAnimals) throw new AnimalNotFoundError();
	//return allAnimals;
};

export const getInitialAnimals = async (maxResults: number) => {
	const cachedAnimalsRaw = await redis.get("allAnimals");
	if (!cachedAnimalsRaw) {
		const animals: Animal[] = await retrieveAnimalData(maxResults * 2);
		return animals;
	}
	const animals: Animal[] = JSON.parse(cachedAnimalsRaw);
	return animals;

	// const key = `animals-${maxResults}`;
	// const rawAnimals = await redis.get(key);
	// console.log("Cached:", rawAnimals);
	// if (rawAnimals) {
	// 	const animals: Animal[] = JSON.parse(rawAnimals);
	// 	return animals;
	// } else {
	// 	const animals = await retrieveAnimalData(maxResults * 2);
	// 	const jsonAnimals = JSON.stringify(animals);
	// 	redis.set(key, jsonAnimals, "EX", 3600);
	// 	return animals;
	// }

	// //const animals = await retrieveAnimalData(maxResults * 2);
	// return animals.slice(0, maxResults);
};

export const getAnimalById = async (animalId: string) => {
	// console.log(`Getting animal with id: ${animalId}`);

	const allAnimals: Animal[] = await getAllAnimals();
	const animalSearch = allAnimals.find((a) => a.id === animalId);
	if (!animalSearch) throw new AnimalNotFoundError();
	return animalSearch;
	// // if (!animalSearch) console.log("Animal not found.");

	// // if (animalSearch) return animalSearch;

	// for (let i = 0; i < allAnimals.length; i++) {
	// 	if (allAnimals[i].id === animalId) {
	// 		console.log(`Animal found in cache: ${allAnimals[i].name}`);

	// 		return allAnimals[i];
	// 	}
	// }

	// throw new AnimalNotFoundError();

	// console.log("Animal. was not found");

	// const service = animalId.slice(0, 2);
	// const id = animalId.slice(2);

	// let animal: Animal;

	// try {
	// 	if (service === "pf") {
	// 		const petfinderAnimal = await getPetfinderAnimal(id);

	// 		animal = convertPetfinderAnimal(petfinderAnimal);
	// 	} else if (service === "sl") {
	// 		const shelterluvAnimal = await getShelterluvAnimal(id);
	// 		animal = convertShelterluvAnimal(shelterluvAnimal);
	// 	}
	// } catch (error) {
	// 	console.error(
	// 		`Error occurred while trying to retrieve animal by id ${animalId}`,
	// 		error
	// 	);
	// }

	// if (!animal) throw new AnimalNotFoundError();
	// return animal;
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
