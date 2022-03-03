import { Paper } from "@mui/material";
import { useState } from "react";
import styles from "./AddressForm.module.scss";
import Billing from "./Billing";
import Donation from "./Donation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Checkout from "../stripe/Checkout";
import { Product } from "../../src/types/Product";
import CustomButton from "../ui/CustomButton";
import InMemoryOf from "./InMemoryOf";
import { BillingInfo } from "../../src/types/BillingInfo";

const PaymentForm = () => {
	const [donationAmount, setDonationAmount] = useState(0);
	const [formData, setFormData] = useState<BillingInfo>({
		firstName: "",
		lastName: "",
		streetAddress: "",
		aptOrSuite: "",
		city: "",
		state: "",
		zip: "",
		inMemory: "",
		email: "",
		receiveUpdates: false,
	});
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCheckoutOpen(true);
	};

	const confirmParams = {
		return_url: "http://www.palsofpawssociety.org/donate/thankyou",
		receipt_email: formData.email,
	};

	return (
		<>
			<Paper elevation={3} className={styles.form}>
				<form action="" className={styles.formGroup} onSubmit={handleSubmit}>
					<Donation setDonationAmount={setDonationAmount} />
					<InMemoryOf formData={formData} setFormData={setFormData} />
					<Billing formData={formData} setFormData={setFormData} />
					<CustomButton
						endIcon={<ArrowForwardIcon />}
						className={styles.btn}
						type="submit"
					>
						Continue
					</CustomButton>
				</form>
			</Paper>
			<Checkout
				open={checkoutOpen}
				setOpen={setCheckoutOpen}
				products={
					[
						{ name: "Donation", quantity: 1, priceTotal: donationAmount },
					] as Product[]
				}
				confirmParams={confirmParams}
				metadata={formData}
			/>
		</>
	);
};

export default PaymentForm;
