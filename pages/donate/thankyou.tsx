import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThankYouContent from "../../components/donate/ThankYouContent";
import PawprintSection from "../../components/page-sections/PawprintSection";

const ThankYou = () => {
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
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
					},
					params: {
						client_secret: payment_intent_client_secret,
					},
				}
			);
			setConfirmationDetails(response.data);
		};

		getConfirmationDetails();
	}, [payment_intent, payment_intent_client_secret]);

	return (
		<PawprintSection
			sectionTitle="Payment Confirmation"
			pawprintRotation={190}
			minimumHeight="40rem"
		>
			<ThankYouContent confirmationDetails={confirmationDetails} />
		</PawprintSection>
	);
};

export default ThankYou;
