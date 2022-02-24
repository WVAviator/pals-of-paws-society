import { NextApiRequest, NextApiResponse } from "next";
import { getAnimalById } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	const { id } = req.query;

	const animal = await getAnimalById(id);

	animal ? res.status(200).send(animal) : res.status(404);
};

export default handler;
