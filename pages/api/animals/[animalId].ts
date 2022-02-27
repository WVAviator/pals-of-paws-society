import { NextApiRequest, NextApiResponse } from "next";
import { getAnimalById } from "../../../src/api/GetAnimals";
import { Animal } from "../../../src/types/Animal";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { animalId } = req.query;

	if (!animalId) return res.status(400).send;

	let animal: Animal;

	try {
		animal = await getAnimalById(animalId as string);
	} catch (error) {
		console.log(error.message);
		return res.status(400).send;
	}

	animal ? res.status(200).send(animal) : res.status(400);
};

export default handler;
