import verifyPaymentMetadata from "./verifyPaymentMetadata";

describe("verifyPaymentMetadata", () => {
	const defaultTestData = {
		firstName: "Peter",
		lastName: "Griffin",
		streetAddress: "31 Spooner St",
		city: "Quahog",
		state: "RI",
		zip: "12345",
		email: "peter.griffin@gmail.com",
	};

	it("should return true if all fields are valid", () => {
		const metadata = { ...defaultTestData };
		const [result, message] = verifyPaymentMetadata(metadata);
		expect(result).toBe(true);
		expect(message).toBe("");
	});

	it("should not allow omitting fields", () => {
		const metadata = { ...defaultTestData };
		delete metadata.firstName;

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Missing required fields");
	});

	it("should not allow invalid names", () => {
		const metadata = { ...defaultTestData };
		metadata.firstName = "P";

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Invalid name");
	});

	it("should not allow invalid street addresses", () => {
		const metadata = { ...defaultTestData };
		metadata.streetAddress = "123";

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Invalid street address");
	});

	it("should not allow invalid states", () => {
		const metadata = { ...defaultTestData };
		metadata.state = "XX";

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Invalid state");
	});

	it("should not allow invalid zip codes", () => {
		const metadata = { ...defaultTestData };
		metadata.zip = "1234";

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Invalid zip");
	});

	it("should not allow invalid emails", () => {
		const metadata = { ...defaultTestData };
		metadata.email = "peter.griffin@gmail";

		const [isValid, error] = verifyPaymentMetadata(metadata);
		expect(isValid).toBe(false);
		expect(error).toBe("Invalid email");
	});
});
