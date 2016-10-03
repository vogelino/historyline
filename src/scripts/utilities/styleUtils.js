export const mapCssClasses = (cssClassesMap) =>
	Object.keys(cssClassesMap).reduce(
		(classesString, className) => // eslint-disable-line
			!cssClassesMap[className] ?
				classesString : `${classesString} ${className}`,
		''
	);

export default {
	mapCssClasses
};
