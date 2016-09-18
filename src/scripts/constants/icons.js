import camelCase from 'lodash.camelcase';

const svgIcons = require.context('../../resources/icons', false, /.*\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);

export default requireAll(svgIcons)
	.reduce(
		(state, icon) => {
			const iconName = /.*\/(.*)\.svg$/.exec(icon)[1];
			return (Object.assign({}, state, { [camelCase(iconName)]: iconName }));
		},
		{}
	);
