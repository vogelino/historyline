import * as ACTIONS from '../actionTypes';
import leftSidebarReducer, { initialState as leftSidebarInitialState } from './leftSidebar';

const initialState = {
	leftSidebar: leftSidebarInitialState
};

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case ACTIONS.TOGGLE_LEFT_SIDEBAR:
		return { ...state, leftSidebar: leftSidebarReducer(state.leftSidebar, { type, payload }) };

	default: return state;

	}
};
