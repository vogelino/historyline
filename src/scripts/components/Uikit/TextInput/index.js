import React, { PropTypes } from 'react';

const SearchField = ({ placeholder, value }) => (
	<input
		type="text"
		className="text-input"
		placeholder={placeholder}
		value={value}
	/>
);

SearchField.defaultProps = {
	value: ''
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string
};

export default SearchField;
