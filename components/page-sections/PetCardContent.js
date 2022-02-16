import styles from "./PetCardContent.module.scss";
import PetCard from "../../components/content/PetCard";

const PetCardContent = ({ animals }) => {
	const mappedAnimals = animals.map((animal) => {
		return (
			<div key={animal.id}>
				<PetCard animal={animal} />
			</div>
		);
	});
	return (
		<section className={styles.section} aria-label="Adoptable Pets">
			<div className={styles.header}>
				<h1>Adopt your new best friend today</h1>
				<p>
					The animals available for adoption here are either directly managed by
					Pals of Paws Society, or are listed publicly on Petfinder by other
					organizations in Northwest Mississippi.
				</p>
			</div>
			<div className={styles.contents}>{mappedAnimals}</div>
		</section>
	);
};

export default PetCardContent;
