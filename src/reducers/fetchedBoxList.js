import {FETCH_BOX_LIST_SUCCESS} from '../actions';

const fetchedBoxList = (state = [], action) => {
    switch (action.type) {
        case FETCH_BOX_LIST_SUCCESS:
            return action.boxList;
        default:
            return state;
    }
};

export default fetchedBoxList;