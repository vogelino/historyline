import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './EventsList.css';

const EventListItem = ({
	date,
	description
}) => (
	<li className={styles.item}>
		<span className={styles.dot} />
		<strong className={styles.date}>{moment(date, 'YYYY/MM/DD').format('MMMM Do YYYY')}</strong>
		<p className={styles.description}>{description}</p>
	</li>
);

EventListItem.propTypes = {
	date: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default EventListItem;
