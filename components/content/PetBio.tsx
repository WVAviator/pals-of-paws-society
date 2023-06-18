import { Paper } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import AnimalIcons from "../ui/AnimalIcons";
import styles from "./PetBio.module.scss";

interface PetBioProps {
	animal: Animal;
}

const PetBio = ({ animal }: PetBioProps) => {
	return (
		<>
			<article aria-label={`Bio for ${animal.name}`}>
				<Paper elevation={3} className={styles.card}>
					<div>
						<h2 className={styles.capitalize}>{animal.name}</h2>
						<p>Age: {animal.ageString}</p>
						<p className={styles.capitalize}>Gender: {animal.sex}</p>
						<p>Breed: {animal.breed}</p>
						<p>
							{animal.description}
							{animal.link ? (
								<span>
									<a href={animal.link}> Read More</a>
								</span>
							) : null}
						</p>
					</div>
					<div>
						<AnimalIcons sex={animal.sex} type={animal.type} />
					</div>
				</Paper>
			</article>
		</>
	);
};
export default PetBio;
