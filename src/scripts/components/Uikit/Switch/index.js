import React, { PropTypes } from 'react';
import SwitchOption from './SwitchOption';
import styles from './Switch.css';
import { mapCssClasses } from '../../../utilities/styleUtils';

const Switch = ({
	option1Icon,
	option2Icon,
	activeIndex,
	onSwitch,
	className
}) => (
	<div // eslint-disable-line
		onClick={(evt) => {
			evt.preventDefault();
			onSwitch(!activeIndex);
		}}
		className={mapCssClasses({
			[styles.root]: true,
			[className]: Boolean(className),
			[styles.unswitched]: activeIndex === 0,
			[styles.switched]: activeIndex === 1
		})}
	>
		<SwitchOption index={0} iconId={option1Icon} activeIndex={activeIndex} />
		<SwitchOption index={1} iconId={option2Icon} activeIndex={activeIndex} />
		<div className={styles.handle} />
	</div>
);

Switch.defaultProps = {
	option1Icon: 'circleCheck',
	option2Icon: 'circleCross',
	onSwitch: () => {}
};

Switch.propTypes = {
	option1Icon: PropTypes.string,
	option2Icon: PropTypes.string,
	className: PropTypes.string,
	activeIndex: PropTypes.number.isRequired,
	onSwitch: PropTypes.func
};

export default Switch;
