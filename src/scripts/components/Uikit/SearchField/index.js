/* global document */
/* global window */
import React, { PropTypes } from 'react';
import styles from './SearchField.css';
import Icon from '../Icon';
import TextInput from '../TextInput';
import AnimatedGradientText from './AnimatedGradientText';

let animationTimeout;
const submitValue = (value, handler) => {
	if (value) {
		handler(value);
		return;
	}

	if (animationTimeout) {
		clearTimeout(animationTimeout);
	}

	const placeholderEl = document.getElementsByClassName(styles.placeholder)[0];
	placeholderEl.classList.remove('notanimated');
	placeholderEl.classList.add('animated');

	animationTimeout = setTimeout(() => {
		placeholderEl.classList.add('notanimated');
		placeholderEl.classList.remove('animated');
	}, 1300);
};

const SearchField = ({
	placeholder,
	className,
	onType,
	value,
	onSubmit
}) => (
	<div className={className || styles.root}>
		{value ? null :
			(<AnimatedGradientText className={styles.placeholder}>
				{placeholder}
			</AnimatedGradientText>)}
		<TextInput
			className={styles.input}
			{...{ onType, value, onSubmit }}
		/>
		<Icon
			className={styles.icon}
			iconId="search"
			onClick={() => submitValue(value, onSubmit)}
		/>
	</div>
);

SearchField.defaultProps = {
	className: '',
	value: '',
	onFocus: () => {},
	onBlur: () => {},
	isFocused: false
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onType: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	className: PropTypes.string,
	value: PropTypes.string
};

export default SearchField;
