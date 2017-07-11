import {BOX_SELECTED} from '../actions';

const selectedBoxes = (state = [], action) => {
    switch (action.type) {
        case BOX_SELECTED:
            return [...action.boxNameList];
        default:
            return state;
    }
};

export default selectedBoxes;