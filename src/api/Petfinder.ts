import getOrganization from "./PetfinderOrganizations";
import getToken from "./PetfinderAuth";
import axios from "axios";
import { PetfinderAnimal } from "../types/PetfinderAnimal";

export class Petfinder {
	private searchLocation = "34.688609, -90.000388";
	private searchRadius = "23";

	private url = "https://api.petfinder.com/v2";

	public async getAllAnimals() {
		let lastPage = false;
		let animals = new Array<PetfinderAnimal>();
		let page = 1;

		while (!lastPage) {
			const queryUrl = `${this.url}/animals?page=${page}`;
			const response = await this.fetchAnimalData(queryUrl);

			const totalPages = response.data.pagination.total_pages;

			lastPage = page >= totalPages;
			animals.push(...response.data.animals);
			page++;
		}

		return this.filterResults(animals);
	}

	public async getFewAnimals() {
		const queryUrl = `${this.url}/animals`;
		const response = await this.fetchAnimalData(queryUrl, 50);

		return this.filterResults(response.data.animals as PetfinderAnimal[]);
	}

	public async getAnimal(id: number) {
		const queryUrl = `${this.url}/animals/${id}`;
		const response = await this.fetchAnimalData(queryUrl);

		return response.data.animal as PetfinderAnimal;
	}

	private async fetchAnimalData(queryUrl: string, limit: number = 100) {
		const token = await getToken();
		const response = await axios.get(queryUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				location: this.searchLocation,
				distance: this.searchRadius,
				limit,
			},
		});
		return response;
	}

	private async filterResults(animals: PetfinderAnimal[]) {
		const filteredResults: PetfinderAnimal[] = [];

		animals.forEach((animal) => {
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
			filteredResults[i].orgName = org.name;
		}

		return filteredResults;
	}
}
