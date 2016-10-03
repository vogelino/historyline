import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './Timeline.css';
import TimelineSidebar from './TimelineSidebar';
import TimelineFilters from './TimelineFilters';
import TimelineTimeSelection from './TimelineTimeSelection';
import TimelineEvents from './TimelineEvents';
import { mapCssClasses } from '../../utilities/styleUtils';

const Timeline = ({
	isLeftSidebarOpen
}) => (
	<div
		className={mapCssClasses({
			[styles.root]: true,
			[styles.opened]: isLeftSidebarOpen
		})}
	>
		<TimelineSidebar />
		<TimelineFilters />
		<TimelineTimeSelection />
		<TimelineEvents />
	</div>
);

Timeline.propTypes = {
	isLeftSidebarOpen: PropTypes.bool.isRequired
};


const mapStateToProps = ({ ui }) => ({
	isLeftSidebarOpen: ui.leftSidebar.open
});

export default connect(mapStateToProps)(Timeline);
