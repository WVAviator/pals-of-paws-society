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
	const doc = new GoogleSpreadsheet(spreadsheetId);

	try {
		await doc.useServiceAccountAuth({
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		});
	} catch (error) {
		console.error(
			"Error while obtaining spreadsheet authorization: ",
			error
		);
		throw new GoogleSpreadsheetAccessError(error.message);
	}
	await doc.loadInfo();

	return doc;
};

export const getSpreadsheetData = async <T>(sheetMeta: SheetMeta) => {
	try {
		const doc = await getSpreadsheet(sheetMeta.docId);
		const sheet = doc.sheetsById[sheetMeta.sheetId];
		const rows: unknown = await sheet.getRows();
		return rows as T[];
	} catch (err) {
		console.error("Error while getting spreadsheet data: ", err);
		return [];
	}
};

export const addSpreadsheetData = async <T extends SheetsRowData>({
	sheetMeta,
	data,
}: SheetData<T>) => {
	const doc = await getSpreadsheet(sheetMeta.docId);

	const sheet = doc.sheetsById[sheetMeta.sheetId];

	await sheet.addRows(data);
};
