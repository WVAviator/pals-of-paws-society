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
	);
};

export default Adopt;
