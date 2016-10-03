import * as ACTIONS from '../actionTypes';

const initialState = {
	type: 'timeline'
};
const VIS_TYPE_MAP = { map: 'timeline', timeline: 'map' };

const visualizationReducer = (state = initialState, { type }) => {
	switch (type) {
	case ACTIONS.SWITCH_VISUALIZATION_TYPE:
		return { ...state, type: VIS_TYPE_MAP[state.type] };
	default:
		return state;
	}
};

export default visualizationReducer;
