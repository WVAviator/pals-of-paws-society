import { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAllAnimals();

	animals ? res.status(200).send(animals) : res.status(500);
};

export default handler;
