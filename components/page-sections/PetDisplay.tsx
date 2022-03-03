import { ArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Animal } from "../../src/types/Animal";
import PetCarousel from "../content/PetCarousel";
import PetContent from "../layout/PetContent";
import PawprintSection from "./PawprintSection";

interface PetDisplayProps {
	animal: Animal;
	setSelectedAnimal: any;
}

const PetDisplay = ({ animal, setSelectedAnimal }: PetDisplayProps) => {
	const backStyle = {
		backgroundColor: "#0f172a",
		color: "white",
		display: "flex",
		alignItems: "center",
		padding: "0.5em",
		cursor: "pointer",
	};

	const router = useRouter();

	return (
		<>
			<div
				style={backStyle}
				onClick={() => router.push(`/adopt`, undefined, { shallow: true })}
			>
				<ArrowLeft htmlColor="white" />
				Back to Results
			</div>
			<PetCarousel animal={animal} />
			<PawprintSection pawprintRotation={170} sectionTitle={animal.name}>
				<PetContent animal={animal} />
			</PawprintSection>
		</>
	);
};
export default PetDisplay;
