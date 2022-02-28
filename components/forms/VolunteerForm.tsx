import {
	Autocomplete,
	CircularProgress,
	Paper,
	TextField,
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import { ContactInformation } from "../../src/types/ContactInformation";
import { useState } from "react";
import axios from "axios";
import styles from "./VolunteerForm.module.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

const volunteerOptions = [
	"Helping with fundraisers",
	"Providing short-range transports",
	"Fostering pets",
	"Helping with veterinary care",
	"Other (explain in comments)",
];

const VolunteerForm = () => {
	const [formData, setFormData] = useState<ContactInformation>({
		volunteer: [],
		name: "",
		email: "",
		phone: "",
		comments: "",
	});
	const [isSending, setIsSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [sendError, setSendError] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsSending(true);
		try {
			const response = await axios.post("/api/contact/volunteer-inquiry", {
				formData,
			});
		} catch {
			setSendError(true);
		}

		setIsSending(false);
		setSent(true);
	};

	const handleChange =
		(prop: keyof ContactInformation) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, [prop]: event.target.value });
		};
	const handleMultiple = (event: any, data: any) => {
		setFormData({ ...formData, volunteer: data });
	};

	const successMessage = (
		<div className={styles.upperCenter}>
			<DoneIcon color="primary" aria-label="Message Sent" fontSize="large" />
			<p>Your information has been sent! We will be in touch!</p>
			<p>
				<Link href="/">Return Home</Link>
			</p>
		</div>
	);

	const failedMessage = (
		<div className={styles.upperCenter}>
			<ErrorOutlineIcon
				color="primary"
				aria-label="Message Failed"
				fontSize="large"
			/>
			<p>
				Something went wrong! We apologize for the inconvenience. You can still
				reach out to us at support@palsofpawssociety.org.
			</p>
		</div>
	);

	const message = sendError ? failedMessage : successMessage;

	return (
		<Paper className={styles.card} elevation={3}>
			{isSending ? (
				<div className={styles.upperCenter}>
					<CircularProgress />
				</div>
			) : (
				<>
					{sent ? (
						message
					) : (
						<form onSubmit={handleSubmit} className={styles.formWrapper}>
							<h3>Volunteer Form</h3>
							<div className={styles.form}>
								<div className={styles.volunteer}>
									<p>
										Select all the activites you are interested in helping us
										with:
									</p>
									<Autocomplete
										options={volunteerOptions}
										multiple
										value={formData.volunteer}
										disableCloseOnSelect
										onChange={handleMultiple}
										renderInput={(params) => (
											<TextField
												{...params}
												required={formData.volunteer.length === 0}
												label="Volunteer Activities"
											/>
										)}
									/>
								</div>
								<p>Contact Information</p>
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

								<div className={styles.button}>
									<CustomButton type="submit" endIcon={<SendIcon />}>
										Send
									</CustomButton>
								</div>
							</div>
						</form>
					)}
				</>
			)}
		</Paper>
	);
};

export default VolunteerForm;
