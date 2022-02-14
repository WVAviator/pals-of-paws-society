import styles from "./PetCard.module.scss";

const PetCard = ({ animal }) => {
	return (
		<div>
			<h2>{animal.name}</h2>
			<img src={animal.photos[0]} alt={`A ${animal.breed} ${animal.type}`} />
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
