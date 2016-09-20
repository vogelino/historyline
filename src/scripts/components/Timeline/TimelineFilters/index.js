import React from 'react';
import styles from './TimelineFilters.css';
import icons from '../../../constants/icons';
import Icon from '../../Uikit/Icon';
import FiltersSelection from './FiltersSelection';
import VisTypeSwitch from './VisTypeSwitch';

const TimelineFilters = () => (
	<div className={styles.root}>
		<Icon iconId={icons.MENU} />
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
