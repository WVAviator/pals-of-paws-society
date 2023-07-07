import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { BillingInfo } from "../../src/types/BillingInfo";
import AddressForm, { Address } from "./AddressForm";
import styles from "./AddressForm.module.scss";

type MemoryProps = {
	formData: BillingInfo;
	setFormData: React.Dispatch<React.SetStateAction<BillingInfo>>;
};

const InMemoryOf = ({ formData, setFormData }: MemoryProps) => {
	const [fieldVisible, setFieldVisible] = useState(false);
	const [addressVisible, setAddressVisible] = useState(false);
	const [address, setAddress] = useState<Address>({
		firstName: "",
		lastName: "",
		streetAddress: "",
		aptOrSuite: "",
		city: "",
		state: "",
		zip: "",
	});

	const handleChange =
		(prop: keyof BillingInfo) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};

	const handleChecked = (event: any) => {
		setFieldVisible(event.target.checked);
		if (!fieldVisible) setFormData({ ...formData, inMemory: "" });
	};

	return (
		<div className={styles.inmemory}>
			<FormControlLabel
				control={
					<Checkbox
						checked={fieldVisible}
						onChange={(event) => {
							setFieldVisible(event.target.checked);
						}}
					/>
				}
				label="This donation is in memory of someone."
				sx={{ gridColumn: "span 4" }}
			/>
			<div
				style={{
					// margin: "1em 0",
					transformOrigin: "top",
					transition: "all 150ms",
					transform: fieldVisible ? "scaleY(100%)" : "scaleY(0%)",
					width: "100%",
					height: fieldVisible ? "auto" : "0",
				}}
			>
				<TextField
					id="in-memory"
					label="In Memory Of"
					sx={{ width: "100%" }}
					variant="outlined"
					value={formData.inMemory}
					onChange={handleChange("inMemory")}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={addressVisible}
							onChange={(event) => {
								setAddressVisible(event.target.checked);
							}}
						/>
					}
					label="Send Acknowledgment?"
					sx={{ gridColumn: "span 4", marginTop: "1em" }}
				/>
				<div
					style={{
						// margin: "1em 0",
						transformOrigin: "top",
						transition: "all 150ms",
						transform: addressVisible ? "scaleY(100%)" : "scaleY(0%)",
						width: "100%",
						height: addressVisible ? "auto" : "0",
					}}
				>
					<AddressForm
						value={address}
						onChange={(address) => setAddress(address)}
						required={addressVisible}
					/>
				</div>
			</div>
		</div>
	);
};
export default InMemoryOf;
