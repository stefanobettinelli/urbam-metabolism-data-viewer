import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList';
import fetchedFilteredObservation from './fetchedFilteredObservation';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList,
    fetchedFilteredObservation,
    form: formReducer
});

export default rootReducer;