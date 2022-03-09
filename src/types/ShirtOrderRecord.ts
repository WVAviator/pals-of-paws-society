import { SheetsRowData } from "./SheetsRowData";

export interface ShirtOrderRecord extends SheetsRowData {
	["Date"]: string;
	["Name"]: string;
	["Color"]: string;
	["Size"]: string;
	["Quantity"]: number;
	["Amount Paid"]: number;
	["Email"]: string;
	["Receive Updates"]: string;
	["Address"]: string;
}
