import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PetCardContent from "../../components/page-sections/PetCardContent";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { getAllAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";
interface AdoptProps {
	animals: Animal[];
}

const Adopt = ({ animals }: AdoptProps) => {
	const router = useRouter();
	const selectedAnimal = useRef<Animal>(
		animals.find((a) => a.id === router.query.animal) || null
	);
	const page = Number(router.query.page) || 1;

	const routeToAnimal = (animal: Animal) => {
		router.push(`/adopt?animal=${animal.id}`, null, { shallow: true });
	};

	const updatePage = (newPage: number) => {
		router.push(`/adopt?page=${newPage}`, null, { shallow: true });
	};

	const routeBack = () => {
		router.back();
	};

	return (
		<div>
			{selectedAnimal.current ? (
				<>
					<PetDisplay
						animal={selectedAnimal.current}
						routeBack={routeBack}
					/>
				</>
			) : (
				<>
					<PetCardContent
						animals={animals}
						page={page}
						setPage={updatePage}
						routeToAnimal={routeToAnimal}
					/>
				</>
			)}
		</div>
	);
};

export async function getStaticProps() {
	console.log("Retrieving static props...", new Date());
	return {
		props: {
			animals: await getAllAnimals(),
		},
		revalidate: 60,
	};
}

export default Adopt;
