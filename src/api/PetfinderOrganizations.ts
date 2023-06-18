import axios from "axios";
import { Organization } from "../types/Organization";

const url = "https://api.petfinder.com/v2/organizations";
const cacheExpiration = 86400; // 24 hours

export const getAllOrganizations = async (token: string) => {
	const response = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			location: "34.688609, -90.000388",
			distance: "23",
			limit: 100,
		},
	});
	const organizations = response.data.organizations as Organization[];

	return organizations;
};
