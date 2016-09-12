import * as ACTIONS from './actionTypes';

export const showExample = (example) => ({
	type: ACTIONS.EXAMPLE_TYPE,
	example
});

export default showExample;
