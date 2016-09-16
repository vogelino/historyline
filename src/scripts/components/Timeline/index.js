import React from 'react';
import TimelineSidebar from './TimelineSidebar';
import TimelineFilters from './TimelineFilters';
import TimelineTimeSelection from './TimelineTimeSelection';
import TimelineEvents from './TimelineEvents';

export default () => (
	<div className="timeline-root">
		<TimelineSidebar />
		<TimelineFilters />
		<TimelineTimeSelection />
		<TimelineEvents />
	</div>
);
