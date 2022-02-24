import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAnimalById } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";
import PetCarousel from "../../components/content/PetCarousel";
import PetBio from "../../components/content/PetBio";
import OrgBio from "../../components/content/OrgBio";

interface AnimalPageProps {
	animal: Animal;
}

const AnimalPage = ({ animal }: AnimalPageProps) => {
	const router = useRouter();

	if (router.isFallback) {
		const fallbackStyle = {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "100vw",
			height: "100vh"
		}
		return <div style={fallbackStyle}><CircularProgress /></div>;
	}

	return (
		<div>
			<PetCarousel animal={animal} />
			<PetBio animal={animal} />
			<OrgBio org={animal.organization} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const animal = await getAnimalById(context.params.animalId as string);

	return {
		props: { animal },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default AnimalPage;
