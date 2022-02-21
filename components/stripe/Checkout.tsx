import {
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import {
	Appearance,
	ConfirmPaymentData,
	loadStripe,
	StripeElementsOptions,
} from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { Product } from "../../src/types/Product";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

type CheckoutProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	products: Product[];
	confirmParams: ConfirmPaymentData;
};

const getTotal = (products: Product[]): number => {
	let total = 0;
	products.forEach((product) => {
		total += product.priceTotal;
	});
	return total;
};

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY
);

const Checkout = ({
	open,
	setOpen,
	products,
	confirmParams,
}: CheckoutProps) => {
	const total = getTotal(products);

	const [clientSecret, setClientSecret] = useState("");

	const handleCancelled = () => {
		setClientSecret("");
		setOpen(false);
	};

	useEffect(() => {
		if (!open) return;

		fetch("/api/payment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ products }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [open]);

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
			<div className={styles.stripe}>
				{clientSecret ? (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm
							confirmParams={confirmParams}
							handleCancelled={handleCancelled}
						/>
					</Elements>
				) : (
					<div className={styles.center}>
						<CircularProgress />
					</div>
				)}
			</div>
		</Dialog>
	);
};

export default Checkout;
