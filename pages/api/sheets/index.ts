import { NextApiRequest, NextApiResponse } from "next";
import {
	getSpreadsheetData,
	addSpreadsheetData,
} from "../../../src/api/SheetData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			let rows;
			try {
				const sheetMeta = {
					docId: req.query.docId as string,
					sheetId: req.query.sheetId as string,
				};
				rows = await getSpreadsheetData<any>({ sheetMeta });
			} catch (err) {
				res.status(500).send(err);
			}
			res.status(200).send(rows);
			break;
		case "POST":
			try {
				const sheetMeta = {
					docId: req.body.docId as string,
					sheetId: req.body.sheetId as string,
				};
				const data = req.body.data as any[];
				await addSpreadsheetData<any>({ sheetMeta, data });
			} catch (err) {
				res.status(500).send(err);
			}
			res.send(200);
			break;
		default:
			res.status(405).send(`Method ${req.method} not allowed`);
	}
};

export default handler;
