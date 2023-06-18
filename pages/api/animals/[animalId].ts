import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { fetchAndCacheAllAnimals } from "../../../src/api/GetAnimals";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({
			message: "Method not allowed",
		});
	}

	const { animalId } = req.query;

	try {
		const animals = await fetchAndCacheAllAnimals();

		const animal = animals.find((animal) => animal.id === animalId);

		if (!animal) {
			return res.status(404).json({
				message: "Animal not found",
			});
		}

		return res.status(200).json(animal);
	} catch (err) {
		return res.status(500).json({
			message: "Error fetching animals.",
		});
	}
};

export default handler;
