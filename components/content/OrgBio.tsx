import { Organization } from "../../src/types/Organization";

const OrgBio = ({ org }: { org: Organization }) => {
	return (
		<section aria-label="Organization information">
			<h2>{org.name}</h2>
			<p>{`${org.address?.city}, ${org.address?.state}`}</p>
			<p>
				{org.email} | {org.phone}
			</p>
			{org.website ? <p>{org.website}</p> : null}
		</section>
	);
};
export default OrgBio;
