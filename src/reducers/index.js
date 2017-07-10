import {combineReducers} from 'redux';
import selectedBoxes from './selectedBoxes';

const obsTableApp = combineReducers({
    selectedBoxes
});

export default obsTableApp;