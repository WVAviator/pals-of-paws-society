import { Petfinder } from "./Petfinder";
import { convertPetfinderAnimal } from "./PetfinderAdapter";
import getShelterluvAnimals from "./Shelterluv";
import { convertShelterluvAnimal } from "./ShelterluvAdapter";
import { Animal } from "../types/Animal";

const pf = new Petfinder();

export const getAllAnimals = async () => {
	return await getAnimals();
};

export const getSomeAnimals = async () => {
	return await getAnimals(false);
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
