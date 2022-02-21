import styles from "./GridContent.module.scss";

interface GridContentProps {
	columnLayout: string;
	children: JSX.Element;
}

const GridContent = ({ columnLayout = "1fr 1fr", children }: GridContentProps) => {
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
