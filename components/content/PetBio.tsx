import { Paper } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import AnimalIcons from "../ui/AnimalIcons";
import styles from "./PetBio.module.scss";

const PetBio = ({ animal }: { animal: Animal }) => {
	return (
		<article aria-label={`Bio for ${animal.name}`}>
			<Paper elevation={3} className={styles.card}>
				<div>
					<h2 className={styles.capitalize}>{animal.name}</h2>
					<p>Age: {animal.ageString}</p>
					<p className={styles.capitalize}>Gender: {animal.sex}</p>
					<p>Breed: {animal.breed}</p>
					<p>{animal.description}</p>
				</div>
				<div>
					<AnimalIcons sex={animal.sex} type={animal.type} />
				</div>
			</Paper>
		</article>
	);
};
export default PetBio;
