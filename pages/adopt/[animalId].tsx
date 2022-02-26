import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAnimalById } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";
import PetCarousel from "../../components/content/PetCarousel";
import PetBio from "../../components/content/PetBio";
import OrgBio from "../../components/content/OrgBio";
import Fallback from "../../components/layout/Fallback";
import PawprintSection from "../../components/page-sections/PawprintSection";
import PetContent from "../../components/layout/PetContent";

interface AnimalPageProps {
	animal: Animal;
}

const AnimalPage = ({ animal }: AnimalPageProps) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Fallback />;
	}

	return (
		<div>
			<PetCarousel animal={animal} />
			<PawprintSection pawprintRotation={170} sectionTitle={animal.name}>
				<PetContent animal={animal} />
			</PawprintSection>
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
