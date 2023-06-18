import React from "react";
import { AnimalFilter } from "../components/forms/AnimalFilter";
import { Animal } from "../src/types/Animal";

interface AdoptionBrowsingState {
	currentAnimals: Animal[];
	setCurrentAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	selectedAnimal: Animal | null;
	setSelectedAnimal: React.Dispatch<React.SetStateAction<Animal | null>>;
	savedScrollPosition: number;
	setSavedScrollPosition: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	filter: AnimalFilter;
	setFilter: React.Dispatch<React.SetStateAction<AnimalFilter>>;
}

export const AdoptionBrowsingContext =
	React.createContext<AdoptionBrowsingState>({
		currentAnimals: [],
		setCurrentAnimals: () => {},
		currentPage: 1,
		setCurrentPage: () => {},
		selectedAnimal: null,
		setSelectedAnimal: () => {},
		savedScrollPosition: 0,
		setSavedScrollPosition: () => {},
		loading: true,
		setLoading: () => {},
		filter: {
			cat: true,
			dog: true,
			male: true,
			female: true,
			petfinder: true,
		},
		setFilter: () => {},
	});
