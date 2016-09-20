import React, { PropTypes } from 'react';
import styles from './SearchField.css';
import Icon from '../Icon';
import TextInput from '../TextInput';


const SearchField = ({ placeholder, className }) => (
	<div className={className || styles.root}>
		<TextInput className={styles.input} placeholder={placeholder} />
		<Icon className={styles.icon} iconId="search" />
	</div>
);

SearchField.defaultProps = {
	className: ''
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default SearchField;
