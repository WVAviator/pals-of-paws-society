import { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";
import cache from "memory-cache";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let animals = cache.get("allAnimals");

	if (!animals) {
		console.log("AllAnimals cache expired. Pulling in new data.");
		animals = await getAllAnimals();

		cache.put("allAnimals", animals, 1200000);
	}

	res.status(200).send(animals);
};

export default handler;
