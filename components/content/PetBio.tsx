import { Animal } from "../../src/types/Animal";
import styles from "./PetBio.module.scss";

const PetBio = ({ animal }: { animal: Animal }) => {
	return (
		<section aria-label={`Bio for ${animal.name}`}>
			<h1 className={styles.capitalize}>{animal.name}</h1>
			<p>Age: {animal.ageString}</p>
			<p className={styles.capitalize}>Gender: {animal.sex}</p>
			<p>Breed: {animal.breed}</p>
			<p>{animal.description}</p>
		</section>
	);
};
export default PetBio;
