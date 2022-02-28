import { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let animals;
	try {
		animals = await getAllAnimals();
	} catch (error) {
		console.error(error.message);
	}

	animals ? res.status(200).send(animals) : res.status(500);
};

export default handler;
