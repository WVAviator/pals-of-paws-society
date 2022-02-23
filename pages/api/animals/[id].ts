import { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAllAnimals();
	const { id } = req.query;

	const animal = animals.find((a) => a.id === id);

	animal ? res.status(200).send(animal) : res.status(404);
};

export default handler;
