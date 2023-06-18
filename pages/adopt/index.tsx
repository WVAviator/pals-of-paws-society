import { NextSeo } from "next-seo";
import Fallback from "../../components/layout/Fallback";
import PetCardContent from "../../components/page-sections/PetCardContent";
import useAdoptionBrowsingContext from "../../context/useAdoptionBrowsingContext";
import useScrollMemory from "../../hooks/useScrollMemory";

const Adopt = () => {
	const {
		loading,
		filteredAnimals,
		currentPage,
		changePage,
		goToAnimal,
		filter,
		setFilter,
	} = useAdoptionBrowsingContext();

	useScrollMemory();

	if (loading) {
		return <Fallback />;
	}

	return (
		<>
			<NextSeo
				title="Adoptions - Pals of Paws Society"
				description="These homeless pets are available for adoption from us and from other animal shelters and rescue organizations in Northwest Mississippi."
				canonical="https://www.palsofpawssociety.org/adopt"
				openGraph={{
					url: "https://www.palsofpawssociety.org/adopt",
					title: "Adoptions - Pals of Paws Society",
					description:
						"These homeless pets are available for adoption from us and from other animal shelters and rescue organizations in Northwest Mississippi.",
					images: [
						{
							url: "https://www.palsofpawssociety.org/images/og/pop-og.png",
							width: 800,
							height: 600,
							alt: "Adoptions - Pals of Paws Society",
						},
					],
				}}
			/>
			<div>
				<PetCardContent
					animals={filteredAnimals}
					page={currentPage}
					setPage={changePage}
					routeToAnimal={goToAnimal}
					filter={filter}
					setFilter={setFilter}
					loading={loading}
				/>
			</div>
		</>
	);
};

export default Adopt;
