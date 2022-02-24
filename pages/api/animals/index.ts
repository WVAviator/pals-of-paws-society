import { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAllAnimals();

	res.status(200).send(animals);
};

export default handler;
