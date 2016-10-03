import * as ACTIONS from '../actions/actionTypes';

const initialState = {
	leftSidebar: {
		open: true
	}
};

export default (state = initialState, { type }) => {
	switch (type) {
	case ACTIONS.TOGGLE_LEFT_SIDEBAR:
		return {
			...state,
			leftSidebar: {
				...state.leftSidebar,
				open: !state.leftSidebar.open
			}
		};
	default:
		return state;
	}
};
