import axios from "axios";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

const key = process.env.SHELTERLUV_API_KEY;

const getShelterluvAnimals = async () => {
	const response = await axios.get(
		"https://www.shelterluv.com/api/v1/animals",
		{
			headers: {
				"X-Api-Key": key,
			},
			params: {
				//status_type: "publishable",
			},
		}
	);

	let animals = new Array<ShelterluvAnimal>();

	(response.data.animals as ShelterluvAnimal[]).forEach((animal) => {
		if (!animal.Name) return;
		if (animal.Photos.length === 0) return;

		animals.push(animal as ShelterluvAnimal);
	});

	return animals;
};

export default getShelterluvAnimals;
