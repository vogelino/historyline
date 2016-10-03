import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './TimelineSidebar.css';
import SearchField from '../../Uikit/SearchField';
import EventsList from './EventsList';
import { mapCssClasses } from '../../../utilities/styleUtils';

const TimelineSidebar = ({
	isLeftSidebarOpen
}) => (
	<div
		className={mapCssClasses({
			[styles.root]: true,
			[styles.opened]: isLeftSidebarOpen
		})}
	>
		<div className={styles.searchField}>
			<SearchField placeholder="Search something" />
		</div>
		<EventsList />
	</div>
);

TimelineSidebar.propTypes = {
	isLeftSidebarOpen: PropTypes.bool.isRequired
};


const mapStateToProps = ({ ui }) => ({
	isLeftSidebarOpen: ui.leftSidebar.open
});

export default connect(mapStateToProps)(TimelineSidebar);
