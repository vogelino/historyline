import { combineReducers } from 'redux';
import visualization from './visualization';
import ui from './ui';

export default combineReducers({
	visualization,
	ui
});
