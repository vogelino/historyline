import React from 'react';
import styles from './Header.css';

export default () => (
	<div className={styles.root}>
		<h1 className={styles.logo}>
			History<span className={styles.logoLine}>line</span>
		</h1>
	</div>
);
