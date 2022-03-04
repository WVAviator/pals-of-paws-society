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
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (router.query.animal) {
			const urlAnimal = animals.find((a) => a.id === router.query.animal);
			if (urlAnimal) {
				setSelectedAnimal(urlAnimal);
			}
		} else {
			if (router.query.page) {
				setPage(Number(router.query.page));
			}
			if (router.query.scrollY) {
				window.scrollTo(0, Number(router.query.scrollY));
			}
		}
	}, []);

	const routeToAnimal = (animal: Animal) => {
		router.push(
			`/adopt?animal=${animal.id}&page=${page}&scrollY=${window.scrollY}`,
			`/adopt?animal=${animal.id}`,
			{ shallow: true }
		);
	};

	const routeBack = () => {
		const previousPage = router.query.page ?? "1";
		const previousScroll = router.query.scrollY ?? "0";

		router.push(
			`/adopt?page=${previousPage}&scrollY=${previousScroll}`,
			"/adopt",
			{ shallow: true }
		);
	};

	return (
		<div>
			{selectedAnimal ? (
				<>
					<PetDisplay
						animal={selectedAnimal}
						setSelectedAnimal={setSelectedAnimal}
						routeBack={routeBack}
					/>
				</>
			) : (
				<>
					<PetCardContent
						animals={animals}
						setSelectedAnimal={setSelectedAnimal}
						page={page}
						setPage={setPage}
						routeToAnimal={routeToAnimal}
					/>
				</>
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
