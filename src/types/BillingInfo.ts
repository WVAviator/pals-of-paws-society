import { Address } from "./Address";

export interface BillingInfo {
	billingAddress: Address;
	inMemory?: string;
	inMemoryAddress?: Address;
	email: string;
	receiveUpdates: boolean;
	phone?: string;
}
