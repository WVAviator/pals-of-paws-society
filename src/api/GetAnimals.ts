import { getPetfinderAnimals } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import { getShelterluvAnimals, getShelterluvAnimal } from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import cache from "memory-cache";
import { Animal } from "../types/Animal";
import { PetfinderAnimal } from "../types/PetfinderAnimal";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";
import { getPetfinderAnimal } from "./Petfinder";

const cacheTimeout = 60 * 20 * 1000; // 20 minutes

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
	const service = animalId.slice(0, 2);
	const id = animalId.slice(2);

	let animal: Animal;

	try {
		if (service === "pf") {
			const petfinderAnimal = await getPetfinderAnimal(id);
			console.log(petfinderAnimal);

			animal = convertPetfinderAnimal(petfinderAnimal);
		} else if (service === "sl") {
			const shelterluvAnimal = await getShelterluvAnimal(id);
			animal = convertShelterluvAnimal(shelterluvAnimal);
		}
	} catch (error) {
		console.error(
			`Error occurred while trying to retrieve animal by id ${animalId}`,
			error
		);
	}

	return animal;
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
