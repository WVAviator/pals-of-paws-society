import { getAllOrganizations } from "./PetfinderOrganizations";
import getToken from "./PetfinderAuth";
import axios, { AxiosResponse } from "axios";
import { PetfinderAnimal } from "../types/PetfinderAnimal";

const searchLocation = "34.688609, -90.000388";
const searchRadius = "23";
const url = "https://api.petfinder.com/v2";

export const getPetfinderAnimals = async () => {
	console.log("Retrieving Petfinder token...", new Date());

	const token = await getToken();

	console.time("Petfinder API Calls");

	console.log("Retrieving first page of Petfinder animals...", new Date());

	const response = await fetchAnimalData(token, `${url}/animals?page=1`);
	const totalPages = Math.min(response.data.pagination.total_pages, 4);
	console.log(`Total pages: ${totalPages}`);

	const apiCalls: Promise<AxiosResponse<any, any>>[] = [];

	for (let i = 2; i <= totalPages; i++) {
		const promise = fetchAnimalData(token, `${url}/animals?page=${i}`);
		apiCalls.push(promise);
	}

	console.log("Retrieving all remaining Petfinder animals", new Date());
	const responseArray = await Promise.all(apiCalls);

	responseArray.unshift(response);

	const animals = responseArray
		.map((res) => {
			return res.data.animals as PetfinderAnimal[];
		})
		.flat();

	console.timeEnd("Petfinder API Calls");

	console.log(
		"All Petfinder data retrieved. Filtering and returning results...",
		new Date()
	);
	return filterResults(animals, token);
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

const filterResults = async (animals: PetfinderAnimal[], token: string) => {
	const filteredResults: PetfinderAnimal[] = [];

	const organizations = await getAllOrganizations(token);

	animals.forEach((animal) => {
		const newAnimal = transformResult(animal);

		animal.organization = organizations.find(
			(org) => org.id === animal.organization_id
		);

		if (!animal.organization) {
			console.log(`Organization ${animal.organization_id} not found.`);
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
