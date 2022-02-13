import { NextApiRequest, NextApiResponse } from "next";
import { Petfinder } from "../../../src/api/Petfinder";
import { convertPetfinderAnimal } from "../../../src/api/PetfinderAdapter";
import getShelterluvAnimals from "../../../src/api/Shelterluv";
import { convertShelterluvAnimal } from "../../../src/api/ShelterluvAdapter";

const pf = Petfinder.getInstance();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAnimals();
	res.send("Attempted to retrieve animals.\n" + JSON.stringify(animals));
};

const getAnimals = async () => {
	const pfAnimals = await pf.getAnimals();
	const shelterluvAnimals = await getShelterluvAnimals();

	const convertedPetfinderAnimals = pfAnimals.map((animal) =>
		convertPetfinderAnimal(animal)
	);
	const convertedShelterluvAnimals = shelterluvAnimals.map((animal) =>
		convertShelterluvAnimal(animal)
	);

	return [...convertedPetfinderAnimals, ...convertedShelterluvAnimals];
};
