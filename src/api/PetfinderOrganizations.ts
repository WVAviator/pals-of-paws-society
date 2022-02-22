import axios from "axios";
import { Organization } from "../types/Organization";
import getToken from "./PetfinderAuth";
import cache from "memory-cache";

const url = "https://api.petfinder.com/v2/organizations";

const getOrgs = async () => {
	const orgs: Organization[] = cache.get("orgs");
	if (!orgs) {
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
		orgs = cache.put("orgs", response.data.organizations as Organization[], 24 * 60 * 60 * 1000);
		console.log(`Retrieved ${orgs.length} organizations from search area.`);
		
	}
	return orgs;
}

const getOrg = (orgId: string) => {
	return getOrgs().find((org) => {org.id = orgId});
}

export default getOrg;

// class PetfinderOrganizations {
// 	private static instance: PetfinderOrganizations;

// 	private searchLocation = "34.688609, -90.000388";
// 	private searchRadius = "23";

// 	private url = "https://api.petfinder.com/v2/organizations";

// 	private organizations: Promise<Organization[]>;
// 	private refreshInterval = 86400;
// 	private expiration: Date;

// 	constructor() {
// 		this.expiration = new Date("Jan 1, 1900 00:00:01");
// 	}

// 	private static getInstance(): PetfinderOrganizations {
// 		if (!PetfinderOrganizations.instance) {
// 			PetfinderOrganizations.instance = new PetfinderOrganizations();
// 		}
// 		return PetfinderOrganizations.instance;
// 	}

// 	public static async getOrganizations() {
// 		return await PetfinderOrganizations.getInstance().getOrgs();
// 	}

// 	public static async getOrganization(organizationId: string) {
// 		return (await PetfinderOrganizations.getInstance().getOrgs()).find(
// 			(org) => org.id === organizationId
// 		) as Organization;
// 	}

// 	private async getOrgs() {
// 		if (this.organizations && !this.dataExpired()) return this.organizations;

// 		const token = await getToken();
// 		const response = await axios.get(this.url, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 			params: {
// 				location: this.searchLocation,
// 				distance: this.searchRadius,
// 				limit: 100,
// 			},
// 		});
// 		this.organizations = response.data.organizations;

// 		const now = new Date();
// 		this.expiration = new Date(now.getTime() + this.refreshInterval * 1000);

// 		return this.organizations;
// 	}

// 	private dataExpired() {
// 		const now = new Date();
// 		return this.expiration.getTime() - now.getTime() <= 0;
// 	}
// }
