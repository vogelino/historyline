import React, { PropTypes } from 'react';
import styles from './TextInput.css';

const ENTER_KEYCODE = 13;

const SearchField = ({ placeholder, value, className, onType, onSubmit }) => (
	<input
		type="text"
		className={className || styles.input}
		placeholder={placeholder}
		value={value}
		onKeyUp={(evt) => {
			if (String(evt.keyCode || evt.which) === String(ENTER_KEYCODE)) {
				onSubmit(evt.target.value);
			}
		}}
		onChange={(evt) => onType(evt.target.value)}
	/>
);

SearchField.defaultProps = {
	value: '',
	className: ''
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onType: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	className: PropTypes.string
};

export default SearchField;
