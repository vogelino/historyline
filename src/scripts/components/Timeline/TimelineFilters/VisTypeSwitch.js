import React from 'react';
import Switch from '../../Uikit/Switch';
import icons from '../../../constants/icons';

const VisTypeSwitch = () => (
	<div className="vis-type-switch">
		<Switch
			activeIndex={0}
			option1Icon={icons.clock}
			option2Icon={icons.map}
		/>
	</div>
);

export default VisTypeSwitch;
