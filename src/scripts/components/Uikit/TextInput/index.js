import React, { PropTypes } from 'react';
import styles from './TextInput.css';

const SearchField = ({ placeholder, value, className }) => (
	<input
		type="text"
		className={className || styles.input}
		placeholder={placeholder}
		value={value}
	/>
);

SearchField.defaultProps = {
	value: '',
	className: ''
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	className: PropTypes.string
};

export default SearchField;
