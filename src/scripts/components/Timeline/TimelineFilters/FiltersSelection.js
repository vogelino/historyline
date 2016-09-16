import React, { PropTypes } from 'react';

const FiltersSelection = ({ label, activeFilterText }) => (
	<form className="timeline-filters-selection">
		<span className="filter-selection-label">{label}:</span>
		<span className="filter-selection-value">{activeFilterText}</span>
	</form>
);

FiltersSelection.propTypes = {
	label: PropTypes.string.isRequired,
	activeFilterText: PropTypes.string.isRequired
};

export default FiltersSelection;
