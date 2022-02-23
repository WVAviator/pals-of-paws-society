import axios from "axios";
import cache from "memory-cache";

const apiKey = process.env.NEXT_PUBLIC_PETFINDER_API_KEY;
const secret = process.env.PETFINDER_SECRET_KEY;

const url = "https://api.petfinder.com/v2";
const authenticationUrl = `${url}/oauth2/token`;

const dataString = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`;

const getToken = async () => {
	return (cache.get("token") as string) ?? (await retrieveNewToken());
};

const retrieveNewToken = async () => {
	const response = await axios.post(authenticationUrl, dataString);

	console.log("New Petfinder access token retrieved.");

	return cache.put(
		"token",
		response.data.access_token as string,
		response.data.expires_in * 1000
	);
};

export default getToken;
