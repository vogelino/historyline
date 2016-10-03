import uuid from 'uuid';
import * as ACTIONS from './actionTypes';

export const setSearchTerm = (term) => ({
	type: ACTIONS.SET_CHANGE_TERM,
	payload: term
});

export const submitSearchTerm = () => ({
	type: ACTIONS.SUBMIT_SEARCH_TERM,
	payload: uuid.v4()
});

export const removeSearchTerm = (id) => ({
	type: ACTIONS.REMOVE_SEARCH_TERM,
	payload: id
});

export default {
	setSearchTerm
};
