import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';
import fetchedBoxList from './fetchedBoxList';
import fetchFilteredObservation from './fetchedFilteredObservation';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    selectedBoxes,
    fetchedBoxList,
    fetchFilteredObservation,
    form: formReducer
});

export default rootReducer;