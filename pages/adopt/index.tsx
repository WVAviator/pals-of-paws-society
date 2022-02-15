import PetCard from "../../components/content/PetCard";
import { Animal } from "../../src/types/Animal";
import { getAnimals } from "../../src/api/GetAnimals";

const Adopt = (props: { animals: Animal[] }) => {
	console.log(props.animals);

	const mappedAnimals = props.animals.map((animal) => {
		return <PetCard animal={animal} />;
	});

	console.log(mappedAnimals);

	return (
		<div
			style={{
				padding: "3rem",
				display: "flex",
				flexWrap: "wrap",
				gap: "2rem",
			}}
		>
			{mappedAnimals}
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAnimals();
	console.log(animals);

	return {
		props: { animals },
	};
}

export default Adopt;
