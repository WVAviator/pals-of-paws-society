import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
const secret = process.env.PETFINDER_SECRET_KEY;

const url = "https://api.petfinder.com/v2";
const authenticationUrl = `${url}/oauth2/token`;

const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

class PetfinderAuthError extends Error {}

const getToken = async () => {
	const { token, expiration } = await retrieveNewToken();
	return token;
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
