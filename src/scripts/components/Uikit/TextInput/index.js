import React, { PropTypes } from 'react';
import styles from './TextInput.css';

const ENTER_KEYCODE = 13;

const TextInput = ({
	placeholder,
	value,
	className,
	onType,
	onSubmit
}) => (
	<input
		type="text"
		className={className || styles.input}
		onKeyUp={(evt) => {
			if (String(evt.keyCode || evt.which) === String(ENTER_KEYCODE)) {
				onSubmit(evt.target.value);
			}
		}}
		onChange={(evt) => onType(evt.target.value)}
		{...{ value, placeholder }}
	/>
);

TextInput.defaultProps = {
	value: '',
	className: ''
};

TextInput.propTypes = {
	placeholder: PropTypes.string,
	onType: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	className: PropTypes.string
};

export default TextInput;
