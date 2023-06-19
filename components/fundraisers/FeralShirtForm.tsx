import { Alert, Collapse, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { BillingInfo } from "../../src/types/BillingInfo";
import { Product } from "../../src/types/Product";
import Billing from "../donate/Billing";
import PhoneNumberEntry from "../forms/PhoneNumberEntry";
import Checkout from "../stripe/Checkout";
import CustomButton from "../ui/CustomButton";
import styles from "./FeralShirtForm.module.scss";
import { Shirt } from "./Shirt";
import ShirtEntry from "./ShirtEntry";
import ShirtList, { SHIRT_PRICE } from "./ShirtList";
import { ShirtOrder } from "./ShirtOrder";

let return_url: string;

const FeralShirtForm = () => {
	const [shirtOrder, setShirtOrder] = useState<ShirtOrder>({
		items: [],
	});
	const [billingInfo, setBillingInfo] = useState<BillingInfo>({
		firstName: "",
		lastName: "",
		streetAddress: "",
		aptOrSuite: "",
		city: "",
		state: "",
		zip: "",
		inMemory: "",
		email: "",
		receiveUpdates: false,
	});
	const [checkoutOpen, setCheckoutOpen] = useState(false);
	const [noItemsError, setNoItemsError] = useState(false);

	const handleAddShirt = (shirt: Shirt) => {
		if (
			shirtOrder.items.find((item) => {
				return item.color === shirt.color && item.size === shirt.size;
			})
		) {
			const newItems = shirtOrder.items.map((item) => {
				if (item.color === shirt.color && item.size === shirt.size) {
					item.quantity += shirt.quantity;
				}
				return item;
			});
			setShirtOrder({
				items: newItems,
			});
		} else {
			setShirtOrder({
				items: [...shirtOrder.items, shirt],
			});
		}
	};

	useEffect(() => {
		return_url = window.location.href.replace("/feral-shirts", "/thankyou");
		console.log(return_url);
	}, []);

	useEffect(() => {
		if (shirtOrder.items.length > 0) setNoItemsError(false);
	}, [shirtOrder]);

	const confirmParams = {
		return_url,
		receipt_email: billingInfo.email,
	};

	const products: Product[] = shirtOrder.items.map((shirt) => {
		return {
			name: `${shirt.color} ${shirt.size}`,
			quantity: shirt.quantity,
			priceTotal: shirt.quantity * SHIRT_PRICE,
		};
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (shirtOrder.items.length === 0) {
			setNoItemsError(true);
			return;
		}
		setCheckoutOpen(true);
	};

	const productsString: string = JSON.stringify(products);
	const metadata = { ...billingInfo, products: productsString };

	return (
		<>
			<Paper elevation={3} className={styles.form}>
				<ShirtEntry addShirt={handleAddShirt} />
				<ShirtList shirtOrder={shirtOrder} setShirtOrder={setShirtOrder} />
			</Paper>
			<br />
			<form onSubmit={handleSubmit}>
				<Paper elevation={3} className={styles.billing}>
					<Billing formData={billingInfo} setFormData={setBillingInfo} />
					<PhoneNumberEntry
						formData={billingInfo}
						setFormData={setBillingInfo}
					/>
					<Collapse in={noItemsError}>
						<Alert severity="error">
							Please add at least one type of shirt to the list above.
						</Alert>
					</Collapse>
					<CustomButton type="submit">Continue</CustomButton>
				</Paper>
			</form>
			<Checkout
				open={checkoutOpen}
				setOpen={setCheckoutOpen}
				products={products}
				confirmParams={confirmParams}
				description="T-Shirt Order"
				metadata={metadata}
			/>
		</>
	);
};

export default FeralShirtForm;
