import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useTheme,
} from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface Product {
	name: string;
	quantity: number;
	priceTotal: number;
}

type CheckoutProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	products: Product[];
	onSuccess: () => void;
};

const getTotal = (products: Product[]): number => {
	let total = 0;
	products.forEach((product) => {
		total += product.priceTotal;
	});
	return total;
};

const Checkout = ({ open, setOpen, products, onSuccess }: CheckoutProps) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const total = getTotal(products);

	const handleCancelled = () => {
		console.log("Cancelled.");
		setOpen(false);
	};

	const handleSubmit = () => {
		console.log("Submitting...");
		onSuccess();
	};

	return (
		<Dialog open={open} onClose={handleCancelled} fullWidth maxWidth="md">
			<DialogTitle>Secure Checkout</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{products.map((product) => {
						<div>
							<span>
								{product.name} x{product.quantity}
							</span>
							<span>{product.priceTotal}</span>
						</div>;
					})}
					<div>
						<span>Total</span>
						<span>{total}</span>
					</div>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" size="large" onClick={handleCancelled}>
					Cancel
				</Button>
				<Button variant="contained" size="large" onClick={handleSubmit}>
					Submit Payment
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Checkout;
