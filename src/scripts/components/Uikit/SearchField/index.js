import React, { PropTypes } from 'react';
import Icon from '../Icon';
import TextInput from '../TextInput';

const SearchField = ({ placeholder }) => (
	<div className="search-field">
		<TextInput placeholder={placeholder} />
		<Icon iconId="loup" />
	</div>
);

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired
};

export default SearchField;
