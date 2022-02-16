import { Animal } from "../../src/types/Animal";
import PetCardContent from "../../components/page-sections/PetCardContent";
import { getAnimals } from "../../src/api/GetAnimals";

const Adopt = ({ animals }: { animals: Animal[] }) => {
	return (
		<div>
			<PetCardContent animals={animals} />
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
