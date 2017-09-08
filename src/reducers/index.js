import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList';
import boxDataReducer from "./boxDataReducer";
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList,
    boxDataReducer,
    form: formReducer
});

export default rootReducer;