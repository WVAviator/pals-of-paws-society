import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	TextField,
} from "@mui/material";
import { BillingInfo } from "./PaymentForm";
import styles from "./AddressForm.module.scss";

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
				<Autocomplete
					disablePortal
					sx={{ gridColumn: "span 2" }}
					value={formData.state}
					autoSelect
					autoHighlight
					autoComplete
					options={states}
					renderInput={(params) => (
						<TextField
							{...params}
							id="state"
							label="State"
							variant="outlined"
							required
							onChange={handleChange("state")}
						/>
					)}
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

const states = [
	"",
	"AL",
	"AK",
	"AS",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FM",
	"FL",
	"GA",
	"GU",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MH",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"MP",
	"OH",
	"OK",
	"OR",
	"PW",
	"PA",
	"PR",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VI",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];
