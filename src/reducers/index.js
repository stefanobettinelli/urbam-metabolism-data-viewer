import {combineReducers} from 'redux';
import {FETCH_BOX_LIST_SUCCESS} from '../actions';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList'

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList
});

export default rootReducer;