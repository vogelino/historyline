import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './TimelineSidebar.css';
import SearchField from '../../Uikit/SearchField';
import EventsList from './EventsList';
import { mapCssClasses } from '../../../utilities/styleUtils';
import * as filtersActions from '../../../actions/filters';

const TimelineSidebar = ({
	isLeftSidebarOpen,
	setSearchTerm,
	submitSearchTerm,
	searchTermInField
}) => (
	<div
		className={mapCssClasses({
			[styles.root]: true,
			[styles.opened]: isLeftSidebarOpen
		})}
	>
		<div className={styles.searchField}>
			<SearchField
				placeholder="Search something"
				value={searchTermInField}
				onType={setSearchTerm}
				onSubmit={submitSearchTerm}
				className={styles.searchFieldInput}
			/>
		</div>
		<EventsList />
	</div>
);

TimelineSidebar.propTypes = {
	isLeftSidebarOpen: PropTypes.bool.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
	submitSearchTerm: PropTypes.func.isRequired,
	searchTermInField: PropTypes.string.isRequired
};


const mapStateToProps = ({ ui, filters }) => ({
	isLeftSidebarOpen: ui.leftSidebar.open,
	searchTermInField: filters.searchTerm.inField
});

const mapDispatchToProps = (dispatch) => bindActionCreators(filtersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSidebar);
