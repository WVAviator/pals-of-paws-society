import { NextApiRequest, NextApiResponse } from "next";
import { Animal } from "../../../src/types/Animal";
import { ContactInformation } from "../../../src/types/ContactInformation";
//const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { formData, animal } = req.body as {
			formData: ContactInformation;
			animal: Animal;
		};
	}

	res.send(200);
};

export default handler;

const generateHtml = (animal: Animal) => {
	return `
    
    
    
    
    `;
};
