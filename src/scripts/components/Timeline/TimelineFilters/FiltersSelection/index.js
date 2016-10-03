import React, { PropTypes } from 'react';
import styles from './FiltersSelection.css';
import { mapCssClasses } from '../../../../utilities/styleUtils';

const FiltersSelection = ({ label, children, className }) => (
	<form
		className={mapCssClasses({
			[styles.root]: true,
			[className]: Boolean(className)
		})}
	>
		<span className={styles.label}>{label}:</span>
		<span className={styles.value}>{children}</span>
	</form>
);

FiltersSelection.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]).isRequired
};

export default FiltersSelection;
