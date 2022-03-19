import { getAllOrganizations } from "./PetfinderOrganizations";
import getToken from "./PetfinderAuth";
import axios, { AxiosResponse } from "axios";
import { PetfinderAnimal } from "../types/PetfinderAnimal";

const searchLocation = "34.688609, -90.000388";
const searchRadius = "23";
const url = "https://api.petfinder.com/v2";

export const getPetfinderAnimals = async () => {
	const token = await getToken();

	console.time("Petfinder API Calls");

	const response = await fetchAnimalData(token, `${url}/animals`);
	const totalPages = response.data.pagination.total_pages;
	console.log(`Total pages: ${totalPages}`);

	const apiCalls: Promise<AxiosResponse<any, any>>[] = [];

	for (let i = 2; i <= totalPages; i++) {
		const promise = fetchAnimalData(token, `${url}/animals?page=${i}`);
		apiCalls.push(promise);
	}

	const responseArray = await Promise.all(apiCalls);

	responseArray.unshift(response);

	const animals = responseArray
		.map((res) => {
			return res.data.animals as PetfinderAnimal[];
		})
		.flat();

	console.timeEnd("Petfinder API Calls");

	return filterResults(animals);
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

		if (!animal.organization) {
			console.log(`Organization ${animal.organization_id} not found.`, animal);
			return;
		}

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

	//Attach organization to animal (not all org fields are available in animal data)
	const organizations = await getAllOrganizations();

	for (let i = 0; i < filteredResults.length; i++) {
		filteredResults[i].organization = organizations.find(
			(org) => org.id === filteredResults[i].organization_id
		);
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

	newName = newName.replace("&#39;", "'");

	//Some orgs put "zcl" in the name, not sure why
	newName = newName.replace("zcl ", "");
	newName = newName.replace("zcl-", "");

	newAnimal.name = newName;

	return newAnimal;
};
