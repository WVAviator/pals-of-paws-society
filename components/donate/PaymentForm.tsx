import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./AddressForm.module.scss";
import Billing from "./Billing";
import Donation from "./Donation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Checkout from "../stripe/Checkout";
import { Product } from "../../src/types/Product";
import CustomButton from "../ui/CustomButton";
import InMemoryOf from "./InMemoryOf";
import { BillingInfo } from "../../src/types/BillingInfo";

let return_url: string;

const PaymentForm = () => {
	const [donationAmount, setDonationAmount] = useState(0);
	const [formData, setFormData] = useState<BillingInfo>({
		billingAddress: {
			firstName: "",
			lastName: "",
			streetAddress: "",
			aptOrSuite: "",
			city: "",
			state: "",
			zip: "",
		},
		inMemory: "",
		inMemoryAddress: {
			firstName: "",
			lastName: "",
			streetAddress: "",
			aptOrSuite: "",
			city: "",
			state: "",
			zip: "",
		},
		email: "",
		receiveUpdates: false,
	});
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCheckoutOpen(true);
	};

	useEffect(() => {
		return_url = window.location.href + "/thankyou";
	}, []);

	const confirmParams = {
		return_url,
		receipt_email: formData.email,
	};

	const products: Product[] = [
		{ name: "Donation", quantity: 1, priceTotal: donationAmount },
	];

	const productsString = JSON.stringify(products);
	const metadata = { ...formData, products: productsString };

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
				products={products}
				confirmParams={confirmParams}
				metadata={metadata}
			/>
		</>
	);
};

export default PaymentForm;
