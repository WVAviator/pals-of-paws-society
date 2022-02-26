import axios from "axios";

const cache = require("memory-cache");

const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
const secret = process.env.PETFINDER_SECRET_KEY;

const url = "https://api.petfinder.com/v2";
const authenticationUrl = `${url}/oauth2/token`;

const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

class PetfinderAuthError extends Error {}

const getToken = async () => {
	return (cache.get("token") as string) ?? (await retrieveNewToken());
};

const retrieveNewToken = async () => {
	let token: string;

	try {
		const response = await axios.post(authenticationUrl, dataString);

		token = cache.put(
			"token",
			response.data.access_token as string,
			response.data.expires_in * 1000
		) as string;
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve Petfinder access token."
		);
		throw new PetfinderAuthError(error);
	}

	return token;
};

export default getToken;
