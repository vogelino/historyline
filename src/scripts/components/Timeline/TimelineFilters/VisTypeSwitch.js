import React from 'react';
import Switch from '../../Uikit/Switch';

const VisTypeSwitch = () => (
	<div className="vis-type-switch">
		<Switch
			activeIndex={0}
			option1Icon="clock"
			option2Icon="map"
		/>
	</div>
);

export default VisTypeSwitch;
