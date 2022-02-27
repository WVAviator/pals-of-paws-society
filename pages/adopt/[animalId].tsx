import { CircularProgress, dividerClasses } from "@mui/material";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAnimalById } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";
import PetCarousel from "../../components/content/PetCarousel";
import { ArrowLeft } from "@mui/icons-material";
import Fallback from "../../components/layout/Fallback";
import PawprintSection from "../../components/page-sections/PawprintSection";
import PetContent from "../../components/layout/PetContent";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

type AnimalFetcher = (url: string) => Promise<Animal>;
const fetcher: AnimalFetcher = (url) => axios.get(url).then((res) => res.data);

const AnimalPage = () => {
	const [animal, setAnimal] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const { animalId } = router.query;
		if (!animalId) return;

		const queryAnimal = async () => {
			const response = await axios.get(`/api/animals/${animalId}`);
			setAnimal(response.data as Animal);
		};
		queryAnimal();
	}, []);

	if (!animal) return <Fallback />;

	const backStyle = {
		backgroundColor: "#0f172a",
		color: "white",
		display: "flex",
		alignItems: "center",
		padding: "0.5em",
		cursor: "pointer",
	};

	return (
		<div>
			<div style={backStyle} onClick={router.back}>
				<ArrowLeft htmlColor="white" />
				Back to Results
			</div>
			<PetCarousel animal={animal} />
			<PawprintSection pawprintRotation={170} sectionTitle={animal.name}>
				<PetContent animal={animal} />
			</PawprintSection>
		</div>
	);
};

// export const getStaticProps: GetStaticProps = async (context) => {
// 	console.log(
// 		"Generating static props for animal with ID: " + context.params.animalId
// 	);

// 	let animal: Animal;
// 	try {
// 		animal = await getAnimalById(context.params.animalId as string);
// 	} catch (error) {
// 		console.log(
// 			`Animal with ID ${context.params.animalId} was not found.`,
// 			error.message
// 		);
// 	}

// 	if (!animal) return { props: { animal: null } };

// 	return {
// 		props: { animal },
// 	};
// };

// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: "blocking",
// 	};
// };

export default AnimalPage;
