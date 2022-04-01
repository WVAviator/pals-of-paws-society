import { NextApiRequest, NextApiResponse } from "next";
import { sendAutomatedEmail } from "../../../src/api/automatedMail";
import {
	generateHtmlEmail,
	generateTextEmail,
} from "../../../src/api/emailTemplate";
import { ContactInformation } from "../../../src/types/ContactInformation";
import { EMailMessage } from "../../../src/types/EMailMessage";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { formData } = req.body as {
			formData: ContactInformation;
		};

		const textEmail = generateTextEmail(
			`A volunteer application has been submitted on the website. ${
				formData.name
			} has indicated that they are interested in helping with the following activities:\n\n${formData.volunteer.join(
				"\n"
			)}\nComments:\n${
				formData.comments
			}\n\nHere is their contact information:\n\nName: ${
				formData.name
			}\nEmail: ${formData.email}\nPhone: ${
				formData.phone
			}\n\nThe website has informed them that that someone will reach out as soon as possible.`
		);

		const htmlEmail = generateHtmlEmail(`
		<div>
			<p>A volunteer application has been submitted on the website. ${
				formData.name
			} has indicated that they are interested in helping with the following activities:</p>
			<ul>
				${formData.volunteer.map((item) => `<li>${item}</li>`)}
			</ul>
			<p>Comments:</p>
			<p>${formData.comments}</p>
			<p>Here is their contact information:</p>
			<ul>
				<li>Name: ${formData.name}</li>
				<li>Email: ${formData.email}</li>
				<li>Phone: ${formData.phone}</li>
			</ul>
			<p>The website has informed them that that someone will reach out as soon as possible.</p>
		</div>
	`);

		const msg: EMailMessage = {
			to: "volunteer@palsofpawssociety.org",
			from: "Pals of Paws Society <volunteer@palsofpawssociety.org>",
			replyTo: formData.email,
			bcc: "palsofpawssociety@gmail.com",
			subject: `Volunteer Request - ${formData.name}`,
			text: textEmail,
			html: htmlEmail,
		};
		await sendAutomatedEmail(msg);
		return res.send(200);
	} else {
		res.send(400);
	}
};

export default handler;
