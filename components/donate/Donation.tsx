import {
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
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
	const [otherAmount, setOtherAmount] = useState("1");
	const [otherAmountError, setOtherAmountError] = useState(false);

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
		const amount = parseInt(otherAmount);
		setOtherAmountError(usingOtherAmount && (!amount || amount < 1));
		setDonationAmount(
			parseInt(usingOtherAmount ? otherAmount : buttonSelection)
		);
	}, [buttonSelection, otherAmount, usingOtherAmount, setDonationAmount]);

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
			<div
				style={{
					margin: "1em 0",
					transformOrigin: "top",
					transition: "all 150ms",
					transform: usingOtherAmount ? "scaleY(100%)" : "scaleY(0%)",
					width: "100%",
					height: usingOtherAmount ? "3.5rem" : "0",
				}}
			>
				<TextField
					id="outlined-adornment-amount"
					fullWidth
					aria-describedby="other-amount-helper"
					helperText="Enter desired donation amount"
					value={otherAmount}
					error={otherAmountError}
					onChange={handleOtherAmountEntry}
					label="Other Amount"
					disabled={!usingOtherAmount}
					required={usingOtherAmount}
					inputProps={{
						inputMode: "numeric",
						pattern: "[0-9]*",
						type: "number",
						min: 1,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				></TextField>
			</div>
		</>
	);
};

export default Donation;
