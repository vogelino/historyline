import React, { PropTypes } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import styles from './EventsList.css';
import EventListItem from './EventListItem';

const EventList = ({ eventItems }) => (
	<ul className={styles.list}>
		{eventItems.map((eventItem) =>
			<EventListItem key={uuid.v4()} {...eventItem} />)}
	</ul>
);

EventList.propTypes = {
	eventItems: PropTypes.array.isRequired
};

const mapStateToProps = ({ events }) => ({
	eventItems: events.list
});
export default connect(mapStateToProps)(EventList);
