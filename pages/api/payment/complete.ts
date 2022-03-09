import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { addSpreadsheetData } from "../../../src/api/SheetData";
import { DonationRecord } from "../../../src/types/DonationRecord";
import { Product } from "../../../src/types/Product";
import { ShirtOrderRecord } from "../../../src/types/ShirtOrderRecord";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const DONATIONS_SHEET_ID = "0";
const SHIRT_ORDERS_SHEET_ID = "1396892371";

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

		if (!paymentIntent.metadata) return; //paid through stripe checkout via other links

		const products: Product[] = JSON.parse(paymentIntent.metadata.products);

		if (products[0].name === "Donation") {
			processDonation(paymentIntent);
			return;
		}

		processShirtOrder(paymentIntent, products);
	}
};

const processDonation = async (paymentIntent: any) => {
	const sheetMeta = { docId: DOC_ID, sheetId: DONATIONS_SHEET_ID };

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

	const donationRecord: DonationRecord = {
		["Date"]: date,
		["Amount"]: paymentIntent.amount / 100,
		["First Name"]: firstName,
		["Last Name"]: lastName,
		["Address"]: address,
		["In Memory Of"]: inMemory,
		["Email"]: email,
		["Receive Updates"]: receiveUpdates ? "Yes" : "No",
	};

	addSpreadsheetData<DonationRecord>({ sheetMeta, data: [donationRecord] });
};

const processShirtOrder = async (paymentIntent: any, products: Product[]) => {
	const sheetMeta = { docId: DOC_ID, sheetId: SHIRT_ORDERS_SHEET_ID };

	const {
		firstName,
		lastName,
		streetAddress,
		aptOrSuite,
		city,
		state,
		zip,
		email,
		receiveUpdates,
	} = paymentIntent.metadata;

	console.log(`Generating records for ${products.length} products.`);

	const data: ShirtOrderRecord[] = products.map((product) => {
		let splitName = product.name.split(" ");
		const size = splitName.pop();
		const color = splitName.join(" ");

		const address = `${streetAddress}${
			aptOrSuite ? " " + aptOrSuite : ""
		}, ${city}, ${state} ${zip}`;

		const shirtOrderRecord: ShirtOrderRecord = {
			["Date"]: new Date().toLocaleDateString(),
			["Name"]: firstName + " " + lastName,
			["Color"]: color,
			["Size"]: size,
			["Quantity"]: product.quantity,
			["Amount Paid"]: product.priceTotal,
			["Email"]: email,
			["Receive Updates"]: receiveUpdates ? "Yes" : "No",
			["Address"]: address,
		};

		console.log("Record generated: ", shirtOrderRecord);

		return shirtOrderRecord;
	});

	addSpreadsheetData<ShirtOrderRecord>({ sheetMeta, data });
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
