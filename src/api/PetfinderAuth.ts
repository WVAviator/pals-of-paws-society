import axios from "axios";
import cache from "memory-cache";

export class PetfinderAuth {
	private static instance: PetfinderAuth;

	//private accessToken: Promise<string>;
	//private expiration: Date;
	private url = "https://api.petfinder.com/v2";

	// constructor() {
	// 	this.expiration = new Date("Jan 1, 1900 00:00:01");
	// 	this.accessToken = null;
	// }

	// private static getInstance(): PetfinderAuth {
	// 	if (!PetfinderAuth.instance) {
	// 		PetfinderAuth.instance = new PetfinderAuth();
	// 	}
	// 	return PetfinderAuth.instance;
	// }

	public static async getToken() {
		//return await PetfinderAuth.getInstance().getAccessToken();
		token = cache.get("token");
		if (!token) token = getAccessToken();
	}

	private async getAccessToken() {
		//if (this.accessToken && !this.tokenExpired()) return this.accessToken;

		const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
		const secret = process.env.PETFINDER_SECRET_KEY;

		const authenticationUrl = `${this.url}/oauth2/token`;

		const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

		const response = await axios.post(authenticationUrl, dataString);

		//this.accessToken = response.data.access_token;
		//const now = new Date();
		//this.expiration = new Date(now.getTime() + response.data.expires_in * 1000);

		console.log(
			"New Petfinder access token retrieved."
		);

		//return this.accessToken;
		return put("token", response.data.access_token, response.data.expires_in * 1000);
	}

	// private tokenExpired() {
	// 	const now = new Date();
	// 	return this.expiration.getTime() - now.getTime() <= 0;
	// }
}
