import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { ShirtOrder } from "./ShirtOrder";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./FeralShirtForm.module.scss";

interface ShirtListProps {
	shirtOrder: ShirtOrder;
	setShirtOrder: any;
}

export const SHIRT_PRICE = 25;

const ShirtList = ({ shirtOrder, setShirtOrder }: ShirtListProps) => {
	const { items } = shirtOrder;

	const handleDelete = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setShirtOrder({ items: newItems });
	};

	const getTotalQuantity = () => {
		let totalQuantity = 0;
		items.forEach((item) => {
			totalQuantity += item.quantity;
		});
		return totalQuantity;
	};

	const getTotal = () => {
		return getTotalQuantity() * SHIRT_PRICE;
	};

	return (
		<TableContainer component={Paper} className={styles.table}>
			<Table size="small" aria-label="list of selected shirts">
				<TableHead>
					<TableRow>
						<TableCell>Color</TableCell>
						<TableCell align="center">Size</TableCell>
						<TableCell align="center">Qty</TableCell>
						<TableCell align="center">Price</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<>
						{items.map((row, index) => (
							<TableRow
								key={row.color + row.size}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.color}
								</TableCell>
								<TableCell align="center">{row.size}</TableCell>
								<TableCell align="center">{row.quantity}</TableCell>
								<TableCell align="center">
									${SHIRT_PRICE * row.quantity}.00
								</TableCell>
								<TableCell align="center">
									<DeleteIcon
										className={styles.deleteIcon}
										onClick={() => handleDelete(index)}
									/>
								</TableCell>
							</TableRow>
						))}
					</>
					<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
						<TableCell component="th" scope="row">
							Total
						</TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center">{getTotalQuantity()}</TableCell>
						<TableCell align="center">${getTotal()}.00</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default ShirtList;
