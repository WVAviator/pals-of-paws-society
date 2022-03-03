import Head from "next/head";
import { Animal } from "../../src/types/Animal";

const AnimalMeta = ({ animal }: { animal: Animal }) => {
	return (
		<div>
			<Head>
				<title>
					{animal.name} - {animal.organization.name}
				</title>
				<meta
					name="description"
					content={`${animal.name} is a ${animal.sex} ${
						animal.breed
					} available for adoption from ${animal.organization.name} in ${
						animal.location
					}. Through our website at Pals of Paws Society, you can send a message to ${
						animal.organization.name
					} about ${animal.name}, or navigate to ${
						animal.sex === "male" ? "his" : "her"
					} Petfinder profile to learn more.`}
				/>
				<meta
					name="keywords"
					content="pet adoption, animal shelter, animal rescue"
				/>

				<meta
					property="og:title"
					key="ogTitle"
					content="Adoptions - Pals of Paws Society"
				/>
				<meta
					property="og:url"
					key="ogUrl"
					content={`https://www.palsofpawssociety.org/adopt?animal=${animal.id}`}
				/>
				<meta property="og:image" key="ogImage" content={animal.photos[0]} />
				<meta
					property="og:description"
					key="ogDescription"
					content={`${animal.name} is a ${animal.sex} ${
						animal.breed
					} available for adoption from ${animal.organization.name} in ${
						animal.location
					}. Through our website at Pals of Paws Society, you can send a message to ${
						animal.organization.name
					} about ${animal.name}, or navigate to ${
						animal.sex === "male" ? "his" : "her"
					} Petfinder profile to learn more.`}
				/>
			</Head>
		</div>
	);
};

export default AnimalMeta;
