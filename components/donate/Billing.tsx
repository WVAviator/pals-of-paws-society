import {
	Autocomplete,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { BillingInfo } from "../../src/types/BillingInfo";
import styles from "./AddressForm.module.scss";
import StateAutocomplete from "./StateAutocomplete";
import AddressForm from "./AddressForm";

type BillingProps = {
	formData: BillingInfo;
	setFormData: React.Dispatch<React.SetStateAction<BillingInfo>>;
};

const Billing = ({ formData, setFormData }: BillingProps) => {
	const handleChange =
		(prop: keyof BillingInfo) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};

	return (
		<div>
			<h2>Billing Information</h2>
			<div className={styles.address}>
				<AddressForm
					value={formData.billingAddress}
					onChange={(address) => {
						setFormData({ ...formData, billingAddress: address });
					}}
					required
				/>
				<TextField
					id="email"
					label="Email Address"
					required
					inputProps={{ type: "email" }}
					sx={{ gridColumn: "span 4", marginTop: "1em" }}
					variant="outlined"
					value={formData.email}
					onChange={handleChange("email")}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={formData.receiveUpdates}
							onChange={(event) => {
								setFormData({
									...formData,
									receiveUpdates: event.target.checked,
								});
							}}
						/>
					}
					label="Receive email news and updates from Pals of Paws Society"
					sx={{ gridColumn: "span 4" }}
				/>
			</div>
		</div>
	);
};

export default Billing;
