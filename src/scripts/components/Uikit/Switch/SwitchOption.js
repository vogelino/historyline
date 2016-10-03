import React, { PropTypes } from 'react';
import { mapCssClasses } from '../../../utilities/styleUtils';
import Icon from '../Icon';
import styles from './Switch.css';

const SwitchOption = ({ index, iconId, activeIndex, className }) => (
	<div
		className={mapCssClasses({
			[styles.option]: true,
			[styles.active]: index === activeIndex,
			[className]: Boolean(className)
		})}
	>
		{iconId ? <Icon iconId={iconId} /> : null}
	</div>
);

SwitchOption.propTypes = {
	index: PropTypes.number.isRequired,
	iconId: PropTypes.string,
	activeIndex: PropTypes.number.isRequired,
	className: PropTypes.string
};

export default SwitchOption;
