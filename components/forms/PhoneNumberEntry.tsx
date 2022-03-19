import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import React from "react";
import { BillingInfo } from "../../src/types/BillingInfo";
import InputMask from "react-input-mask";

interface PhoneNumberEntryProps {
	formData: BillingInfo;
	setFormData: (formData: BillingInfo) => void;
}

const PhoneNumberEntry = ({ formData, setFormData }: PhoneNumberEntryProps) => {
	const handleChange = (event: { target: { name: string; value: string } }) => {
		setFormData({
			...formData,
			phone: event.target.value,
		});
	};

	return (
		<InputMask
			mask="(999) 999 9999"
			value={formData.phone}
			onChange={handleChange}
			alwaysShowMask={false}
		>
			{() => (
				<TextField
					id="phone"
					label="Phone Number"
					required
					inputProps={{ type: "text" }}
					variant="outlined"
				/>
			)}
		</InputMask>
	);
};
export default PhoneNumberEntry;
