import React from 'react';
import Icon from '../../Uikit/Icon';
import FiltersSelection from './FiltersSelection';
import VisTypeSwitch from './VisTypeSwitch';

const TimelineFilters = () => (
	<div className="timeline-filters-root">
		<Icon iconId="bars" />
		<FiltersSelection
			activeFilterText="Year 2000"
			label="Period"
		/>
		<FiltersSelection
			activeFilterText="Random"
			label="Category"
		/>
		<FiltersSelection
			activeFilterText="Worldwide"
			label="Geography"
		/>
		<VisTypeSwitch />
	</div>
);

TimelineFilters.propTypes = {
};

export default TimelineFilters;
