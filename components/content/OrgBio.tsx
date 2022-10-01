import { Paper } from "@mui/material";
import { Organization } from "../../src/types/Organization";
import styles from "./OrgBio.module.scss";

interface OrgBioProps {
	org: Organization;
}

const OrgBio = ({ org }: OrgBioProps) => {
	const orgSchema = (orgName: string) => {
		return orgName.toLowerCase().includes("shelter")
			? "https://schema.org/AnimalShelter"
			: "https://schema.org/LocalBusiness";
	};

	return (
		<article aria-label="Organization" itemScope itemType={orgSchema(org.name)}>
			<Paper elevation={3} className={styles.card}>
				<h2 itemProp="name">{org.name}</h2>
				<p itemProp="location">{`${org.address?.city}, ${org.address?.state}`}</p>
				<p>&nbsp;</p>
				<p className={styles.contactInfo}>Email</p>
				<a href={`mailto:${org.email}`}>
					<p itemProp="email">{org.email}</p>
				</a>
				<p className={styles.contactInfo}>Phone</p>
				<a href={`tel:${org.phone}`}>
					<p itemProp="telephone">{org.phone}</p>
				</a>

				{org.website ? (
					<>
						<p className={styles.contactInfo}>Website</p>
						<a href={org.website}>
							<p itemProp="url">{org.website}</p>
						</a>
					</>
				) : null}
			</Paper>
		</article>
	);
};
export default OrgBio;
