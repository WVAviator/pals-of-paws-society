import axios from "axios";
import Image from "next/image";
import PetCard from "../../components/content/PetCard";
import { getAnimals } from "/src/api/GetAnimals.ts";

const Adopt = ({ animals }) => {
	console.log(animals);

	const mappedAnimals = animals.map((animal) => {
		return <PetCard animal={animal} />;
	});

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
	const animals = await getAnimals();

	return {
		props: { animals },
	};
}

export default Adopt;
