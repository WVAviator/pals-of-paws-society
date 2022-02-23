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

	const animals = response.data.animals as ShelterluvAnimal[];

	return filterResults(animals);
};

const filterResults = (animals: ShelterluvAnimal[]) => {
	let filteredAnimals = new Array<ShelterluvAnimal>();

	animals.forEach((animal) => {
		if (!animal.Name) return;
		if (animal.Photos.length === 0) return;

		filteredAnimals.push(animal);
	});

	return filteredAnimals;
}

export default getShelterluvAnimals;
