import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList'

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList
});

export default rootReducer;