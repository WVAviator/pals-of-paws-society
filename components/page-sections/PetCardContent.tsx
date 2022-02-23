import styles from "./PetCardContent.module.scss";
import PetCard from "../../components/content/PetCard";
import { CircularProgress, Pagination } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import { useEffect, useState } from "react";

interface PetCardContentProps {
	animals: Animal[];
	loadingAll: boolean;
}

const pageOffset = 25;

const PetCardContent = ({ animals, loadingAll }: PetCardContentProps) => {
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (!animals) return;
		setPageCount(Math.ceil(animals.length / pageOffset));
	}, [animals]);

	const mappedAnimals = animals ? (
		animals
			.slice(pageOffset * (currentPage - 1), pageOffset * currentPage)
			.map((animal) => {
				return (
					<div key={animal.id}>
						<PetCard animal={animal} />
					</div>
				);
			})
	) : (
		<CircularProgress />
	);

	const handlePageChange = (event: any, value: number) => {
		setCurrentPage(value);
		window.scrollTo(0, 0);
	};

	const pagination = animals ? (
		<div className={styles.pagination}>
			{loadingAll ? (
				<div className={styles.pageLoad}>
					<CircularProgress />
				</div>
			) : (
				<Pagination
					count={pageCount}
					color="primary"
					page={currentPage}
					onChange={handlePageChange}
					size="large"
				/>
			)}
		</div>
	) : null;

	return (
		<section className={styles.section} aria-label="Adoptable Pets">
			<div className={styles.header}>
				<h1>Adopt your new best friend today</h1>
				<p>
					The animals available for adoption here are either directly managed by
					Pals of Paws Society, or are listed publicly on Petfinder by other
					organizations in Northwest Mississippi.
				</p>
			</div>
			{pagination}
			<div className={styles.contents}>{mappedAnimals}</div>
			{pagination}
		</section>
	);
};

export default PetCardContent;
