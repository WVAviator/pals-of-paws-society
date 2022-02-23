import { NextApiRequest, NextApiResponse } from "next";
import { getSomeAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// let animals = cache.get("subsetAnimals");
	// if (!animals) {
	// 	animals = await getSomeAnimals();
	// 	cache.put("subsetAnimals", animals, 1200000);
	// }

	const animals = await getSomeAnimals();

	res.status(200).send(animals);
};

export default handler;
