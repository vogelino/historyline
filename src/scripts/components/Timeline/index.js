import React from 'react';
import styles from './Timeline.css';
import TimelineSidebar from './TimelineSidebar';
import TimelineFilters from './TimelineFilters';
import TimelineTimeSelection from './TimelineTimeSelection';
import TimelineEvents from './TimelineEvents';

export default () => (
	<div className={styles.root}>
		<TimelineSidebar />
		<TimelineFilters />
		<TimelineTimeSelection />
		<TimelineEvents />
	</div>
);
