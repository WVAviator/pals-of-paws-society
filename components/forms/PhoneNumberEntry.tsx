import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { BillingInfo } from "../../src/types/BillingInfo";

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
			{/* @ts-ignore */}
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
