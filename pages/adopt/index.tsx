import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PetCardContent from "../../components/page-sections/PetCardContent";
import PetDisplay from "../../components/page-sections/PetDisplay";
import redis from "../../src/redis";
import { Animal } from "../../src/types/Animal";
interface AdoptProps {
	animals: Animal[];
	updatedAt: string;
}

const Adopt = ({ animals, updatedAt }: AdoptProps) => {
	console.log("Animals last updated at: ", updatedAt);

	const [currentAnimals, setCurrentAnimals] = useState(animals);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
	const [savedScrollPosition, setSavedScrollPosition] = useState(0);

	useEffect(() => {
		const getAnimalsForPage = async () => {
			const newAnimals = (await axios.get(`/api/animals`))
				.data as Animal[];
			console.log(newAnimals);
			setCurrentAnimals(newAnimals);
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

	return (
		<div>
			{currentAnimal ? (
				<>
					<PetDisplay
						animal={currentAnimal}
						routeBack={returnToSearch}
					/>
				</>
			) : (
				<>
					<PetCardContent
						animals={currentAnimals}
						page={currentPage}
						setPage={changePage}
						routeToAnimal={goToAnimal}
					/>
				</>
			)}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	console.log("Retrieving static props...", new Date());

	const jsonAnimals = await redis.get("animals:1");
	const animals: Animal[] = (await JSON.parse(jsonAnimals)) || [];

	return {
		props: {
			animals,
			updatedAt: new Date().toISOString(),
		},
		revalidate: 3600,
	};
};

export default Adopt;
