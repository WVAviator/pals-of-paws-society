const ArrowIcon = ({ width = 14, height = 14, color = "white" }) => {
	return (
		<>
			<svg
				width={width}
				height={height}
				viewBox="0 0 8 8"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 3.99999C0 3.86738 0.0526785 3.74021 0.146447 3.64644C0.240215 3.55267 0.367392 3.49999 0.5 3.49999H6.293L4.146 1.35399C4.05211 1.2601 3.99937 1.13277 3.99937 0.999991C3.99937 0.867215 4.05211 0.739877 4.146 0.645991C4.23989 0.552104 4.36722 0.499359 4.5 0.499359C4.63278 0.499359 4.76011 0.552104 4.854 0.645991L7.854 3.64599C7.90056 3.69244 7.93751 3.74761 7.96271 3.80836C7.98792 3.8691 8.00089 3.93422 8.00089 3.99999C8.00089 4.06576 7.98792 4.13088 7.96271 4.19162C7.93751 4.25237 7.90056 4.30755 7.854 4.35399L4.854 7.35399C4.76011 7.44788 4.63278 7.50062 4.5 7.50062C4.36722 7.50062 4.23989 7.44788 4.146 7.35399C4.05211 7.2601 3.99937 7.13277 3.99937 6.99999C3.99937 6.86722 4.05211 6.73988 4.146 6.64599L6.293 4.49999H0.5C0.367392 4.49999 0.240215 4.44731 0.146447 4.35354C0.0526785 4.25978 0 4.1326 0 3.99999Z"
					fill={color}
				/>
			</svg>
		</>
	);
};

export default ArrowIcon;
