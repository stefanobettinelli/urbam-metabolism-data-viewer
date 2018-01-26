import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList';
import timeZone from './timeZone';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList,
    timeZone,
    form: formReducer,
});

export default rootReducer;