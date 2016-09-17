import React from 'react';
import '../../resources/css/global.css';
import '../../resources/css/fonts.css';
import styles from './App.css';
import Timeline from './Timeline';
import Header from './Header';

export default () => (
	<div className={styles.App}>
		<Header />
		<Timeline />
	</div>
);
