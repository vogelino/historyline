import { combineReducers } from 'redux';
import visualization from './visualization/reducers/index';
import ui from './ui/reducers/index';
import filters from './filters/reducers/index';

export default combineReducers({
	visualization,
	ui,
	filters
});
