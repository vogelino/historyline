import React from 'react';
import Switch from '../../Uikit/Switch';
import icons from '../../../constants/icons';

const VisTypeSwitch = () => (
	<div className="vis-type-switch">
		<Switch
			activeIndex={0}
			option1Icon={icons.CLOCK}
			option2Icon={icons.MAP}
		/>
	</div>
);

export default VisTypeSwitch;
