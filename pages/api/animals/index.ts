import { NextApiRequest, NextApiResponse } from "next";
import { fetchAndCacheAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({
			message: "Method not allowed",
		});
	}

	try {
		const animals = await fetchAndCacheAllAnimals();

		return res.json(animals);
	} catch (err) {
		return res.status(500).json({
			message: "Error fetching animals.",
		});
	}
};

export default handler;
