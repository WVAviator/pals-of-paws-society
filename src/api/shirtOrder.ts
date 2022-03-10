import { EMailMessage } from "./../types/EMailMessage";
import { Product } from "../types/Product";
import { ShirtOrderRecord } from "../types/ShirtOrderRecord";
import { generateHtmlEmail, generateTextEmail } from "./emailTemplate";
import { addSpreadsheetData } from "./SheetData";
import { sendAutomatedEmail } from "./automatedMail";

const DOC_ID = "1fUp_l6xWGQyY_o80YhfVrE2OE8THF8oR66n0Bcm4qkU";
const SHIRT_ORDERS_SHEET_ID = "1396892371";

export const processShirtOrder = async (
	paymentIntent: any,
	products: Product[]
) => {
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

		return shirtOrderRecord;
	});

	console.log(`Adding ${data.length} records to spreadsheet.`);

	addSpreadsheetData<ShirtOrderRecord>({ sheetMeta, data });

	const receiptEmailHtmlContent = `
    
    <h1>Thank you for your order!</h1>
    <p>We will be reaching out to you directly to arrange for the pickup of your order.</p>
    <p>If you have any questions, please contact us at <a href="mailto:info@palsofpawssociety.org">info@palsofpawssociety.org</a>.</p>
    <br/>
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
		replyTo: "info@palsofpawssociety.org",
		subject: "Order Confirmation - Pals of Paws Society",

		text: generateTextEmail(receiptEmailTextContent),
		html: generateHtmlEmail(receiptEmailHtmlContent),
	};

	console.log("Sending receipt email to: ", receiptEmail.to);

	await sendAutomatedEmail(receiptEmail);

	console.log("Email confirmation sent successfully!");
};
