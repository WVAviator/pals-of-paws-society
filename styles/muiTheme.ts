import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
	palette: {
		primary: {
			main: "#692fa8",
			light: "#9C84B6",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#0A1354",
			dark: "#0F172A",
			contrastText: "#ffffff",
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: ["Signika Negative", "Inter", "sans-serif"].join(","),
	},
});
