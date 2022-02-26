import { CircularProgress, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Animal } from "../../src/types/Animal";
import { ContactInformation } from "../../src/types/ContactInformation";
import CustomButton from "../ui/CustomButton";
import styles from "./AnimalInquiry.module.scss";
import SendIcon from "@mui/icons-material/Send";

interface AnimalInquiryProps {
	animal: Animal;
}

const AnimalInquiry = ({ animal }: AnimalInquiryProps) => {
	const [formData, setFormData] = useState<ContactInformation>({
		name: "",
		email: "",
		phone: "",
		comments: "",
	});
	const [isSending, setIsSending] = useState(false);

	const handleChange =
		(prop: keyof ContactInformation) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsSending(true);
		await axios.post("/api/contact/animal-inquiry", {
			formData,
			animal,
		});

		setIsSending(false);
	};

	return (
		<Paper elevation={3} className={styles.card}>
			{isSending ? (
				<CircularProgress />
			) : (
				<div>
					<p>
						Let {animal.organization.name} know that you're interested in{" "}
						<span style={{ textTransform: "capitalize" }}>{animal.name}</span>.
					</p>
					<form onSubmit={handleSubmit} className={styles.form}>
						<TextField
							variant="outlined"
							label="Name"
							required
							value={formData.name}
							onChange={handleChange("name")}
						/>
						<TextField
							variant="outlined"
							label="Email Address"
							type="email"
							required
							value={formData.email}
							onChange={handleChange("email")}
						/>
						<TextField
							variant="outlined"
							label="Phone Number"
							required
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
						<CustomButton type="submit" endIcon={<SendIcon />}>
							Send
						</CustomButton>
					</form>
				</div>
			)}
		</Paper>
	);
};

export default AnimalInquiry;
