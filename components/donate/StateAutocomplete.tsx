import {
	Autocomplete,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React from "react";

interface StateAutocompleteProps {
	value: string;
	onChange: (value: string) => void;
	required: boolean;
}

const states = [
	"",
	"AL",
	"AK",
	"AS",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FM",
	"FL",
	"GA",
	"GU",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MH",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"MP",
	"OH",
	"OK",
	"OR",
	"PW",
	"PA",
	"PR",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VI",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];

const StateAutocomplete: React.FC<StateAutocompleteProps> = ({
	value,
	onChange,
	required = false,
}) => {
	const [error, setError] = React.useState(false);

	return (
		<FormControl sx={{ gridColumn: "span 2" }}>
			<InputLabel>State</InputLabel>
			<Select
				value={value}
				onChange={(event) => {
					if (
						event.target.value === "" ||
						!states.includes(event.target.value)
					) {
						setError(true);
						return;
					}
					onChange(event.target.value);
				}}
				label="State"
				required={required}
				variant="outlined"
				error={error}
			>
				{states.map((state) => (
					<MenuItem key={state} value={state}>
						{state}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default StateAutocomplete;
