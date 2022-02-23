import { Petfinder } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import getShelterluvAnimals from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import cache from "memory-cache";
import { Animal } from "../types/Animal";

const pf = new Petfinder();
const cacheTimeout = 60 * 20 * 1000;

export const getAllAnimals = async () => {
	return (
		(cache.get("allAnimals") as Animal[]) ??
		cache.put("allAnimals", await getAnimals(), cacheTimeout)
	);
};

export const getAnimalById = async (animalId: string) => {
	const id = animalId.slice(2);
	const service = animalId.slice(0, 2);
	
}

export const getSomeAnimals = async () => {
	return (
		(cache.get("subsetAnimals") as Animal[]) ??
		cache.put("subsetAnimals", await getAnimals(false), cacheTimeout)
	);
};

const getAnimals = async (getAll: boolean = true) => {
	
	let pfAnimals: PetfinderAnimal[];
	let shelterluvAnimals: ShelterluvAnimals[];

	try {
		pfAnimals = getAll
		? await pf.getAllAnimals()
		: await pf.getFewAnimals();
	} catch(error) {
		console.error("Error occurred while attempting to retrieve data from Petfinder.", error);	
	}

	try {
		shelterluvAnimals = await getShelterluvAnimals();
	} catch (error) {
		console.error("Error occurred while attempting to retrieve data from Shelterluv.", error);
		
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
