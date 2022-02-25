import { Organization } from "../../src/types/Organization";

const OrgBio = ({ org }: { org: Organization }) => {
	return (
		<section aria-label="Organization information" itemScope itemType="https://schema.org/AnimalShelter">
			<h2 itemProp="legalName">{org.name}</h2>
			<p itemProp="location">{`${org.address?.city}, ${org.address?.state}`}</p>
			<p>
				<span itemProp="email">{org.email}</span> | <span itemProp="telephone">{org.phone}</span>
			</p>
			{org.website ? <p itemProp="website">{org.website}</p> : null}
		</section>
	);
};
export default OrgBio;
