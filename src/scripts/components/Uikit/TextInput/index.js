import React, { PropTypes } from 'react';
import styles from './TextInput.css';

const SearchField = ({ placeholder, value, className, onType }) => (
	<input
		type="text"
		className={className || styles.input}
		placeholder={placeholder}
		value={value}
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
	value: PropTypes.string,
	className: PropTypes.string
};

export default SearchField;
