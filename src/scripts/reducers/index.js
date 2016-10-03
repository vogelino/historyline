import { combineReducers } from 'redux';
import visualization from './visualization';
import ui from './ui';
import filters from './filters';

export default combineReducers({
	visualization,
	ui,
	filters
});
