import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { Animal } from "../../src/types/Animal";

interface AnimalPageProps {
	animal: Animal;
	referrer: string;
}

const AnimalPage: NextPage<AnimalPageProps> = ({ animal, referrer }) => {
	const router = useRouter();

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

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/animals/${animalId}`
		);
		const animal = await response.json();
		return {
			props: {
				animal,
				referrer,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			redirect: {
				permanent: false,
				destination: "/adopt",
			},
			props: {},
		};
	}
};

export default AnimalPage;
