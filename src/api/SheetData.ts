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
	return doc;
};

export const getSpreadsheetData = async <T>(sheetMeta: SheetMeta) => {
	const doc = await getSpreadsheet(sheetMeta.docId as string);
	const sheet = doc.sheetsById[sheetMeta.sheetId as string];
	const rows: unknown = await sheet.getRows();

	return rows as T[];
};

export const addSpreadsheetData = async <T extends SheetsRowData>({
	sheetMeta,
	data,
}: SheetData<T>) => {
	const doc = await getSpreadsheet(sheetMeta.docId as string);
	const sheet = doc.sheetsById[sheetMeta.sheetId as string];
	if (data.length === 1) {
		await sheet.addRow(data[0]);
	} else {
		await sheet.addRows(data);
	}
};

