import { SheetsRowData } from "./SheetsRowData";

export interface DonationRecord extends SheetsRowData {
	["Date"]: string;
	["Amount"]: number;
	["First Name"]: string;
	["Last Name"]: string;
	["Address"]: string;
	["In Memory Of"]: string;
	["Email"]: string;
	["Receive Updates"]: string;
}
