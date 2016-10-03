import * as ACTIONS from '../actionTypes';

export const initialState = {
	inField: '',
	active: []
};

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case ACTIONS.SET_CHANGE_TERM:
		return { ...state, inField: payload };

	case ACTIONS.SUBMIT_SEARCH_TERM:
		return { ...state, inField: '', active: [...state.active, { value: state.inField, id: payload }] };

	case ACTIONS.REMOVE_SEARCH_TERM:
		return { ...state, active: state.active.filter(({ id }) => id !== payload) };

	default: return state;

	}
};
