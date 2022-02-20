import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const thankyou = () => {
	const router = useRouter();
	const [confirmationDetails, setConfirmationDetails] = useState(null);

	const { payment_intent, payment_intent_client_secret, redirect_status } =
		router.query;

	useEffect(() => {
		if (!payment_intent) return;
		const getConfirmationDetails = async () => {
			const response = await axios.get(
				`https://api.stripe.com/v1/payment_intents/${payment_intent}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY}`,
					},
					params: {
						client_secret: payment_intent_client_secret,
					},
				}
			);
			setConfirmationDetails(response.data);
		};

		getConfirmationDetails();
	}, [payment_intent]);

	return (
		<div style={{ minHeight: "40rem" }}>
			{confirmationDetails ? (
				<div>{`Thank you for your $${(
					confirmationDetails.amount / 100
				).toLocaleString("en-US", {
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})} donation! A receipt has been sent to ${
					confirmationDetails.receipt_email
				}`}</div>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default thankyou;
