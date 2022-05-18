import axios from "axios";
import { ShelterluvAnimal } from "../types/ShelterluvAnimal";

const key = process.env.SHELTERLUV_API_KEY;
const baseUrl = "https://www.shelterluv.com/api/v1";

export const getShelterluvAnimals = async () => {
	console.log("Retrieving data from Shelterluv...", new Date());

	const response = await fetchAnimalData(`${baseUrl}/animals`);

	const animals = response.data.animals as ShelterluvAnimal[];

	console.log("Shelterluv data retrieved.", new Date());

	return filterResults(animals);
};

const fetchAnimalData = async (queryUrl: string) => {
	const response = await axios.get(queryUrl, {
		headers: {
			"X-Api-Key": key,
		},
		params: {
			status_type: "publishable",
		},
	});
	return response;
};

const filterResults = (animals: ShelterluvAnimal[]) => {
	let filteredAnimals = new Array<ShelterluvAnimal>();

	animals.forEach((animal) => {
		if (!animal.Name) return;
		if (animal.Photos.length === 0) return;

		filteredAnimals.push(animal);
	});

	return filteredAnimals;
};
