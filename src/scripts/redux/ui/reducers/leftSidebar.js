import * as ACTIONS from '../actionTypes';

export const initialState = {
	open: true
};

export default (state = initialState, { type }) => {
	switch (type) {

	case ACTIONS.TOGGLE_LEFT_SIDEBAR:
		return { ...state.leftSidebar, open: !state.open };

	default: return state;

	}
};
