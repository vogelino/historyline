import React, { PropTypes } from 'react';

const EventListItem = ({
	id,
	date,
	description
}) => (
	<li id={id} className="event-list-item">
		<strong>{date}</strong>
		<p>{description}</p>
	</li>
);

EventListItem.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default EventListItem;
