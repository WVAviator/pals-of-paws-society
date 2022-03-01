import { GoogleSpreadsheet } from "google-spreadsheet";

import { NextApiRequest, NextApiResponse } from "next";

const getSpreadsheet = async (spreadsheetId: string) => {
	const doc = new GoogleSpreadsheet(spreadsheetId);
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
	});
	await doc.loadInfo();
	return doc;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const getData = async () => {
		const { docId, sheetId } = req.query;
		const doc = await getSpreadsheet(docId as string);
		const sheet = doc.sheetsById[sheetId as string];
		const rows = await sheet.getRows();
		res.status(200).send(rows);
	};

	const addData = async () => {
		const { docId, sheetId, data } = req.body;
		const doc = await getSpreadsheet(docId as string);
		const sheet = doc.sheetsById[sheetId as string];
		data.forEach(async (row: any) => {
			await sheet.addRow(row);
		});
		res.send(200);
	};

	switch (req.method) {
		case "GET":
			try {
				await getData();
			} catch (err) {
				res.status(500).send(err);
			}
			break;
		case "POST":
			try {
				await addData();
			} catch (err) {
				res.status(500).send(err);
			}
			break;
		default:
			res.status(405).send(`Method ${req.method} not allowed`);
	}
};

export default handler;
