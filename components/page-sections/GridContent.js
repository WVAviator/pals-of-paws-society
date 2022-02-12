import styles from "./GridContent.module.scss";

const GridContent = ({ columnLayout = "1fr 1fr", children }) => {
	const gridStyle = {
		gridTemplateColumns: columnLayout,
	};

	return (
		<div className={styles.gridOuter}>
			<div className={styles.gridContent} style={gridStyle}>
				{children}
			</div>
		</div>
	);
};

export default GridContent;
