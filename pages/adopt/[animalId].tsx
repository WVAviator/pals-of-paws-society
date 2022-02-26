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
import { useEffect } from "react";

interface AnimalPageProps {
	animal: Animal;
	isError: boolean;
}

const AnimalPage = ({ animal }: AnimalPageProps) => {
	const router = useRouter();

	useEffect(() => {
		if (!animal) router.push("/adopt");
	}, []);

	if (router.isFallback) {
		return <Fallback />;
	}

	const backStyle = {
		backgroundColor: "#0f172a",
		color: "white",
		display: "flex",
		alignItems: "center",
		padding: "0.5em",
		cursor: "pointer",
	};

	return (
		<>
			{animal && (
				<div>
					<div style={backStyle} onClick={() => router.back()}>
						<ArrowLeft htmlColor="white" />
						Back to Results
					</div>
					<PetCarousel animal={animal} />
					<PawprintSection pawprintRotation={170} sectionTitle={animal.name}>
						<PetContent animal={animal} />
					</PawprintSection>
				</div>
			)}
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	let animal: Animal;
	try {
		animal = await getAnimalById(context.params.animalId as string);
	} catch (error) {}

	return {
		props: { animal: animal ?? null },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default AnimalPage;
