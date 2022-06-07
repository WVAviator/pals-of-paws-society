import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { getAllAnimals } from "../../../src/api/GetAnimals";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}
	try {
		const animals = await getAllAnimals();
		return res.json(animals);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Error while getting animals");
	}
}
