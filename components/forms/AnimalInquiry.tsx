import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import { Animal } from "../../src/types/Animal";
import CustomButton from "../ui/CustomButton";
import styles from "./AnimalInquiry.module.scss";

interface FormData {
	name: string;
	email: string;
	phone: string;
	comments: string;
}

interface AnimalInquiryProps {
	animal: Animal;
}

const AnimalInquiry = ({ animal }: AnimalInquiryProps) => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		comments: "",
	});

	const handleChange =
		(prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};

	return (
		<Paper elevation={3} className={styles.card}>
			<p>
				Let {animal.organization.name} know that you're interested in{" "}
				<span style={{ textTransform: "capitalize" }}>{animal.name}</span>.
			</p>
			<form action="" className={styles.form}>
				<TextField
					variant="outlined"
					label="Name"
					value={formData.name}
					onChange={handleChange("name")}
				/>
				<TextField
					variant="outlined"
					label="Email Address"
					type="email"
					value={formData.email}
					onChange={handleChange("email")}
				/>
				<TextField
					variant="outlined"
					label="Phone Number"
					value={formData.phone}
					onChange={handleChange("phone")}
				/>
				<TextField
					variant="outlined"
					label="Comments"
					multiline
					value={formData.comments}
					onChange={handleChange("comments")}
					rows={3}
				/>
				<CustomButton type="submit">Send</CustomButton>
			</form>
		</Paper>
	);
};

export default AnimalInquiry;
