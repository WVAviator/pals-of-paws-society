import { GoogleSpreadsheet } from "google-spreadsheet";
import { SheetsRowData } from "../types/SheetsRowData";

class GoogleSpreadsheetAccessError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "GoogleSpreadsheetAccessError";
	}
}

interface SheetData<T extends SheetsRowData> {
	sheetMeta: SheetMeta;
	data?: T[];
}
interface SheetMeta {
	docId: string;
	sheetId: string;
}

export const getSpreadsheet = async (spreadsheetId: string) => {
	console.log(`Getting spreadsheet with id ${spreadsheetId}.`);

	const doc = new GoogleSpreadsheet(spreadsheetId);

	console.log("Obtaining authorization using credentials:");
	console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
	console.log(process.env.GOOGLE_PRIVATE_KEY);
	try {
		await doc.useServiceAccountAuth({
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		});
	} catch (error) {
		console.error("Error while obtaining spreadsheet authorization: ", error);
		throw new GoogleSpreadsheetAccessError(error.message);
	}

	console.log("Authorized. Loading document...");
	await doc.loadInfo();
	console.log(`${doc.title} loaded.`);

	return doc;
};

export const getSpreadsheetData = async <T>(sheetMeta: SheetMeta) => {
	const doc = await getSpreadsheet(sheetMeta.docId);
	const sheet = doc.sheetsById[sheetMeta.sheetId];
	const rows: unknown = await sheet.getRows();
	return rows as T[];
};

export const addSpreadsheetData = async <T extends SheetsRowData>({
	sheetMeta,
	data,
}: SheetData<T>) => {
	console.log(`Retrieving document with id ${sheetMeta.docId}.`);
	const doc = await getSpreadsheet(sheetMeta.docId);

	const sheet = doc.sheetsById[sheetMeta.sheetId];
	console.log(`Adding data to sheet id ${sheetMeta.sheetId}.`);

	await sheet.addRows(data);
	console.log("Added the following data to spreadsheet:", data);
};
