import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PetCardContent from "../../components/page-sections/PetCardContent";
import { getAllAnimals, getAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";

interface AdoptProps {
	initialAnimals: Animal[];
}

type AnimalFetcher = (url: string) => Promise<Animal[]>;

const fetcher: AnimalFetcher = (url) => axios.get(url).then((res) => res.data);

const Adopt = ({ initialAnimals }: AdoptProps) => {
	const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
	const { data, error } = useSWR("/api/animals", fetcher);

	useEffect(() => {
		if (data) setAnimals(data);
	}, [data]);

	return (
		<div>
			<PetCardContent animals={animals} />
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAnimals(24);
	return {
		props: {
			initialAnimals: animals,
		},
		revalidate: 600,
	};
}

export default Adopt;
