import { useEffect, useState } from "react";
import { AnimalFilter } from "../../components/forms/AnimalFilter";
import Fallback from "../../components/layout/Fallback";
import PetCardContent from "../../components/page-sections/PetCardContent";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { Animal } from "../../src/types/Animal";

const Adopt = () => {
	const [currentAnimals, setCurrentAnimals] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
	const [savedScrollPosition, setSavedScrollPosition] = useState(0);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<AnimalFilter>({
		cat: true,
		dog: true,
		male: true,
		female: true,
		petfinder: true,
	});

	useEffect(() => {
		const getAnimalsForPage = async () => {
			const response = await fetch(`/api/animals`);
			const responseJson = await response.json();
			const newAnimals: Animal[] = await JSON.parse(responseJson);

			setCurrentAnimals(newAnimals);
			setLoading(false);
		};
		getAnimalsForPage();
	}, []);

	const goToAnimal = (animal: Animal) => {
		setSavedScrollPosition(window.scrollY);
		setCurrentAnimal(animal);
		window.scrollTo(0, 0);
	};

	const returnToSearch = () => {
		setCurrentAnimal(null);
		setTimeout(() => window.scrollTo(0, savedScrollPosition), 0);
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	const filteredAnimals = currentAnimals.filter((animal) => {
		if (animal.type === "cat" && !filter.cat) return false;
		if (animal.type === "dog" && !filter.dog) return false;
		if (animal.sex === "male" && !filter.male) return false;
		if (animal.sex === "female" && !filter.female) return false;
		if (animal.id.startsWith("pf") && !filter.petfinder) return false;
		return true;
	});

	if (loading) {
		return <Fallback />;
	}

	return (
		<div>
			{currentAnimal ? (
				<>
					<PetDisplay animal={currentAnimal} routeBack={returnToSearch} />
				</>
			) : (
				<>
					<PetCardContent
						animals={filteredAnimals}
						page={currentPage}
						setPage={changePage}
						routeToAnimal={goToAnimal}
						filter={filter}
						setFilter={setFilter}
						loading={loading}
					/>
				</>
			)}
		</div>
	);
};

export default Adopt;
