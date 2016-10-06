import React, { PropTypes } from 'react';
import uuid from 'uuid';
import styles from './AnimatedGradientText.css';

const AnimatedGradientText = ({
	className,
	children
}) => {
	const patternId = uuid.v4();
	const gradientId = uuid.v4();
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={`${styles.root} ${className}`}
		>
			<text
				className={styles.text}
				fill={`url(#${patternId})`}
				dy="0.4em"
				x="20px"
				y="50%"
				textAnchor="start"
			>
				{children}
			</text>

			<defs>
				<linearGradient id={gradientId}>
					<stop offset="0%" stopColor="#435c73" />
					<stop offset="33%" stopColor="#435c73" />
					<stop offset="50%" stopColor="#64C48C" />
					<stop offset="66%" stopColor="#435c73" />
					<stop offset="100%" stopColor="#435c73" />
				</linearGradient>
				<pattern
					id={patternId}
					className={styles.pattern}
					x="0"
					y="0"
					width="300%"
					height="100%"
					patternUnits="userSpaceOnUse"
				>
					<rect
						className={styles.gradient}
						fill={`url(#${gradientId})`}
					/>
				</pattern>
			</defs>
		</svg>
	);
};

AnimatedGradientText.defaultProps = {
	className: ''
};

AnimatedGradientText.propTypes = {
	children: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default AnimatedGradientText;
