import { NextApiRequest, NextApiResponse } from "next";
import { getPrice } from "../../../src/prices";
import { Product } from "../../../src/types/Product";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateAmount = (products: Product[]): number => {
	if (products[0].name === "Donation") {
		return products[0].priceTotal * 100;
	}

	let total = 0;

	products.forEach((product) => {
		total += getPrice(product.name) * product.quantity;
	});

	return total * 100;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { products, description = "Donation", metadata } = req.body;

		console.log(products);
		console.log(description);
		console.log(metadata);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateAmount(products),
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
