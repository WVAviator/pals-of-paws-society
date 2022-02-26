import { Animal } from "../../src/types/Animal";
import OrgBio from "../content/OrgBio";
import PetBio from "../content/PetBio";
import AnimalInquiry from "../forms/AnimalInquiry";
import styles from "./PetContent.module.scss";

const PetContent = ({ animal }: { animal: Animal }) => {
	return (
		<div className={styles.content}>
			<div className={styles.info}>
				<PetBio animal={animal} />
				<OrgBio org={animal.organization} />
			</div>
			<div className={styles.form}>
				<AnimalInquiry animal={animal} />
			</div>
		</div>
	);
};

export default PetContent;