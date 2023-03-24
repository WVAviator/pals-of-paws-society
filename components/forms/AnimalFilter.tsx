import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
	Checkbox,
	Dialog,
	DialogActions,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
} from "@mui/material";
import React from "react";
import CustomButton from "../ui/CustomButton";
import styles from "./AnimalFilter.module.scss";

export interface AnimalFilter {
	cat: boolean;
	dog: boolean;
	male: boolean;
	female: boolean;
	petfinder: boolean;
}

interface AnimalFilterProps {
	filter: AnimalFilter;
	setFilter: (filter: AnimalFilter) => void;
}

const AnimalFilter: React.FC<AnimalFilterProps> = ({ filter, setFilter }) => {
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [localFormValues, setLocalFormValues] =
		React.useState<AnimalFilter>(filter);

	const onApply = (e: React.FormEvent) => {
		e.preventDefault();
		handleClose();
		setFilter(localFormValues);
	};

	const handleClose = () => {
		setDialogOpen(() => false);
	};

	return (
		<>
			<Dialog
				open={dialogOpen}
				PaperProps={{ sx: { maxWidth: "20rem", width: "90vw" } }}
				onClose={handleClose}
			>
				<form className={styles.form} onSubmit={onApply}>
					<FormLabel sx={{ fontSize: "1.5rem" }}>Filter Animals</FormLabel>
					<FormControl>
						<FormLabel>Animal Type</FormLabel>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={localFormValues.dog}
										onChange={(e) =>
											setLocalFormValues({
												...localFormValues,
												dog: e.target.checked,
											})
										}
									/>
								}
								label="Dogs"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={localFormValues.cat}
										onChange={(e) =>
											setLocalFormValues({
												...localFormValues,
												cat: e.target.checked,
											})
										}
									/>
								}
								label="Cats"
							/>
						</FormGroup>
					</FormControl>
					<FormControl>
						<FormLabel>Sex</FormLabel>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={localFormValues.male}
										onChange={(e) =>
											setLocalFormValues({
												...localFormValues,
												male: e.target.checked,
											})
										}
									/>
								}
								label="Male"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={localFormValues.female}
										onChange={(e) =>
											setLocalFormValues({
												...localFormValues,
												female: e.target.checked,
											})
										}
									/>
								}
								label="Female"
							/>
						</FormGroup>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Petfinder</FormLabel>
						<FormControlLabel
							control={
								<Checkbox
									checked={localFormValues.petfinder}
									onChange={(e) =>
										setLocalFormValues({
											...localFormValues,
											petfinder: e.target.checked,
										})
									}
								/>
							}
							label="Include Animals from Petfinder"
						/>
					</FormControl>
					<DialogActions>
						<CustomButton variant="outlined" onClick={handleClose}>
							Cancel
						</CustomButton>
						<CustomButton type="submit">Apply</CustomButton>
					</DialogActions>
				</form>
			</Dialog>
			{/* <div className={styles.filter} onClick={() => setDialogOpen(true)}>
				<FilterAltIcon />
				<p>Filter</p>
			</div> */}
			<CustomButton
				startIcon={<FilterAltIcon />}
				variant="outlined"
				onClick={() => setDialogOpen(true)}
				sx={{ fontSize: "small" }}
			>
				Filter
			</CustomButton>
		</>
	);
};

export default AnimalFilter;
