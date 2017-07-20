import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList,
    form: formReducer
});

export default rootReducer;