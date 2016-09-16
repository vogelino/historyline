import React from 'react';
import SearchField from '../../Uikit/SearchField';
import EventsList from './EventsList';

export default () => (
	<div className="timeline-sidebar-root">
		timeline-sidebar-root
		<SearchField placeholder="Search something" />
		<EventsList />
	</div>
);
