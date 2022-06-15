import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
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

export const getStaticProps: GetStaticProps = async () => {
	console.log("Retrieving static props...", new Date());

	const jsonAnimals = await redis.get("animals");
	const animals: Animal[] = (await JSON.parse(jsonAnimals)) || [];

	return {
		props: {
			animals,
			updatedAt: new Date(),
		},
		revalidate: 3600,
	};
};

export default Adopt;
