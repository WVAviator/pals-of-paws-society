import styles from "./PetCard.module.scss";
import { Animal } from "../../src/types/Animal";
import placeholder from "/public/images/no-image.svg";
import AnimalIcons from "../ui/AnimalIcons";
import Image from "next/image";

interface PetCardProps {
	animal: Animal;
	isPriority?: boolean;
	routeToAnimal: (animal: Animal) => void;
}

const PetCard = ({
	animal,
	isPriority = false,
	routeToAnimal,
}: PetCardProps) => {
	const cardStyle =
		animal.organization.name === "Pals of Paws Society"
			? `${styles.card} ${styles.featured}`
			: styles.card;

	return (
		<a onClick={() => routeToAnimal(animal)}>
			<div key={animal.id} className={cardStyle}>
				<div className={styles.content}>
					<div className={styles.header}>
						<h2 className={styles.title}>{animal.name}</h2>
						<AnimalIcons type={animal.type} sex={animal.sex} />
					</div>
					<div className={styles.image}>
						<Image
							src={animal.photos[0] ?? placeholder}
							alt={`A ${animal.breed} ${animal.type}`}
							priority={isPriority}
							width={280}
							height={280}
							objectFit="cover"
						/>
					</div>
					<ul>
						<li>Age: {animal.ageString}</li>
						<li>Breed: {animal.breed}</li>
						<li>Location: {animal.location}</li>
					</ul>
					<div className={styles.org}>
						<p>{animal.organization.name}</p>
					</div>
				</div>
			</div>
		</a>
	);
};

export default PetCard;
