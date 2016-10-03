import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './TimelineFilters.css';
import Icon from '../../Uikit/Icon';
import FiltersSelection from './FiltersSelection';
import VisTypeSwitch from './VisTypeSwitch';
import * as uiActions from '../../../actions/ui';

const TimelineFilters = ({
	toggleLeftSidebar,
	isSidebarOpen
}) => (
	<div className={styles.root}>
		<a
			className={styles.link}
			onClick={() => toggleLeftSidebar()}
		>
			<Icon iconId={!isSidebarOpen ? 'menu' : 'cross'} width={20} height={20} />
		</a>
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
	toggleLeftSidebar: PropTypes.func.isRequired,
	isSidebarOpen: PropTypes.bool.isRequired
};


const mapStateToProps = ({ ui }) => ({
	isSidebarOpen: ui.leftSidebar.open
});

const mapDispatchToProps = (dispatch) => bindActionCreators(uiActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilters);
