import { NextApiRequest, NextApiResponse } from "next";
import { getPrice } from "../../../src/prices";
import redis from "../../../src/redis";
import { Product } from "../../../src/types/Product";
import verifyMetadata from "../../../src/security/verifyPaymentMetadata";
import rateLimit from "../../../src/security/rateLimit";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const MAX_REQUESTS = 3;
const MAX_REQUESTS_TIME_WINDOW = 150;

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

const isRateLimited = async (email: string, ip: string) => {
	const { success: emailRateSuccess } = await rateLimit(
		`email:${email}`,
		MAX_REQUESTS,
		MAX_REQUESTS_TIME_WINDOW
	);

	const { success: ipRateSuccess } = await rateLimit(
		`ip:${ip}`,
		MAX_REQUESTS,
		MAX_REQUESTS_TIME_WINDOW
	);

	return !emailRateSuccess || !ipRateSuccess;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const {
			products,
			description = "Donation",
			metadata,
			token,
		} = req.body;

		const recaptchaResponse = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${req.socket.localAddress}`,
			{
				method: "POST",
			}
		);

		const recaptchaData = await recaptchaResponse.json();
		console.log("Recaptcha data", recaptchaData);

		if (!recaptchaData.success || recaptchaData.score < 0.5) {
			return res.status(403).send({ error: "Authorization failed" });
		}

		const [metadataVerified, metadataVerificationMessage] =
			verifyMetadata(metadata);

		if (!metadataVerified) {
			return res.status(400).send({ error: metadataVerificationMessage });
		}

		if (await isRateLimited(metadata.email, req.socket.localAddress)) {
			return res.status(429).send({ error: "Too many requests" });
		}

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
