import PetCard from "../../components/content/PetCard";
import { Animal } from "../../src/types/Animal";
import { getAnimals } from "../../src/api/GetAnimals";

const Adopt = (props: { animals: Animal[] }) => {
	const mappedAnimals = props.animals.map((animal) => {
		return (
			<div key={animal.id}>
				<PetCard animal={animal} />
			</div>
		);
	});

	return (
		<div
			style={{
				padding: "3rem",
				display: "flex",
				flexWrap: "wrap",
				gap: "2rem",
				backgroundColor: "lightgray",
			}}
		>
			{mappedAnimals}
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAnimals();

	return {
		props: { animals },
	};
}

export default Adopt;
