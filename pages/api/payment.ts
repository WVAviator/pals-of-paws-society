import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../src/types/Product";

const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

const calculateAmount = (products: Product[]): number => {
	let total = 0;
	products.forEach((product) => {
		total += product.priceTotal;
	});
	return total * 100;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { products, description = "Donation", metadata } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateAmount(products as Product[]),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
			description,
			metadata,
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	}
};

export default handler;
