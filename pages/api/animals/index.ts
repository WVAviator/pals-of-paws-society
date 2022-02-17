import { NextApiRequest, NextApiResponse } from "next";
import { getAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAnimals();
	res.status(200).send(animals);
};

export default handler;
