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
	//return await getAnimals();
};

export const getSomeAnimals = async () => {
	return (
		(cache.get("subsetAnimals") as Animal[]) ??
		cache.put("subsetAnimals", await getAnimals(false), cacheTimeout)
	);
	//return await getAnimals(false);
};

const getAnimals = async (getAll: boolean = true) => {
	const pfAnimals = getAll
		? await pf.getAllAnimals()
		: await pf.getFewAnimals();
	const shelterluvAnimals = await getShelterluvAnimals();

	const convertedPetfinderAnimals = pfAnimals.map((animal) =>
		convertPetfinderAnimal(animal)
	);
	const convertedShelterluvAnimals = shelterluvAnimals.map((animal) =>
		convertShelterluvAnimal(animal)
	);

	const results = [...convertedShelterluvAnimals, ...convertedPetfinderAnimals];

	return results;
};
