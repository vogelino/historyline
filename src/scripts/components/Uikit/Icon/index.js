import React, { PropTypes } from 'react';

// TODO: Replace with svg icon
const Icon = ({ iconId }) => (
	<div className={`tIcon tIcon-${iconId}`}>
		{iconId}
	</div>
);

Icon.propTypes = {
	iconId: PropTypes.string.isRequired
};

export default Icon;
