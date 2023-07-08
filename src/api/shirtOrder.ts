import { EMailMessage } from "./../types/EMailMessage";
import { Product } from "../types/Product";
import { ShirtOrderRecord } from "../types/ShirtOrderRecord";
import { generateHtmlEmail, generateTextEmail } from "./emailTemplate";
import { addSpreadsheetData } from "./SheetData";
import { sendAutomatedEmail } from "./automatedMail";
import { BillingInfo } from "../types/BillingInfo";

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const SHIRT_ORDERS_SHEET_ID = "1396892371";

export const processShirtOrder = async (
	metadata: BillingInfo,
	products: Product[]
) => {
	const sheetMeta = { docId: DOC_ID, sheetId: SHIRT_ORDERS_SHEET_ID };

	const { firstName, lastName, streetAddress, aptOrSuite, city, state, zip } =
		metadata.billingAddress;

	const { email, receiveUpdates, phone } = metadata;

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
			["Phone Number"]: phone,
			["Address"]: address,
		};

		return shirtOrderRecord;
	});

	await addSpreadsheetData<ShirtOrderRecord>({ sheetMeta, data });

	const receiptEmailHtmlContent = `
    
    <h1>Thank you for your order!</h1>
    <p>We will be reaching out to you directly to arrange for the pickup of your order.</p>
    <p>If you have any questions, please contact us at <a href="mailto:info@palsofpawssociety.org">info@palsofpawssociety.org</a>.</p>
    <br/>
	<h2>Customer Information</h2>
	<p>${firstName} ${lastName}</p>
	<address>${streetAddress}${
		aptOrSuite ? " " + aptOrSuite : ""
	}<br />${city}, ${state} ${zip}</address>
	<p>${phone}</p>
	<br />
    <h2>Order Details</h2>
    <table style="text-align: center;">

        <tr>
            <th style="width: 100px;">Item</th>
            <th style="width: 100px;">Quantity</th>
            <th style="width: 100px;">Amount Paid</th>
        </tr>

        ${products
					.map((product) => {
						return `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.priceTotal}.00</td>
            </tr>
            `;
					})
					.join("")}
    </table>
    
    <br/>
    <p>Thank you for supporting Pals of Paws Society!</p>`;

	const receiptEmailTextContent = `
    Thank you for your order!\n
    We will be reaching out to you directly to arrange for the pickup of your order.\n
    If you have any questions, please contact us at info@palsofpawssociety.org.\n\n
	Customer Information:\n
	${firstName} ${lastName}\n
	${streetAddress}${aptOrSuite ? " " + aptOrSuite : ""}\n
	${city}, ${state} ${zip}\n
	${phone}\n
    Order Details:\n
    Item\tQuantity\tAmount Paid\n
    ${products.map((product) => {
			return `
        ${product.name}\t${product.quantity}\t${product.priceTotal}\n
        `;
		})}\n\n
    Thank you for supporting Pals of Paws Society!\n`;

	const receiptEmail: EMailMessage = {
		to: email,
		from: "Pals of Paws Society <orders@palsofpawssociety.org>",
		bcc: "palsofpawssociety@gmail.com",
		replyTo: "info@palsofpawssociety.org",
		subject: "Order Confirmation - Pals of Paws Society",

		text: generateTextEmail(receiptEmailTextContent),
		html: generateHtmlEmail(receiptEmailHtmlContent),
	};

	await sendAutomatedEmail(receiptEmail);
	console.log("Email confirmation sent successfully!");
};
