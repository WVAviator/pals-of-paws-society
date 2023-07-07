import { TextField } from "@mui/material";
import React from "react";
import StateAutocomplete from "./StateAutocomplete";
import styles from "./AddressForm.module.scss";
import { Address } from "../../src/types/Address";

interface AddressFormProps {
	value: Address;
	onChange: (address: Address) => void;
	required: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
	value,
	onChange,
	required = false,
}) => {
	const [address, setAddress] = React.useState<Address>(value);

	const handleChange =
		(prop: keyof Address) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setAddress({ ...address, [prop]: event.target.value });
		};

	return (
		<div className={styles.address}>
			<TextField
				id="first-name"
				label="First Name"
				required={required}
				sx={{ gridColumn: "span 2" }}
				variant="outlined"
				value={address.firstName}
				onChange={handleChange("firstName")}
			/>
			<TextField
				id="last-name"
				label="Last Name"
				required={required}
				sx={{ gridColumn: "span 2" }}
				variant="outlined"
				value={address.lastName}
				onChange={handleChange("lastName")}
			/>
			<TextField
				id="street-address"
				label="Address"
				required={required}
				sx={{ gridColumn: "span 4", marginTop: "1em" }}
				variant="outlined"
				value={address.streetAddress}
				onChange={handleChange("streetAddress")}
			/>
			<TextField
				id="apt-suite"
				label="Apt/Suite/Bldg"
				sx={{ gridColumn: "span 2" }}
				variant="outlined"
				value={address.aptOrSuite}
				onChange={handleChange("aptOrSuite")}
			/>
			<TextField
				id="city"
				label="City"
				required={required}
				sx={{ gridColumn: "span 2" }}
				variant="outlined"
				value={address.city}
				onChange={handleChange("city")}
			/>
			<StateAutocomplete
				value={address.state}
				onChange={(newValue) => setAddress({ ...address, state: newValue })}
				required={required}
			/>
			<TextField
				id="zip-code"
				label="Zip Code"
				required={required}
				sx={{ gridColumn: "span 2" }}
				variant="outlined"
				value={address.zip}
				onChange={handleChange("zip")}
			/>
		</div>
	);
};

export default AddressForm;
