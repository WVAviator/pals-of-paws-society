import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { Product } from "../../../src/types/Product";
import { processDonation } from "../../../src/api/donation";
import { processShirtOrder } from "../../../src/api/shirtOrder";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const buf = await buffer(req);

		let event;

		const signature = req.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(buf, signature, endpointSecret);
		} catch (error) {
			console.log("Webhook signature verification failed.", error.message);
			return res.send(400);
		}

		let paymentIntent;

		if (event.type === "payment_intent.succeeded") {
			paymentIntent = event.data.object;
		} else {
			return res.send(200);
		}

		if (!paymentIntent.metadata) {
			console.log("No metadata found in payment intent.");
			return res.send(200);
		} //paid through stripe checkout via other links

		const products: Product[] = JSON.parse(paymentIntent.metadata.products);

		if (products[0].name === "Donation") {
			await processDonation(paymentIntent);
			return res.send(200);
		}

		await processShirtOrder(paymentIntent, products);
		return res.send(200);
	}
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
