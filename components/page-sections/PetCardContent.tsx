import styles from "./PetCardContent.module.scss";
import PetCard from "../../components/content/PetCard";
import { CircularProgress, Pagination } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import { useEffect, useState } from "react";
import AnimalFilter, { AnimalFilter as Filter } from "../forms/AnimalFilter";

interface PetCardContentProps {
	animals: Animal[];
	page: number;
	setPage: (page: number) => void;
	routeToAnimal: (animal: Animal) => void;
	filter: Filter;
	setFilter: (filter: Filter) => void;
	loading: boolean;
}

const pageOffset = 24;

const PetCardContent = ({
	animals,
	filter,
	setFilter,
	page,
	setPage,
	routeToAnimal,
	loading,
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
			<div className={styles.pagination}>
				{!loading ? (
					<Pagination
						count={pageCount}
						color="primary"
						page={page}
						onChange={handlePageChange}
						size="medium"
					/>
				) : (
					<div className={styles.pageLoad}>
						<CircularProgress />
					</div>
				)}
				<AnimalFilter
					filter={filter}
					setFilter={(filter) => {
						setFilter(filter);
						setPage(1);
					}}
				/>
			</div>
		</>
	);

	return (
		<section className={styles.section} aria-label="Adoptable Pets">
			<div className={styles.header}>
				<h1>Adopt your new best friend today</h1>
				<p>
					As of December 2025, due to changes in Petfinder&apos;s policy, we can
					no longer show adoptable animals from other rescues.
				</p>
			</div>
			{pagination}
			<div className={styles.contents}>
				{!loading ? mappedAnimals : "No animals found."}
			</div>
			{mappedAnimals.length > 0 && pagination}
		</section>
	);
};

export default PetCardContent;
