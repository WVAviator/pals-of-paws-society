import { GoogleSpreadsheet } from "google-spreadsheet";
import { SheetsRowData } from "../types/SheetsRowData";

interface SheetData<T extends SheetsRowData> {
	sheetMeta: SheetMeta;
	data?: T[];
}
interface SheetMeta {
	docId: string;
	sheetId: string;
}

export const getSpreadsheet = async (spreadsheetId: string) => {
	const doc = new GoogleSpreadsheet(spreadsheetId);
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	});
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
