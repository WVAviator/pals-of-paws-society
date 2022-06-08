import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";
import redis from "../../../src/redis";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({
			message: "Method not allowed",
		});
	}

	const token = req.headers.token as string;

	if (token !== process.env.ANIMALS_TOKEN) {
		return res.status(403).json({
			message: "Token not permitted",
		});
	}

	const animals = await getAllAnimals();
	console.log(`${animals.length} animals retrieved and sent to redis cache.`);
	const jsonAnimals = JSON.stringify(animals);

	try {
		redis.set("animals", jsonAnimals);
		return res.status(200).json({
			message: "Successfully updated the animals cache.",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Error updating the animals cache.",
		});
	}
};

export default handler;
