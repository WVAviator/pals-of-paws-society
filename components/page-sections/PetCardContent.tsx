import styles from "./PetCardContent.module.scss";
import PetCard from "../../components/content/PetCard";
import { CircularProgress, Pagination } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import { useEffect, useState } from "react";
import AdoptMeta from "../meta/AdoptMeta";

interface PetCardContentProps {
	animals: Animal[];
	page: number;
	setPage: (page: number) => void;
	routeToAnimal: (animal: Animal) => void;
}

const pageOffset = 24;

const PetCardContent = ({
	animals,
	page,
	setPage,
	routeToAnimal,
}: PetCardContentProps) => {
	const [pageCount, setPageCount] = useState(1);

	useEffect(() => {
		if (!animals) return;
		setPageCount(Math.ceil(animals.length / pageOffset));
	}, [animals]);

	const mappedAnimals = animals
		.slice(pageOffset * (page - 1), pageOffset * page)
		.map((animal, index) => {
			return (
				<div key={animal.id}>
					<PetCard
						animal={animal}
						isPriority={index < 8}
						routeToAnimal={routeToAnimal}
					/>
				</div>
			);
		});

	const handlePageChange = (event: any, value: number) => {
		setPage(value);
		// window.scrollTo(0, 0);
	};

	const pagination = (
		<>
			<AdoptMeta />
			<div className={styles.pagination}>
				{pageCount > 1 ? (
					<Pagination
						count={pageCount}
						color="primary"
						page={page}
						onChange={handlePageChange}
						size="large"
					/>
				) : (
					<div className={styles.pageLoad}>
						<CircularProgress />
					</div>
				)}
			</div>
		</>
	);

	return (
		<section className={styles.section} aria-label="Adoptable Pets">
			<div className={styles.header}>
				<h1>Adopt your new best friend today</h1>
				<p>
					The animals available for adoption here are either directly
					managed by Pals of Paws Society, or are listed publicly on
					Petfinder by other organizations in Northwest Mississippi.
				</p>
			</div>
			{pagination}
			<div className={styles.contents}>{mappedAnimals}</div>
			{pagination}
		</section>
	);
};

export default PetCardContent;
