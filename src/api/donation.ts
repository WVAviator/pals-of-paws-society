import { BillingInfo } from "../types/BillingInfo";
import { DonationRecord } from "../types/DonationRecord";
import { addSpreadsheetData } from "./SheetData";
import { sendAutomatedEmail } from "./automatedMail";
import { generateHtmlEmail } from "./emailTemplate";

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const DONATIONS_SHEET_ID = "0";

export const processDonation = async (
	metadata: BillingInfo,
	amount: number
) => {
	const sheetMeta = { docId: DOC_ID, sheetId: DONATIONS_SHEET_ID };

	const billingInfo: BillingInfo = metadata;

	const { firstName, lastName, streetAddress, aptOrSuite, city, state, zip } =
		billingInfo.billingAddress;
	const { inMemory, email, receiveUpdates } = billingInfo;

	const address = `${streetAddress}${
		aptOrSuite ? " " + aptOrSuite : ""
	}, ${city}, ${state} ${zip}`;

	const date = new Date().toLocaleDateString();

	const donationRecord: DonationRecord = {
		["Date"]: date,
		["Amount"]: amount,
		["First Name"]: firstName,
		["Last Name"]: lastName,
		["Address"]: address,
		["In Memory Of"]: inMemory,
		["Email"]: email,
		["Receive Updates"]: receiveUpdates ? "Yes" : "No",
	};

	await addSpreadsheetData<DonationRecord>({
		sheetMeta,
		data: [donationRecord],
	});

	await sendAutomatedEmail({
		to: "palsofpawssociety@gmail.com",
		from: "Pals of Paws Society <orders@palsofpawssociety.org>",
		subject: billingInfo.inMemoryAddress
			? "New Donation (Acknowledgement Requested)"
			: "New Donation",
		text: formatDonationText(billingInfo, amount),
		html: formatDonationHtml(billingInfo, amount),
	});
};

const formatDonationText = (billingInfo: BillingInfo, amount: Number) => {
	const { firstName, lastName, streetAddress, aptOrSuite, city, state, zip } =
		billingInfo.billingAddress;
	const { inMemory, email, receiveUpdates } = billingInfo;
	let donationText = "";

	donationText += `A new donation has been made by ${firstName} ${lastName} in the amount of $${amount}.\n\n`;
	if (inMemory) {
		donationText += `This donation is in memory of ${inMemory}.\n\n`;
		if (billingInfo.inMemoryAddress) {
			donationText += `Please send an acknowledgement to ${billingInfo.inMemoryAddress.firstName} ${billingInfo.inMemoryAddress.lastName} at ${billingInfo.inMemoryAddress.streetAddress} ${billingInfo.inMemoryAddress.aptOrSuite}, ${billingInfo.inMemoryAddress.city}, ${billingInfo.inMemoryAddress.state} ${billingInfo.inMemoryAddress.zip}.\n\n`;
		}
	}

	donationText += `Billing Address:\n${streetAddress}${
		aptOrSuite ? " " + aptOrSuite : ""
	}\n${city}, ${state} ${zip}\n\n`;

	donationText += `Email: ${email}\n\n`;

	donationText += `This donor would ${
		receiveUpdates ? "" : "not "
	}like to receive replies or future updates.\n\n`;

	return donationText;
};

const formatDonationHtml = (billingInfo: BillingInfo, amount: Number) => {
	const { firstName, lastName, streetAddress, aptOrSuite, city, state, zip } =
		billingInfo.billingAddress;
	const { inMemory, email, receiveUpdates } = billingInfo;
	let donationHtml = "";

	donationHtml += `<p>A new donation has been made by ${firstName} ${lastName} in the amount of $${amount}.</p>`;
	if (inMemory) {
		donationHtml += `<p>This donation is in memory of ${inMemory}.</p>`;
		if (billingInfo.inMemoryAddress) {
			donationHtml += `<p>Please send an acknowledgement to: <br>${
				billingInfo.inMemoryAddress.firstName
			} ${billingInfo.inMemoryAddress.lastName}<br>${
				billingInfo.inMemoryAddress.streetAddress
			} ${billingInfo.inMemoryAddress.aptOrSuite || ""}<br>${
				billingInfo.inMemoryAddress.city
			} ${billingInfo.inMemoryAddress.state} ${
				billingInfo.inMemoryAddress.zip
			}.</p>`;
		}
	}

	donationHtml += `<p>Donor Billing Address:<br>${firstName} ${lastName}<br>${streetAddress} ${
		aptOrSuite || ""
	}<br>${city}, ${state} ${zip}</p>`;
	donationHtml += `<p>Email: ${email}</p>`;
	if (receiveUpdates) {
		donationHtml +=
			"<p>This donor would like to receive replies or future updates.</p>";
	}

	return generateHtmlEmail(donationHtml);
};
