import * as ACTIONS from '../actions/actionTypes';

const initialState = {
	type: 'timeline'
};

const visualizationReducer = (state = initialState, { type, payload }) => {
	switch (type) {
	case ACTIONS.SWITCH_VISUALIZATION_TYPE:
		return {
			...state,
			type: state.type === 'map' ? 'timeline' : 'map'
		};
	default:
		return state;
	}
};

export default visualizationReducer;
