import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import PetCardContent from "../../components/page-sections/PetCardContent";
import { getAllAnimals, getInitialAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";

interface AdoptProps {
	initialAnimals: Animal[];
}

type AnimalFetcher = (url: string) => Promise<Animal[]>;

const fetcher: AnimalFetcher = (url) => axios.get(url).then((res) => res.data);

const Adopt = ({ initialAnimals }: AdoptProps) => {
	const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
	//const { data, error } = useSWR("/api/animals", fetcher);

	// useEffect(() => {
	// 	if (data) setAnimals(data);
	// 	else setAnimals(initialAnimals);
	// }, [data, initialAnimals]);

	return (
		<div>
			<PetCardContent animals={animals} />
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getInitialAnimals(50); //TODO: Reduce back to 24 once caching is implemented
	return {
		props: {
			initialAnimals: animals,
		},
		revalidate: 600,
	};
}

export default Adopt;
