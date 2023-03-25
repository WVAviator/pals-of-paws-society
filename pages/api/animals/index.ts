import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";
import redis from "../../../src/redis";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({
			message: "Method not allowed",
		});
	}

	const cachedAnimals = await redis.get(`animals`);
	if (cachedAnimals) {
		return res.status(200).json(cachedAnimals);
	}

	const animals = await getAllAnimals();

	console.log(`${animals.length} animals retrieved. Caching and returning...`);

	const animalsJson = JSON.stringify(animals);

	try {
		await redis.set(`animals`, animalsJson, "EX", 120);

		return res.json(animalsJson);
	} catch (err) {
		return res.status(500).json({
			message: "Error updating the animals cache.",
		});
	}
};

export default handler;
