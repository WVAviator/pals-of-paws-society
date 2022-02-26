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
	const [sent, setSent] = useState(false);
	const [sendError, setSendError] = useState(false);

	const handleChange =
		(prop: keyof ContactInformation) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsSending(true);
		const response = await axios.post("/api/contact/animal-inquiry", {
			formData,
			animal,
		});

		setSendError(response.status !== 200);

		setIsSending(false);
		setSent(true);
	};

	const contactNote = (
		leadingMessage = "We suggest you reach out to them via"
	) => (
		<p>
			{leadingMessage}{" "}
			{animal.organization.website && (
				<a href={animal.organization.website}>their official website, </a>
			)}
			{animal.organization.social_media?.facebook && (
				<a href={animal.organization.social_media.facebook}>
					their Facebook page,{" "}
				</a>
			)}
			their{" "}
			<a href={animal.organization._links?.self?.href}>Petfinder profile</a>, or
			contact them via email at {animal.organization.email}.
		</p>
	);

	const successMessage = (
		<>
			{animal.organization.id === "1" ? (
				<div className={styles.sent}>
					<p>
						Thank you for letting us know! One of our volunteers will be in
						contact with you soon.
					</p>
				</div>
			) : (
				<div className={styles.sent}>
					<p>We've forwarded your message to {animal.organization.name}!</p>
					{contactNote("You may also want to check out")}
				</div>
			)}
		</>
	);

	const failMessage = (
		<div>
			<p>
				An unexpected error occurred. We were not able to send your message to{" "}
				{animal.organization.name}.
			</p>
			{contactNote()}
		</div>
	);

	return (
		<Paper elevation={3} className={styles.card}>
			{sent ? (
				<>{sendError ? failMessage : successMessage}</>
			) : (
				<>
					{isSending ? (
						<div className={styles.loading}>
							<CircularProgress />
						</div>
					) : (
						<div>
							<p>
								Let {animal.organization.name} know that you're interested in{" "}
								{animal.name}.
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
				</>
			)}
		</Paper>
	);
};

export default AnimalInquiry;
