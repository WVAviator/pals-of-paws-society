import { NextApiRequest, NextApiResponse } from "next";
import { Petfinder } from "../../../src/api/Petfinder";

const pf = Petfinder.getInstance();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const animals = await pf.getAnimals();
	res.send("Attempted to retrieve animals.\n" + JSON.stringify(animals));
};
