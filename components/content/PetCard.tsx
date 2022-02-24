import styles from "./PetCard.module.scss";
import placeholder from "/public/images/no-image.svg";
import Image from "next/image";
import { Animal } from "../../src/types/Animal";
import AnimalIcons from "../ui/AnimalIcons";
import Link from "next/link";

const PetCard = ({ animal }: { animal: Animal }) => {
	const cardStyle =
		animal.organization.name === "Pals of Paws Society"
			? `${styles.card} ${styles.featured}`
			: styles.card;

	return (
		<Link href={`/adopt/${animal.id}`}>
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
		</Link>
	);
};

export default PetCard;
