import { BillingInfo } from "../types/BillingInfo";
import rateLimit from "./rateLimit";

const verifyMetadata = (metadata: Partial<BillingInfo>) => {
	if (
		!metadata.firstName ||
		!metadata.lastName ||
		!metadata.streetAddress ||
		!metadata.city ||
		!metadata.state ||
		!metadata.zip ||
		!metadata.email
	) {
		return [false, "Missing required fields"];
	}

	if (
		metadata.firstName.length < 2 ||
		metadata.lastName.length < 2 ||
		metadata.city.length < 2
	) {
		return [false, "Invalid name"];
	}

	if (!/\d{1,6}\s+\w+/.test(metadata.streetAddress)) {
		return [false, "Invalid street address"];
	}

	if (
		!/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/.test(
			metadata.state
		)
	) {
		return [false, "Invalid state"];
	}

	if (!/^\d{5}$/.test(metadata.zip)) {
		return [false, "Invalid zip"];
	}

	if (!/^[^@]+@[^@]+\.[^@]+$/.test(metadata.email)) {
		return [false, "Invalid email"];
	}

	return [true, ""];
};

export default verifyMetadata;
