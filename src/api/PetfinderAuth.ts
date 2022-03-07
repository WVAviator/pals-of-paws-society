import axios from "axios";
import redis from "../redis";

const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
const secret = process.env.PETFINDER_SECRET_KEY;

const url = "https://api.petfinder.com/v2";
const authenticationUrl = `${url}/oauth2/token`;

const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

class PetfinderAuthError extends Error {}

const getToken = async () => {
	const cachedToken = await redis.get("pftoken");
	console.log(
		cachedToken
			? "Cached token received:" + cachedToken
			: "No cached token found. Retrieving new token..."
	);

	if (!cachedToken) {
		const { token, expiration } = await retrieveNewToken();
		redis.set("pftoken", token, "EX", expiration);
		console.log(`Cached new token for ${expiration} seconds.`);

		return token;
	}
	return cachedToken;
};

const retrieveNewToken = async () => {
	let token: string;
	let expiration: number;

	try {
		const response = await axios.post(authenticationUrl, dataString);
		token = response.data.access_token;
		expiration = response.data.expires_in;
		console.log("New token retrieved: " + token);
	} catch (error) {
		console.error(
			"Error occurred while attempting to retrieve Petfinder access token."
		);
		throw new PetfinderAuthError(error);
	}

	return { token, expiration };
};

export default getToken;
