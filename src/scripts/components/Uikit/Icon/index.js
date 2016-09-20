import React, { PropTypes } from 'react';
import styles from './Icon.css';

const Icon = ({ width, height, iconId, className }) => (
	<svg className={className || styles.icon} width={width} height={height}>
		<use xlinkHref={iconId} />
	</svg>
);

Icon.defaultProps = {
	width: 16,
	height: 16,
	className: ''
};

Icon.propTypes = {
	iconId: PropTypes.string.isRequired,
	className: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number
};

export default Icon;