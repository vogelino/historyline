import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './TimelineFilters.css';
import Icon from '../../Uikit/Icon';
import FiltersSelection from './FiltersSelection';
import VisTypeSwitch from './VisTypeSwitch';
import SearchTerm from './SearchTerm';
import * as uiActions from '../../../redux/ui/actionCreators';

const TimelineFilters = ({
	toggleLeftSidebar,
	isSidebarOpen,
	activeSearchTerms
}) => (
	<div className={styles.root}>
		<a
			className={`${styles.sibebarToggler} ${styles.link}`}
			onClick={() => toggleLeftSidebar()}
		>
			<Icon iconId={!isSidebarOpen ? 'menu' : 'cross'} width={20} height={20} />
		</a>
		{activeSearchTerms.length ? (
			<FiltersSelection
				label="Search terms"
				className={styles.searchTerms}
			>
				{activeSearchTerms.map(({ value, id }) => (
					<SearchTerm key={id} {...{ value, id }}>
						{value}
					</SearchTerm>
				))}
			</FiltersSelection>
		) : false }
		<FiltersSelection label="Category">
			Random
		</FiltersSelection>
		<FiltersSelection label="Geography">
			Worldwide
		</FiltersSelection>
		<VisTypeSwitch />
	</div>
);

TimelineFilters.propTypes = {
	toggleLeftSidebar: PropTypes.func.isRequired,
	isSidebarOpen: PropTypes.bool.isRequired,
	activeSearchTerms: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	})).isRequired
};


const mapStateToProps = ({ ui, filters }) => ({
	isSidebarOpen: ui.leftSidebar.open,
	activeSearchTerms: filters.searchTerm.active
});

const mapDispatchToProps = (dispatch) => bindActionCreators(uiActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilters);
