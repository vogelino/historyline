import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filtersActions from '../../../../redux/filters/actionCreators';
import Icon from '../../../Uikit/Icon';
import styles from './SearchTerm.css';

const SearchTerm = ({
	id,
	children,
	removeSearchTerm
}) => (
	<div className={styles.root}>
		{children}
		<Icon
			className={styles.icon}
			iconId="cross"
			onClick={() => removeSearchTerm(id)}
		/>
	</div>
);

SearchTerm.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]).isRequired,
	removeSearchTerm: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => bindActionCreators(filtersActions, dispatch);

export default connect(null, mapDispatchToProps)(SearchTerm);
