import { Button, Paper } from "@mui/material";
import { Animal } from "../../src/types/Animal";
import CustomButton from "../ui/CustomButton";
import styles from "./AdoptionApplication.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
	animal: Animal;
}

const AdoptionApplication = ({ animal }: Props) => {
	return (
		<Paper elevation={3} className={styles.card}>
			<p>
				Take the next steps with {animal.name} and apply for adoption
				today!
			</p>
			<CustomButton
				className={styles.button}
				endIcon={<ArrowForwardIcon />}
				href="https://www.shelterluv.com/matchme/adopt/POPS/Cat"
			>
				Apply for Adoption
			</CustomButton>
		</Paper>
	);
};
export default AdoptionApplication;
