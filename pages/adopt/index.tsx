import { Modal } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PetCardContent from "../../components/page-sections/PetCardContent";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { getAllAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";

interface AdoptProps {
	animals: Animal[];
}

const Adopt = ({ animals }: AdoptProps) => {
	const router = useRouter();
	const [selectedAnimal, setSelectedAnimal] = useState<Animal>(null);
	//const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		if (router.query.animal) {
			const urlAnimal = animals.find((a) => a.id === router.query.animal);
			if (urlAnimal) {
				setSelectedAnimal(urlAnimal);
				//setScrollPosition(window.scrollY);
			} else {
				//window.scrollTo(0, scrollPosition);
			}
		}
	}, []);

	return (
		<div>
			{selectedAnimal ? (
				<PetDisplay
					animal={selectedAnimal}
					setSelectedAnimal={setSelectedAnimal}
				/>
			) : (
				<PetCardContent
					animals={animals}
					setSelectedAnimal={setSelectedAnimal}
				/>
			)}
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAllAnimals();
	return {
		props: {
			animals,
		},
		revalidate: 3600,
	};
}

export default Adopt;
