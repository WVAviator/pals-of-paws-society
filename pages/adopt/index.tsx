import { Animal } from "../../src/types/Animal";
import PetCardContent from "../../components/page-sections/PetCardContent";
import { getAnimals } from "../../src/api/GetAnimals";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Adopt = () => {
	const { data, error } = useSWR("/api/animals", fetcher);

	return (
		<div>
			<PetCardContent animals={data} />
		</div>
	);
};

export default Adopt;
