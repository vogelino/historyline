import React, { PropTypes } from 'react';
import Icon from '../Icon';

const SwitchOption = ({ index, iconId, activeIndex }) => (
	<div
		className={`
			switch-option-${index}
			${index === activeIndex ? 'active' : ''}
		`}
	>
		{iconId ? <Icon iconId={iconId} /> : null}
	</div>
);

SwitchOption.propTypes = {
	index: PropTypes.number.isRequired,
	iconId: PropTypes.string,
	activeIndex: PropTypes.number.isRequired
};

export default SwitchOption;
