import PetCardContent from "../../components/page-sections/PetCardContent";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { getAllAnimals } from "../../src/api/GetAnimals";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Adopt = ({ animals }) => {
	// const [animalData, setAnimalData] = useState([]);

	// const { data: initialData, error: initialError } = useSWR(
	// 	"/api/animals/subset",
	// 	fetcher
	// );
	// const { data, error } = useSWR("/api/animals", fetcher);

	// useEffect(() => {
	// 	if (!data) setAnimalData(initialData);
	// 	else setAnimalData(data);
	// }, [data, initialData]);

	return (
		<div>
			<PetCardContent animals={animals} />
		</div>
	);
};

export async function getStaticProps() {
	const animals: Animal[] = await getAllAnimals();
	return {
		props: {
			animals
		},
		revalidate: 600
	}
}

export default Adopt;
