import {FETCH_FILTERED_OBSERVATION} from '../actions';

const fetchedFilteredObservation = (state = {}, action) => {
    switch (action.type) {
        case FETCH_FILTERED_OBSERVATION:
            const newState = {...state};
            newState[action.boxName] = action.csv;
            return newState;
        default:
            return state;
    }
};

export default fetchedFilteredObservation;