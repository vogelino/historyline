import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from '../../Uikit/Switch';
import styles from './TimelineFilters.css';
import * as visualizationActions from '../../../actions/visualization';

const VisTypeSwitch = ({
	activeIndex,
	toggleVisualizationType
}) => (
	<div className={styles.switch}>
		<Switch
			activeIndex={activeIndex}
			option1Icon="clock"
			option2Icon="map"
			onSwitch={toggleVisualizationType}
		/>
	</div>
);

VisTypeSwitch.propTypes = {
	activeIndex: PropTypes.number.isRequired,
	toggleVisualizationType: PropTypes.func.isRequired
};


const mapStateToProps = ({ visualization }) => ({
	activeIndex: visualization.type === 'map' ? 1 : 0
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(visualizationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VisTypeSwitch);
