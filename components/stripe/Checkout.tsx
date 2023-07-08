import {
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import {
	Appearance,
	ConfirmPaymentData,
	StripeElementsOptions,
	loadStripe,
} from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { BillingInfo } from "../../src/types/BillingInfo";
import { Product } from "../../src/types/Product";
import CustomButton from "../ui/CustomButton";
import styles from "./Checkout.module.scss";
import CheckoutForm from "./CheckoutForm";

type CheckoutProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	products: Product[];
	confirmParams: ConfirmPaymentData;
	metadata: BillingInfo & { products: string };
	description?: string;
	alternateLink?: string;
};

const getTotal = (products: Product[]): number => {
	let total = 0;
	products.forEach((product) => {
		total += product.priceTotal;
	});
	return total;
};

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = ({
	open,
	setOpen,
	products,
	confirmParams,
	description = "Donation",
	metadata,
	alternateLink = "https://buy.stripe.com/bIYg0Fgnje6g6MUdR0",
}: CheckoutProps) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const total = getTotal(products);

	const [clientSecret, setClientSecret] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleCancelled = () => {
		setClientSecret("");
		setError(null);
		setOpen(false);
	};

	useEffect(() => {
		if (!open) return;

		const getClientSecret = async () => {
			try {
				console.log("Fetching client authorization");
				const token = await executeRecaptcha("checkout");

				console.log("Fetching client secret");

				console.log("Preparing metadata: ", metadata);
				const response = await fetch("/api/payment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						products,
						description,
						metadata,
						token,
					}),
				});
				const responseData = await response.json();

				if (responseData.error) {
					console.error("Error: ", responseData.error);
					setError(responseData.error);
					return;
				}

				setClientSecret(responseData.clientSecret);
			} catch (error) {
				console.error("Error:", error);
				setError(error.message);
			}
		};

		getClientSecret();
	}, [open, products, description, metadata, executeRecaptcha]);

	const renderedProducts = products.map((product) => {
		return (
			<div key={product.name} className={styles.item}>
				<span>{product.name} </span>
				<span>x{product.quantity}</span>

				<span>
					${" "}
					{product.priceTotal.toLocaleString("en-US", {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</span>
			</div>
		);
	});

	const appearance: Appearance = {
		theme: "flat",
		variables: {
			colorPrimary: "#9c84b6",
			colorBackground: "#ffffff",
			colorText: "#0f172a",
		},
	};
	const options: StripeElementsOptions = {
		clientSecret,
		appearance,
	};

	let elementsContents;
	if (clientSecret) {
		elementsContents = (
			<Elements options={options} stripe={stripePromise}>
				<CheckoutForm
					confirmParams={confirmParams}
					handleCancelled={handleCancelled}
				/>
			</Elements>
		);
	} else {
		if (error) {
			elementsContents = (
				<div className={styles.center}>
					<p>Error loading payment form:</p>
					<p style={{ marginBottom: "2rem" }}>{error}</p>
					<a href={alternateLink} className={styles.alternateLink}>
						Click here for another way to donate
					</a>
					<CustomButton
						size="large"
						variant="outlined"
						style={{ fontSize: "1rem" }}
						onClick={handleCancelled}
					>
						Cancel
					</CustomButton>
				</div>
			);
		} else {
			elementsContents = (
				<div className={styles.center}>
					<CircularProgress />
				</div>
			);
		}
	}

	return (
		<Dialog open={open} fullWidth maxWidth="md">
			<DialogTitle>Secure Checkout</DialogTitle>
			<DialogContent>
				<div className={styles.summary}>
					{renderedProducts}
					<hr />
					<div className={`${styles.total} ${styles.item}`}>
						<span>Total</span>
						<span>
							${" "}
							{total.toLocaleString("en-US", {
								maximumFractionDigits: 2,
								minimumFractionDigits: 2,
							})}
						</span>
					</div>
				</div>
			</DialogContent>
			<div className={styles.stripe}>{elementsContents}</div>
		</Dialog>
	);
};

export default Checkout;
