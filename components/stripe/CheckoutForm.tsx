import {
	Alert,
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { ConfirmPaymentData } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CustomButton from "../ui/CustomButton";

type CheckoutFormProps = {
	confirmParams: ConfirmPaymentData;
	handleCancelled: () => void;
};

const CheckoutForm = ({
	confirmParams,
	handleCancelled,
}: CheckoutFormProps) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams,
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occured.");
		}

		setIsLoading(false);
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<DialogContent sx={{ minHeight: "20rem" }}>
				<PaymentElement id="payment-element" />
			</DialogContent>
			<DialogActions sx={{ marginTop: "auto" }}>
				<CustomButton
					size="large"
					variant="outlined"
					style={{ fontSize: "1rem" }}
					onClick={handleCancelled}
					disabled={isLoading}
				>
					Cancel
				</CustomButton>
				<CustomButton
					id="submit"
					size="large"
					type="submit"
					style={{ fontSize: "1rem" }}
					disabled={isLoading || !stripe || !elements}
				>
					{isLoading ? <CircularProgress /> : "Submit Payment"}
				</CustomButton>
			</DialogActions>
			{message && (
				<Alert severity="error" id="payment-message">
					{message}
				</Alert>
			)}
		</form>
	);
};

export default CheckoutForm;
