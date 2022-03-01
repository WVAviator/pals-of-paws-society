import axios from "axios";
import redis from "../redis";

const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
const secret = process.env.PETFINDER_SECRET_KEY;

const url = "https://api.petfinder.com/v2";
const authenticationUrl = `${url}/oauth2/token`;

const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

class PetfinderAuthError extends Error {}

const getToken = async () => {
	const cachedToken = redis.get("pftoken");

	if (!cachedToken) {
		const token = await retrieveNewToken();
		redis.set("pftoken", token, "EX", 3600);
		return token;
	}
	return cachedToken;
};

const retrieveNewToken = async () => {
	let token: string;

	try {
		const response = await axios.post(authenticationUrl, dataString);
		token = response.data.access_token;
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve Petfinder access token."
		);
		throw new PetfinderAuthError(error);
	}

	return token;
};

export default getToken;
