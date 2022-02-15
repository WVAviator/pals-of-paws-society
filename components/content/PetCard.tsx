import styles from "./PetCard.module.scss";
import placeholder from "/public/images/paw.svg";
import Image from "next/image";
import { Animal } from "../../src/types/Animal";

const PetCard = ({ animal }: { animal: Animal }) => {
	console.log(animal.location);

	return (
		<div key={animal.id}>
			<h2>{animal.name}</h2>
			<Image
				src={animal.photos[0] ?? placeholder}
				alt={`A ${animal.breed} ${animal.type}`}
				width={300}
				height={300}
				objectFit="cover"
			/>
			<ul>
				<li>Age: {animal.ageString}</li>
				<li>Breed: {animal.breed}</li>
				<li>Location: {animal.location}</li>
			</ul>
			<div>{animal.organization}</div>
		</div>
	);
};

export default PetCard;
