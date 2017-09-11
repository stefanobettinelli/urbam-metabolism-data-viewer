import {BOX_SELECTED, RECEIVE_BOX_DATA, CLEAR_SELECTED_BOX_LIST, REQUEST_BOX_DATA} from '../actions';

const selectedBoxes = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        case CLEAR_SELECTED_BOX_LIST:
            return {isFetching: false, items: []};
        case BOX_SELECTED:
            const remainingBoxNameList = state.items.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0)).map(boxObj => boxObj.boxName);
            const remainingState = state.items.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0));
            const newListDelta = action.boxNameList.filter(boxName => (remainingBoxNameList.indexOf(boxName) < 0)).map(boxName => (
                {
                    boxName: String(boxName),
                    csv: null
                }
            ));
            return {isFetching: false, items: [...remainingState, ...newListDelta]};
        case REQUEST_BOX_DATA: {
            return {isFetching: true, items: [...state.items]};
        }
        case RECEIVE_BOX_DATA: {
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].boxName === action.boxName) {
                    state.items[i].csv = action.csv;
                }
            }
            return {isFetching: false, items: [...state.items]};
        }
        default:
            return state;
    }
};

export default selectedBoxes;