import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getStaticProps } from ".";
import { Animal } from "../../src/types/Animal";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AnimalPage = () => {
	const [animal, setAnimal] = useState<Animal>(null);
	const router = useRouter();
	const { animalId } = router.query;
	const { data, error } = useSWR(`/api/animals/${animalId}`, fetcher);

	useEffect(() => {
		setAnimal(data as Animal);
	}, [data]);

	return <div>{JSON.stringify(animal)}</div>;
};

export async function getStaticProps(context) {

	

}

export default AnimalPage;
