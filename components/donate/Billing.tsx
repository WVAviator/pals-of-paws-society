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
				<TextField
					id="first-name"
					label="First Name"
					required
					sx={{ gridColumn: "span 2" }}
					variant="outlined"
					value={formData.firstName}
					onChange={handleChange("firstName")}
				/>
				<TextField
					id="last-name"
					label="Last Name"
					required
					sx={{ gridColumn: "span 2" }}
					variant="outlined"
					value={formData.lastName}
					onChange={handleChange("lastName")}
				/>

				<TextField
					id="street-address"
					label="Address"
					required
					sx={{ gridColumn: "span 4", marginTop: "1em" }}
					variant="outlined"
					value={formData.streetAddress}
					onChange={handleChange("streetAddress")}
				/>
				<TextField
					id="apt-suite"
					label="Apt/Suite/Bldg"
					sx={{ gridColumn: "span 2" }}
					variant="outlined"
					value={formData.aptOrSuite}
					onChange={handleChange("aptOrSuite")}
				/>
				<TextField
					id="city"
					label="City"
					required
					sx={{ gridColumn: "span 2" }}
					variant="outlined"
					value={formData.city}
					onChange={handleChange("city")}
				/>
				<StateAutocomplete
					value={formData.state}
					onChange={(newValue) => setFormData({ ...formData, state: newValue })}
				/>
				<TextField
					id="zip-code"
					label="Zip Code"
					required
					sx={{ gridColumn: "span 2" }}
					variant="outlined"
					value={formData.zip}
					onChange={handleChange("zip")}
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
