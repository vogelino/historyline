import React, { PropTypes } from 'react';
import styles from './Icon.css';
import icons from './iconsConstants.js';
import { mapCssClasses } from '../../../utilities/styleUtils';

const Icon = ({ width, height, iconId, className, ...rest }) => (
	<svg
		className={mapCssClasses({
			[className]: Boolean(className),
			[styles.icon]: true
		})}
		{...{ ...rest, width, height }}
	>
		<use xlinkHref={icons[iconId]} />
	</svg>
);

Icon.defaultProps = {
	width: 16,
	height: 16
};

Icon.propTypes = {
	iconId: PropTypes.string.isRequired,
	className: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number
};

export default Icon;
