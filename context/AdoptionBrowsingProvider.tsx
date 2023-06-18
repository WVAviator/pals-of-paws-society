import React from "react";
import { AdoptionBrowsingContext } from "./AdoptionBrowsingContext";
import { Animal } from "../src/types/Animal";
import { AnimalFilter } from "../components/forms/AnimalFilter";

interface AdoptionBrowsingProviderProps {
	children: React.ReactNode;
}

const AdoptionBrowsingProvider: React.FC<AdoptionBrowsingProviderProps> = ({
	children,
}) => {
	const [currentAnimals, setCurrentAnimals] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [selectedAnimal, setSelectedAnimal] = React.useState<Animal | null>(
		null
	);
	const [savedScrollPosition, setSavedScrollPosition] = React.useState(0);
	const [loading, setLoading] = React.useState(true);
	const [filter, setFilter] = React.useState<AnimalFilter>({
		cat: true,
		dog: true,
		male: true,
		female: true,
		petfinder: true,
	});
	return (
		<AdoptionBrowsingContext.Provider
			value={{
				currentAnimals,
				setCurrentAnimals,
				currentPage,
				setCurrentPage,
				selectedAnimal,
				setSelectedAnimal,
				savedScrollPosition,
				setSavedScrollPosition,
				loading,
				setLoading,
				filter,
				setFilter,
			}}
		>
			{children}
		</AdoptionBrowsingContext.Provider>
	);
};

export default AdoptionBrowsingProvider;
