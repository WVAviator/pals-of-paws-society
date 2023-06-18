import { GetServerSideProps, NextPage } from "next";
import React from "react";
import useAdoptionBrowsingContext from "../../context/useAdoptionBrowsingContext";
import { useRouter } from "next/router";
import Fallback from "../../components/layout/Fallback";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { NextSeo } from "next-seo";

interface AnimalPageProps {
	animalId: string;
	referrer: string;
}

const AnimalPage: NextPage<AnimalPageProps> = ({ animalId, referrer }) => {
	const [animal, setAnimal] = React.useState(null);

	const { currentAnimals } = useAdoptionBrowsingContext();

	const router = useRouter();

	React.useEffect(() => {
		setAnimal(currentAnimals.find((animal) => animal.id === animalId));
	}, [currentAnimals, animalId]);

	if (!animal) {
		return <Fallback />;
	}

	const handleRouteBack = () => {
		if (referrer === "/adopt") {
			router.back();
		} else {
			router.push("/adopt");
		}
	};

	return (
		<>
			<NextSeo
				title={`${animal.name} - ${animal.organization.name}`}
				description={`${animal.name} is a ${animal.sex} ${
					animal.breed
				} available for adoption from ${animal.organization.name} in ${
					animal.location
				}. Through our website at Pals of Paws Society, you can send a message to ${
					animal.organization.name
				} about ${animal.name}, or navigate to ${
					animal.sex === "male" ? "his" : "her"
				} Petfinder profile to learn more.`}
				openGraph={{
					title: `Adopt ${animal.name} today!`,
					description: animal.description,
					url: `https://www.palsofpawssociety.org/adopt/${animal.id}`,
					images: [
						{
							url: animal.photos[0],
							width: 500,
							height: 500,
							alt: `A ${animal.breed} ${animal.type}`,
						},
					],
				}}
			/>
			<PetDisplay animal={animal} routeBack={handleRouteBack} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { animalId } = context.query;
	const referrer = context.req.headers.referer || "";

	return {
		props: {
			animalId,
			referrer,
		},
	};
};

export default AnimalPage;
