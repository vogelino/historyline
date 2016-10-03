import React, { PropTypes } from 'react';
import styles from './SearchField.css';
import Icon from '../Icon';
import TextInput from '../TextInput';


const SearchField = ({ placeholder, className, onType, value, onSubmit }) => (
	<div className={className || styles.root}>
		<TextInput
			className={styles.input}
			placeholder={placeholder}
			onType={onType}
			value={value}
		/>
		<Icon
			className={styles.icon}
			iconId="search"
			onClick={() => onSubmit(value)}
		/>
	</div>
);

SearchField.defaultProps = {
	className: '',
	value: ''
};

SearchField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onType: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	className: PropTypes.string,
	value: PropTypes.string
};

export default SearchField;
