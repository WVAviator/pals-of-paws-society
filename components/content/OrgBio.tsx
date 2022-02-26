import { Organization } from "../../src/types/Organization";

const OrgBio = ({ org }: { org: Organization }) => {
	const orgSchema = (orgName: string) => {
		return orgName.toLowerCase().includes("shelter")
			? "https://schema.org/AnimalShelter"
			: "https://schema.org/LocalBusiness";
	};

	return (
		<article aria-label="Organization" itemScope itemType={orgSchema(org.name)}>
			<h2 itemProp="name">{org.name}</h2>
			<p itemProp="location">{`${org.address?.city}, ${org.address?.state}`}</p>
			<p>
				<span itemProp="email">{org.email}</span> |{" "}
				<span itemProp="telephone">{org.phone}</span>
			</p>
			{org.website ? <p itemProp="url">{org.website}</p> : null}
		</article>
	);
};
export default OrgBio;
