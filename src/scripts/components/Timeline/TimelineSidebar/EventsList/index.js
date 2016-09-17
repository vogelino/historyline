import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './EventsList.css';
import EventListItem from './EventListItem';

const EventList = ({ eventItems }) => (
	<ul className={styles.list}>
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
		{ id: 3, date: '25 april 2000', description: 'Vermont approves same-sex unions' },
		{ id: 4, date: '9 april 2000', description: 'Controversial Osprey plane crash kills 19 marines' },
		{ id: 5, date: '22 april 2000', description: 'Cuban boy Elián González reunited with father after federal raid of Miami relatives\' home' },
		{ id: 6, date: '25 april 2000', description: 'Vermont approves same-sex unions' },
		{ id: 7, date: '9 april 2000', description: 'Controversial Osprey plane crash kills 19 marines' },
		{ id: 8, date: '22 april 2000', description: 'Cuban boy Elián González reunited with father after federal raid of Miami relatives\' home' },
		{ id: 9, date: '25 april 2000', description: 'Vermont approves same-sex unions' },
		{ id: 10, date: '9 april 2000', description: 'Controversial Osprey plane crash kills 19 marines' },
		{ id: 11, date: '22 april 2000', description: 'Cuban boy Elián González reunited with father after federal raid of Miami relatives\' home' },
		{ id: 12, date: '25 april 2000', description: 'Vermont approves same-sex unions' },
		{ id: 13, date: '9 april 2000', description: 'Controversial Osprey plane crash kills 19 marines' },
		{ id: 14, date: '22 april 2000', description: 'Cuban boy Elián González reunited with father after federal raid of Miami relatives\' home' },
		{ id: 15, date: '25 april 2000', description: 'Vermont approves same-sex unions' }
	]
});
export default connect(mapStateToProps)(EventList);
