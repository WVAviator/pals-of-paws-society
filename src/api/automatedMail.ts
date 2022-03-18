import sgMail from "@sendgrid/mail";
import { EMailMessage } from "../types/EMailMessage";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class UndeliverableError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UndeliverableError";
	}
}

const optOutEmailAddresses = ["hasadoptions@gmail.com"];

export const sendAutomatedEmail = async (message: EMailMessage) => {
	if (optOutEmailAddresses.includes(message.to)) {
		throw new UndeliverableError(
			"Recipient has opted out of automated emails."
		);
	}

	try {
		await sgMail.send(message);
	} catch (error) {
		throw new UndeliverableError(error.message);
	}
};
