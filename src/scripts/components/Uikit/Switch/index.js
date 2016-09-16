import React, { PropTypes } from 'react';
import SwitchOption from './SwitchOption';

const Switch = ({
	option1Icon,
	option2Icon,
	activeIndex
}) => (
	<div className="switch">
		<SwitchOption index={0} iconId={option1Icon} activeIndex={activeIndex} />
		<SwitchOption index={1} iconId={option2Icon} activeIndex={activeIndex} />
	</div>
);

Switch.propTypes = {
	option1Icon: PropTypes.string,
	option2Icon: PropTypes.string,
	activeIndex: PropTypes.number.isRequired
};

export default Switch;
