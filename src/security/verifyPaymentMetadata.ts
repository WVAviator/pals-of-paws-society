import { BillingInfo } from "../types/BillingInfo";

const verifyMetadata = (metadata: Partial<BillingInfo>) => {
	console.log("Validating metadata: ", metadata);

	if (
		!metadata.billingAddress.firstName ||
		!metadata.billingAddress.lastName ||
		!metadata.billingAddress.streetAddress ||
		!metadata.billingAddress.city ||
		!metadata.billingAddress.state ||
		!metadata.billingAddress.zip ||
		!metadata.email
	) {
		return [false, "Missing required fields"];
	}

	if (
		metadata.billingAddress.firstName.length < 2 ||
		metadata.billingAddress.lastName.length < 2 ||
		metadata.billingAddress.city.length < 2
	) {
		return [false, "Invalid name"];
	}

	if (!/\d{1,6}\s+\w+/.test(metadata.billingAddress.streetAddress)) {
		return [false, "Invalid street address"];
	}

	if (
		!/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/.test(
			metadata.billingAddress.state
		)
	) {
		return [false, "Invalid state"];
	}

	if (!/^\d{5}$/.test(metadata.billingAddress.zip)) {
		return [false, "Invalid zip"];
	}

	if (!/^[^@]+@[^@]+\.[^@]+$/.test(metadata.email)) {
		return [false, "Invalid email"];
	}

	return [true, ""];
};

export default verifyMetadata;
