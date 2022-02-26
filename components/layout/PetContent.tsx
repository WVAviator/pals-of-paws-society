import { Animal } from "../../src/types/Animal";
import OrgBio from "../content/OrgBio";
import PetBio from "../content/PetBio";
import AnimalInquiry from "../forms/AnimalInquiry";
import styles from "./PetContent.module.scss";

const PetContent = ({ animal }: { animal: Animal }) => {
	return (
		<div className={styles.content}>
			<PetBio animal={animal} />
			<AnimalInquiry />
			<OrgBio org={animal.organization} />
		</div>
	);
};

export default PetContent;
