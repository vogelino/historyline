const svgIcons = require.context('../../../../resources/icons', false, /.*\.svg$/);

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

/* eslint-disable global-require */
export default requireAll(svgIcons)
	.reduce((state, icon) => {
		const regexFindName = /.*\/(.*)_.*$/g;
		const iconName = regexFindName.exec(icon)[1];
		return Object.assign({}, state, { [iconName]: icon });
	}, {});
