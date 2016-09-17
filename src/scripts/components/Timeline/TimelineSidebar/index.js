import React from 'react';
import styles from './TimelineSidebar.css';
import SearchField from '../../Uikit/SearchField';
import EventsList from './EventsList';

export default () => (
	<div className={styles.root}>
		<div className={styles.searchField}>
			<SearchField placeholder="Search something" />
		</div>
		<EventsList />
	</div>
);
