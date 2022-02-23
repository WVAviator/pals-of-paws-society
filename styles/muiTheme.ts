export const muiTheme = createTheme({
	palette: {
		primary: {
			main: "#9C84B6",
			light: "#F9F5FF",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#0A1354",
			dark: "#0F172A",
			contrastText: "#ffffff",
		},
		contrastTheshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: ["Signika Negative", "Inter", "sans-serif"].join(","),
	},
});