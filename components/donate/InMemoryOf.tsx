import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { BillingInfo } from "../../src/types/BillingInfo";

type MemoryProps = {
	formData: BillingInfo;
	setFormData: React.Dispatch<React.SetStateAction<BillingInfo>>;
};

const InMemoryOf = ({ formData, setFormData }: MemoryProps) => {
	const [fieldVisible, setFieldVisible] = useState(false);

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
		<div>
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
					margin: "1em 0",
					transformOrigin: "top",
					transition: "all 150ms",
					transform: fieldVisible ? "scaleY(100%)" : "scaleY(0%)",
					width: "100%",
					height: fieldVisible ? "3.5rem" : "0",
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
			</div>
		</div>
	);
};
export default InMemoryOf;
