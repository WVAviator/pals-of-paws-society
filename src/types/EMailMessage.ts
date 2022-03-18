export interface EMailMessage {
	to: string;
	from: string;
	bcc?: string;
	replyTo?: string;
	subject: string;
	text: string;
	html: string;
}
