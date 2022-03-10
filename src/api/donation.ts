import { DonationRecord } from "../types/DonationRecord";
import { addSpreadsheetData } from "./SheetData";

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const DONATIONS_SHEET_ID = "0";

export const processDonation = async (paymentIntent: any) => {
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

	console.log("Constructed donation record:", donationRecord);
	await addSpreadsheetData<DonationRecord>({
		sheetMeta,
		data: [donationRecord],
	});
	console.log("Added donation record to spreadsheet.");
};
