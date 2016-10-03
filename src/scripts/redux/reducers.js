import { combineReducers } from 'redux';
import visualization from './visualization/reducers/index';
import ui from './ui/reducers/index';
import filters from './filters/reducers/index';
import events from './events/reducers/index';

export default combineReducers({
	visualization,
	ui,
	filters,
	events
});
