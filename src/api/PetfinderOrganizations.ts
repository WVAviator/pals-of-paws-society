import axios from "axios";
import { Organization } from "../types/Organization";
import getToken from "./PetfinderAuth";
import cache from "memory-cache";

const url = "https://api.petfinder.com/v2/organizations";
const cacheExpiration = 86400000; // 24 hours


const getAllOrganizations = async () => {
	return (
		(cache.get("orgs") as Organization[]) ?? (await retrieveNewOrganizations())
	);
};

const retrieveNewOrganizations = async () => {
	
	const token = await getToken();
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
	const organizations = cache.put("orgs", response.data.organizations as Organization[], cacheExpiration);

	return organizations;
};

const getOrganization = async (orgId: string) => {
	const organizations = await getAllOrganizations();
	const result = organizations.find((org) => org.id === orgId);

	return result;
};

export default getOrganization;
