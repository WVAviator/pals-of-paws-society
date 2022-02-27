import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret =
	"whsec_ea545bdcb3c53e8909547d452d8b8d1d46906be4b5e1e85494a9ddad9a8eca20";

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
		res.send(200);

		if (!paymentIntent) return;

		console.log(paymentIntent.metadata);
		//What should we do with the metadata?
	}
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
