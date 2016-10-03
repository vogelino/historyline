import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Switch from '../../Uikit/Switch';
import styles from './TimelineFilters.css';
import { switchVisualizationType } from '../../../actions/actionsCreators';

const VisTypeSwitch = ({
	activeIndex,
	onSwitch
}) => (
	<div className={styles.switch}>
		<Switch
			activeIndex={activeIndex}
			option1Icon="clock"
			option2Icon="map"
			onSwitch={onSwitch}
		/>
	</div>
);

VisTypeSwitch.propTypes = {
	activeIndex: PropTypes.number.isRequired,
	onSwitch: PropTypes.func.isRequired
};


const mapStateToProps = ({ visualization }) => ({
	activeIndex: visualization.type === 'map' ? 1 : 0
});

const mapDispatchToProps = (dispatch) => ({
	onSwitch: () => dispatch(switchVisualizationType())
});

export default connect(mapStateToProps, mapDispatchToProps)(VisTypeSwitch);
