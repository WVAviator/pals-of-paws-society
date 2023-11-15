import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../ui/CustomButton";
import styles from "./CallToAction.module.scss";

interface CallToActionProps {
	action: string;
	message: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ action, message }) => {
	return (
		<div className={styles.headingContainer}>
			<h1>{message}</h1>

			<CustomButton
				endIcon={<ArrowForwardIcon />}
				className={styles.btn}
				href="/about"
			>
				{action}
			</CustomButton>
		</div>
	);
};

export default CallToAction;
