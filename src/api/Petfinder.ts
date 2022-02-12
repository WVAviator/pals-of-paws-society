import axios from "axios";
import { PetfinderAnimal } from "../types/PetfinderAnimal";

export class Petfinder {
	private static instance: Petfinder;

	private searchLocation = "34.688609, -90.000388";
	private searchRadius = "23";

	private accessToken: Promise<string>;
	private expiration: Date;
	private url = "https://api.petfinder.com/v2";

	constructor() {
		this.expiration = new Date("Jan 1, 1900 00:00:01");
		this.accessToken = null;
	}

	public static getInstance(): Petfinder {
		if (!Petfinder.instance) {
			Petfinder.instance = new Petfinder();
		}
		return Petfinder.instance;
	}

	private async getAccessToken() {
		if (this.accessToken && !this.tokenExpired()) return this.accessToken;

		const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
		const secret = process.env.PETFINDER_SECRET_KEY;

		const authenticationUrl = `${this.url}/oauth2/token`;

		const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

		const response = await axios.post(authenticationUrl, dataString);

		this.accessToken = response.data.access_token;
		const now = new Date();
		this.expiration = new Date(now.getTime() + response.data.expires_in * 1000);

		console.log(
			"New Petfinder access token retrieved. Expires " +
				this.expiration.toLocaleTimeString()
		);

		return this.accessToken;
	}

	private tokenExpired() {
		const now = new Date();
		return this.expiration.getTime() - now.getTime() <= 0;
	}

	public async getAnimals() {
		const queryUrl = `${this.url}/animals`;
		const response = await this.fetchAnimalData(queryUrl);

		return response.data.animals as PetfinderAnimal[];
	}

	public async getAnimal(id: number) {
		const queryUrl = `${this.url}/animals/${id}`;
		const response = await this.fetchAnimalData(queryUrl);

		return response.data.animal as PetfinderAnimal;
	}

	private async fetchAnimalData(queryUrl: string) {
		const token = await this.getAccessToken();
		const response = await axios.get(queryUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				location: this.searchLocation,
				distance: this.searchRadius,
			},
		});
		return response;
	}
}
