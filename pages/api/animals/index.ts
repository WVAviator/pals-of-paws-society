import { NextApiRequest, NextApiResponse } from "next";
import { getAnimals } from "../../../src/api/GetAnimals";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await getAnimals();
	res.send("Attempted to retrieve animals.\n" + JSON.stringify(animals));
};
