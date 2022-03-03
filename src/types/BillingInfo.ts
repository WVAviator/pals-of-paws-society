export interface BillingInfo {
	firstName: string;
	lastName: string;
	streetAddress: string;
	aptOrSuite?: string;
	city: string;
	state: string;
	zip: string;
	inMemory?: string;
	email: string;
	receiveUpdates: boolean;
}
