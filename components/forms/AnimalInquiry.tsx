import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./AnimalInquiry.module.scss";

interface FormData {
	name: string;
	email: string;
	phone: string;
	comments: string;
}

const AnimalInquiry = () => {
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
		<Paper elevation={3}>
			<form action="">
				<TextField
					variant="outlined"
					label="Name"
					value={formData.name}
					onChange={handleChange("name")}
				/>
				<TextField
					variant="outlined"
					label="Email"
					type="email"
					value={formData.email}
					onChange={handleChange("email")}
				/>
				<TextField
					variant="outlined"
					label="Phone"
					value={formData.phone}
					onChange={handleChange("phone")}
				/>
				<TextField
					variant="outlined"
					label="Comments"
					multiline
					value={formData.comments}
					onChange={handleChange("comments")}
				/>
			</form>
		</Paper>
	);
};

export default AnimalInquiry;
