import { Paper } from "@mui/material";
import { Organization } from "../../src/types/Organization";
import styles from "./OrgBio.module.scss";

interface OrgBioProps {
	org: Organization;
}

const OrgBio = ({ org }: OrgBioProps) => {
	return (
		<article aria-labelledby={`org-${org.id}`}>
			<Paper elevation={3} className={styles.card}>
				<h2 id={`org-${org.id}`}>{org.name}</h2>
				<p>{`${org.address?.city}, ${org.address?.state}`}</p>
				<p>&nbsp;</p>
				<p className={styles.contactInfo}>Email</p>
				<a href={`mailto:${org.email}`}>
					<p>{org.email}</p>
				</a>
				<p className={styles.contactInfo}>Phone</p>
				<a href={`tel:${org.phone}`}>
					<p>{org.phone}</p>
				</a>

				{org.website ? (
					<>
						<p className={styles.contactInfo}>Website</p>
						<a href={org.website}>
							<p>{org.website}</p>
						</a>
					</>
				) : null}
			</Paper>
		</article>
	);
};
export default OrgBio;
