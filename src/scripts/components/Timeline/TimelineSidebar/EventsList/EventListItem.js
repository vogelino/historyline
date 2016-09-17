import React, { PropTypes } from 'react';
import styles from './EventsList.css';

const EventListItem = ({
	id,
	date,
	description
}) => (
	<li id={id} className={styles.item}>
		<span className={styles.dot} />
		<strong className={styles.date}>{date}</strong>
		<p>{description}</p>
	</li>
);

EventListItem.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default EventListItem;
