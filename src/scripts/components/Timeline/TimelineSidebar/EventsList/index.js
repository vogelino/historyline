import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';

const EventList = ({ eventItems }) => (
	<ul className="timeline-sidebar-events-list">
		{eventItems.map((eventItem) =>
			<EventListItem key={eventItem.id} {...eventItem} />)}
	</ul>
);

EventList.propTypes = {
	eventItems: PropTypes.array.isRequired
};

const mapStateToProps = () => ({
	eventItems: [
		{ id: 1, date: '9 april 2000', description: 'Controversial Osprey plane crash kills 19 marines' },
		{ id: 2, date: '22 april 2000', description: 'Cuban boy Elián González reunited with father after federal raid of Miami relatives\' home' },
		{ id: 3, date: '25 april 2000', description: 'Vermont approves same-sex unions' }
	]
});
export default connect(mapStateToProps)(EventList);
