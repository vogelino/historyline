import React, { PropTypes } from 'react';
import styles from './FiltersSelection.css';

const FiltersSelection = ({ label, activeFilterText }) => (
	<form className={styles.root}>
		<span className={styles.label}>{label}:</span>
		<span className={styles.value}>{activeFilterText}</span>
	</form>
);

FiltersSelection.propTypes = {
	label: PropTypes.string.isRequired,
	activeFilterText: PropTypes.string.isRequired
};

export default FiltersSelection;
