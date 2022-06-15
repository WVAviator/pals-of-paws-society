import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";
import redis from "../../../src/redis";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		const page = req.query.page ? parseInt(req.query.page as string) : 1;
		const animals = await redis.get(`animals`);
		if (animals) {
			return res.status(200).json(animals);
		} else {
			return res.status(500).json({ error: "Internal server error" });
		}
	}

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

	const allAnimals = JSON.stringify(animals);
	const firstPage = JSON.stringify(animals.slice(0, 24));

	try {
		await redis.set(`animals:1`, firstPage);
		await redis.set(`animals`, allAnimals);
		await redis.set("timestamp", new Date().toISOString());
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
