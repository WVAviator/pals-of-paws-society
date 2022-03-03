import axios from "axios";
import { Organization } from "../types/Organization";
import getToken from "./PetfinderAuth";
import redis from "../redis";

const url = "https://api.petfinder.com/v2/organizations";
const cacheExpiration = 86400; // 24 hours

export const getAllOrganizations = async () => {
	const cachedOrganizationsRaw = await redis.get("orgs");
	if (cachedOrganizationsRaw) {
		const cachedOrganizations: Organization[] = JSON.parse(
			cachedOrganizationsRaw
		);
		return cachedOrganizations;
	} else {
		const organizations = await retrieveNewOrganizations();
		const jsonOrganziations = JSON.stringify(organizations);
		redis.set("orgs", jsonOrganziations, "EX", 86400);
		return organizations;
	}
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
	const organizations = response.data.organizations as Organization[];

	return organizations;
};

const getOrganization = async (orgId: string) => {
	const organizations = await getAllOrganizations();
	const result = organizations.find((org) => org.id === orgId);

	return result;
};

export default getOrganization;
