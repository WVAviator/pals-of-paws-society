import React from "react";
import { AdoptionBrowsingContext } from "./AdoptionBrowsingContext";
import { useRouter } from "next/router";
import { Animal } from "../src/types/Animal";

const useAdoptionBrowsingContext = () => {
	const {
		currentAnimals,
		setCurrentAnimals,
		currentPage,
		setCurrentPage,
		filter,
		setFilter,
		loading,
		setLoading,
	} = React.useContext(AdoptionBrowsingContext);

	const router = useRouter();

	React.useEffect(() => {
		const getAnimalsForPage = async () => {
			if (currentAnimals.length > 0) return;

			const response = await fetch(`/api/animals`);
			const newAnimals: Animal[] = await response.json();
			// const newAnimals: Animal[] = await JSON.parse(responseJson);

			setCurrentAnimals(newAnimals);
			setLoading(false);
		};
		getAnimalsForPage();
	}, [currentAnimals, setCurrentAnimals, setLoading]);

	const goToAnimal = (animal: Animal) => {
		router.push(`/adopt/${animal.id}`);
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

	return {
		filteredAnimals,
		currentAnimals,
		goToAnimal,
		changePage,
		currentPage,
		filter,
		loading,
		setFilter,
	};
};

export default useAdoptionBrowsingContext;
