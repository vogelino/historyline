import * as ACTIONS from '../actions/actionTypes';

const initialState = {
	searchTerm: {
		inField: '',
		active: []
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
	case ACTIONS.SET_CHANGE_TERM:
		return { ...state, searchTerm: { ...state.searchTerm, inField: payload } };
	case ACTIONS.SUBMIT_SEARCH_TERM:
		return {
			...state,
			searchTerm: {
				...state.searchTerm,
				inField: '',
				active: [
					...state.searchTerm.active,
					{
						value: state.searchTerm.inField,
						id: payload
					}
				]
			}
		};
	case ACTIONS.REMOVE_SEARCH_TERM:
		return {
			...state,
			searchTerm: {
				...state.searchTerm,
				active: state.searchTerm.active.filter(({ id }) => id !== payload)
			}
		};
	default:
		return state;
	}
};
