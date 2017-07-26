import {BOX_SELECTED, UPDATE_DATA_FOR_A_BOX, CLEAR_SELECTED_BOX_LIST} from '../actions';

const selectedBoxes = (state = [], action) => {
    switch (action.type) {
        case CLEAR_SELECTED_BOX_LIST:
            return [];
        case BOX_SELECTED:
            const remainingBoxNameList = state.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0)).map(boxObj => boxObj.boxName);
            const remainingState = state.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0));
            const newListDelta = action.boxNameList.filter(boxName => (remainingBoxNameList.indexOf(boxName) < 0)).map(boxName => (
                {
                    boxName: String(boxName),
                    csv: null
                }
            ));
            return [...remainingState, ...newListDelta];
        case UPDATE_DATA_FOR_A_BOX: {
            for (let i = 0; i < state.length; i++) {
                if (state[i].boxName === action.boxName) {
                    state[i].csv = action.csv;
                }
            }
            return [...state];
        }
        default:
            return state;
    }
};

export default selectedBoxes;