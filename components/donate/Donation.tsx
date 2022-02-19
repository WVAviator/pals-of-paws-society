import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./AddressForm.module.scss";

type DonationProps = {
	setDonationAmount: React.Dispatch<React.SetStateAction<number>>;
};

const Donation = ({ setDonationAmount }: DonationProps) => {
	const [buttonSelection, setButtonSelection] = useState("5");
	const [otherAmount, setOtherAmount] = useState("");

	const handleDonationSelection = (event: any, newSelection: string) => {
		if (newSelection === null) return;
		setButtonSelection(newSelection);
	};

	const handleOtherAmountEntry = (event: any) => {
		const { value } = event.target;

		if (/\D/.test(value)) return;

		setOtherAmount(value);
	};

	const usingOtherAmount = buttonSelection === "Other";

	useEffect(() => {
		setDonationAmount(
			parseInt(usingOtherAmount ? otherAmount : buttonSelection)
		);
	}, [buttonSelection, otherAmount]);

	return (
		<>
			<h2>Donation Amount</h2>
			<ToggleButtonGroup
				value={buttonSelection}
				exclusive
				onChange={handleDonationSelection}
				aria-label="Donation amount selection"
				size="large"
				className={styles.buttonGroup}
			>
				<ToggleButton value={"5"}>$5</ToggleButton>
				<ToggleButton value={"10"}>$10</ToggleButton>
				<ToggleButton value={"20"}>$20</ToggleButton>
				<ToggleButton value={"50"}>$50</ToggleButton>
				<ToggleButton value={"Other"}>Other</ToggleButton>
			</ToggleButtonGroup>
			<FormControl
				fullWidth
				sx={{
					margin: "1em 0",
					transformOrigin: "top",
					transition: "all 150ms",
					transform: usingOtherAmount ? "scaleY(100%)" : "scaleY(0%)",
				}}
			>
				<InputLabel htmlFor="outlined-adornment-amount">
					Other Amount
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-amount"
					value={otherAmount}
					onChange={handleOtherAmountEntry}
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
					label="Other Amount"
					disabled={!usingOtherAmount}
					required={usingOtherAmount}
				/>
			</FormControl>
		</>
	);
};

export default Donation;
