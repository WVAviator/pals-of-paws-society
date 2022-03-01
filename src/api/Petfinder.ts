import getOrganization from "./PetfinderOrganizations";
import getToken from "./PetfinderAuth";
import axios, { AxiosResponse } from "axios";
import { PetfinderAnimal } from "../types/PetfinderAnimal";

const searchLocation = "34.688609, -90.000388";
const searchRadius = "23";
const url = "https://api.petfinder.com/v2";

export const getPetfinderAnimals = async (limit = 0) => {
	const token = await getToken();
	if (!limit) {
		const response = await fetchAnimalData(token, `${url}/animals`);
		const totalPages = response.data.pagination.total_pages;
		console.log(`Total pages: ${totalPages}`);

		let animals: PetfinderAnimal[];
		animals.push(response.data.animals);

		let page = 2;

		while (page <= totalPages) {
			const response = await fetchAnimalData(token, `${url}/animals?page=${page}`);
			animals.push(response.data.animals);
			page++;
		}

		// const apiCalls: Promise<AxiosResponse<any, any>>[] = [];

		// for (let i = 2; i <= totalPages; i++) {
		// 	const promise = fetchAnimalData(token, `${url}/animals?page=${i}`);
		// 	apiCalls.push(promise);
		// }

		// console.log(`Beginning to resolve promises...`);

		// //const responseArray = await Promise.all(apiCalls);
		// let responseArray = [];
		// for (let i = 0; i < apiCalls.length; i++) {
		// 	const response = await apiCalls[i];
		// 	responseArray.push(response);
		// }
		
		// console.log("Promises resolved.");

		// const animals = responseArray
		// 	.map((res) => {
		// 		return res.data.animals as PetfinderAnimal[];
		// 	})
		// 	.flat();

		return filterResults(animals);
	}

	const response = await fetchAnimalData(token, `${url}/animals`, limit);
	return filterResults(response.data.animals as PetfinderAnimal[]);
};

export const getPetfinderAnimal = async (id: string) => {
	const token = await getToken();
	const response = await axios.get(`${url}/animals/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const animal = transformResult(response.data.animal as PetfinderAnimal);

	animal.organization = await getOrganization(animal.organization_id);

	return animal;
};

const fetchAnimalData = async (
	token: string,
	queryUrl: string,
	limit: number = 100
) => {
	console.log(`Retrieving ${limit} PF animals from ${queryUrl}`);

	const response = await axios.get(queryUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			location: searchLocation,
			distance: searchRadius,
			limit,
		},
	});

	return response;
};

const filterResults = async (animals: PetfinderAnimal[]) => {
	const filteredResults: PetfinderAnimal[] = [];

	animals.forEach((animal) => {
		const newAnimal = transformResult(animal);

		//Some orgs post the same animal multiple times
		if (
			!filteredResults.find(
				(a) =>
					a.name === newAnimal.name &&
					a.organization_id === newAnimal.organization_id
			) &&
			(newAnimal.type.toLowerCase() === "cat" ||
				newAnimal.type.toLowerCase() === "dog")
		) {
			filteredResults.push(newAnimal);
		}
	});

	//The org name is found at a different API endpoint
	for (let i = 0; i < filteredResults.length; i++) {
		const org = await getOrganization(filteredResults[i].organization_id);
		filteredResults[i].organization = org;
	}

	return filteredResults;
};

const transformResult = (animal: PetfinderAnimal) => {
	const newAnimal = animal;

	let newName: string;

	//Some orgs use all caps - CSS 'text-transform: capitalize' will fix
	newName = animal.name.toLowerCase();

	//Some orgs put additional information like litter size in the name - usually separated by a hyphen
	newName = newName.split(" -")[0];

	//Some orgs use an ampersand to denote two animals in one listing, but it comes through as &amp;
	newName = newName.replace("&amp;", "&");

	//Some orgs put "zcl" in the name, not sure why
	newName = newName.replace("zcl ", "");
	newName = newName.replace("zcl-", "");

	newAnimal.name = newName;

	return newAnimal;
};
