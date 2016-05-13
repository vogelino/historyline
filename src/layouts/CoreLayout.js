import React from 'react';
import MetaTags from '../seo/MetaTags';

export default (props) => {
	const { children } = props;
	return (
		<div id="core-layout">
			<MetaTags />
			{children}
		</div>
	);
}
