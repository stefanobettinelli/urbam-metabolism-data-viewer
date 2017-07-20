import {BOX_SELECTED, UPDATE_DATA_FOR_A_BOX} from '../actions';

const selectedBoxes = (state = [], action) => {
    switch (action.type) {
        case BOX_SELECTED:
            const remainingBoxNameList = state.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0)).map(boxObj => boxObj.boxName);
            const remainingState = state.filter(boxObj => (action.boxNameList.indexOf(boxObj.boxName) >= 0));
            const newListdelta = action.boxNameList.filter(boxName => (remainingBoxNameList.indexOf(boxName) < 0)).map(boxName => (
                {
                    boxName: String(boxName),
                    data: null
                }
            ));
            return [...remainingState, ...newListdelta];
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