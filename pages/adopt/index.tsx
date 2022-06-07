import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PetCardContent from "../../components/page-sections/PetCardContent";
import PetDisplay from "../../components/page-sections/PetDisplay";
import { getAllAnimals } from "../../src/api/GetAnimals";
import { Animal } from "../../src/types/Animal";
interface AdoptProps {
	animals: Animal[];
}

const Adopt = ({ animals }: AdoptProps) => {
	const router = useRouter();
	const selectedAnimal = useRef<Animal>(
		animals.find((a) => a.id === router.query.animal) || null
	);
	const page = Number(router.query.page) || 1;

	const routeToAnimal = (animal: Animal) => {
		router.push(`/adopt?animal=${animal.id}`, null, { shallow: true });
	};

	const updatePage = (newPage: number) => {
		router.push(`/adopt?page=${newPage}`, null, { shallow: true });
	};

	const routeBack = () => {
		router.back();
	};

	return (
		<div>
			{selectedAnimal.current ? (
				<>
					<PetDisplay
						animal={selectedAnimal.current}
						routeBack={routeBack}
					/>
				</>
			) : (
				<>
					<PetCardContent
						animals={animals}
						page={page}
						setPage={updatePage}
						routeToAnimal={routeToAnimal}
					/>
				</>
			)}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	console.log("Retrieving static props...", new Date());
	const url = {
		production: "https://www.palsofpawssociety.org",
		development: "http://localhost:3000",
		test: "https://pals-of-paws-society-git-main-wvaviator.vercel.app",
	}[process.env.NODE_ENV];
	const response = await axios.get(url + "/api/animals");
	return {
		props: {
			animals: response.data,
		},
		revalidate: 600,
	};
};

export default Adopt;
