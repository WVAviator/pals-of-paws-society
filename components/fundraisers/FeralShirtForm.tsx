import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Shirt } from "./Shirt";
import ShirtEntry from "./ShirtEntry";
import ShirtList from "./ShirtList";
import { ShirtOrder } from "./ShirtOrder";
import styles from "./FeralShirtForm.module.scss";

const FeralShirtForm = () => {
	const [shirtOrder, setShirtOrder] = useState<ShirtOrder>({
		items: [],
	});

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

	return (
		<Paper elevation={3} className={styles.form}>
			<ShirtEntry addShirt={handleAddShirt} />
			<ShirtList shirtOrder={shirtOrder} setShirtOrder={setShirtOrder} />
		</Paper>
	);
};

export default FeralShirtForm;
