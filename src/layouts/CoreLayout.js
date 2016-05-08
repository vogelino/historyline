import React from 'react';
import MetaTags from '../seo/MetaTags';

export default (props) => {
	const { children } = this.props;
	return (
		<div id="core-layout">
			<MetaTags />
			<div className='view-container'>
				<Navigation />
				{children}
				<Footer />
			</div>
		</div>
	);
}
