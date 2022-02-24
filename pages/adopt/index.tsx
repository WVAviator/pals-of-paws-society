import PetCardContent from "../../components/page-sections/PetCardContent";
import { getAllAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";

interface AdoptProps {
	animals: Animal[];
}

const Adopt = ({ animals }: AdoptProps) => {
	return (
		<div>
			<PetCardContent animals={animals} />
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAllAnimals();
	return {
		props: {
			animals,
		},
		revalidate: 1200,
	};
}

export default Adopt;
