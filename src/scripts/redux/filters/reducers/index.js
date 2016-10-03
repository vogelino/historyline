import * as ACTIONS from '../actionTypes';
import searchTermReducer, { initialState as searchTermInitialState } from './searchTerm';

export const initialState = {
	searchTerm: searchTermInitialState
};

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case ACTIONS.SET_CHANGE_TERM:
	case ACTIONS.SUBMIT_SEARCH_TERM:
	case ACTIONS.REMOVE_SEARCH_TERM:
		return { ...state, searchTerm: searchTermReducer(state.searchTerm, { type, payload }) };

	default: return state;

	}
};
