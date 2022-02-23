import PetCardContent from "../../components/page-sections/PetCardContent";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Adopt = () => {
	const [animalData, setAnimalData] = useState([]);

	const { data: initialData, error: initialError } = useSWR(
		"/api/animals/subset",
		fetcher
	);
	const { data, error } = useSWR("/api/animals", fetcher);

	useEffect(() => {
		if (!data) setAnimalData(initialData);
		else setAnimalData(data);
	}, [data, initialData]);

	return (
		<div>
			<PetCardContent animals={animalData} loadingAll={!data} />
		</div>
	);
};

export default Adopt;
