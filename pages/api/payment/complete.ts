import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { addSpreadsheetData } from "../../../src/api/SheetData";
import { PaymentRecord } from "../../../src/types/PaymentRecord";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const SHEET_ID = "0";

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
			res.send(200);
		} else {
			return res.send(200);
		}

		console.log("Payment complete webhook received. ", paymentIntent.metadata);

		const {
			firstName,
			lastName,
			streetAddress,
			aptOrSuite,
			city,
			state,
			zip,
			inMemory,
			email,
			receiveUpdates,
		} = paymentIntent.metadata;

		const address = `${streetAddress}${
			aptOrSuite ? " " + aptOrSuite : ""
		}, ${city}, ${state} ${zip}`;

		const date = new Date().toLocaleDateString();

		const newPaymentRecord: PaymentRecord = {
			["Date"]: date,
			["Amount"]: paymentIntent.amount / 100,
			["First Name"]: firstName,
			["Last Name"]: lastName,
			["Address"]: address,
			["In Memory Of"]: inMemory,
			["Email"]: email,
			["Receive Updates"]: receiveUpdates ? "Yes" : "No",
		};

		const sheetMeta = { docId: DOC_ID, sheetId: SHEET_ID };

		addSpreadsheetData<PaymentRecord>({ sheetMeta, data: [newPaymentRecord] });
	}
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
