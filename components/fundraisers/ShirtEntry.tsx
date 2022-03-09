import {
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import blueshirt from "/public/images/fundraisers/ocean-blue-feral-shirt.jpg";
import tealshirt from "/public/images/fundraisers/teal-feral-shirt.jpg";
import sunsetshirt from "/public/images/fundraisers/sunset-feral-shirt.jpg";
import CustomButton from "../ui/CustomButton";
import { Shirt } from "./Shirt";
import styles from "./FeralShirtForm.module.scss";

interface ShirtFormProps {
	addShirt: (shirt: Shirt) => void;
}

const ShirtEntry = ({ addShirt }: ShirtFormProps) => {
	const [image, setImage] = useState(blueshirt);
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("Ocean Blue");
	const [size, setSize] = useState("M");

	const handleQuantityEntry = (event: any) => {
		const { value } = event.target;
		if (/\D/.test(value)) return;
		setQuantity(Number(value));
	};

	const handleColorSelection = (event: any) => {
		const { value } = event.target;
		setColor(value);
		switch (value) {
			case "Ocean Blue":
				setImage(blueshirt);
				break;
			case "Teal":
				setImage(tealshirt);
				break;
			case "Sunset":
				setImage(sunsetshirt);
				break;
			default:
				setImage(blueshirt);
				break;
		}
	};

	const handleAddItem = (event: any) => {
		event.preventDefault();
		const newShirt: Shirt = {
			quantity,
			color,
			size,
		};

		addShirt(newShirt);
	};

	return (
		<div className={styles.shirtSelect}>
			<Paper elevation={3} className={styles.image}>
				<Image src={image} priority />
			</Paper>
			<form onSubmit={handleAddItem} className={styles.shirtForm}>
				<FormControl fullWidth sx={{ gridColumn: "span 3" }}>
					<InputLabel id="shirt-color-select-label">Color</InputLabel>
					<Select
						labelId="shirt-color-select-label"
						id="shirt-color-select"
						value={color}
						label="Age"
						onChange={handleColorSelection}
					>
						<MenuItem value="Ocean Blue">Ocean Blue</MenuItem>
						<MenuItem value="Teal">Teal</MenuItem>
						<MenuItem value="Sunset">Sunset</MenuItem>
					</Select>
				</FormControl>

				<TextField
					id="shirt-quantity"
					fullWidth
					sx={{ gridColumn: "span 2" }}
					label="Quantity"
					value={quantity}
					onChange={handleQuantityEntry}
					required
					inputProps={{
						inputMode: "numeric",
						pattern: "[0-9]*",
						type: "number",
						min: 1,
					}}
				></TextField>

				<FormControl fullWidth sx={{ gridColumn: "span 1" }}>
					<InputLabel id="shirt-size-select-label">Size</InputLabel>
					<Select
						labelId="shirt-size-select-label"
						id="shirt-size-select"
						value={size}
						label="Age"
						onChange={(event) => setSize(event.target.value)}
					>
						<MenuItem value="S">S</MenuItem>
						<MenuItem value="M">M</MenuItem>
						<MenuItem value="L">L</MenuItem>
						<MenuItem value="XL">XL</MenuItem>
						<MenuItem value="XXL">XXL</MenuItem>
					</Select>
				</FormControl>
				<CustomButton type="submit" className={styles.btn}>
					Add
				</CustomButton>
			</form>
		</div>
	);
};
export default ShirtEntry;
