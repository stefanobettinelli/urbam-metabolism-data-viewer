import {RECEIVE_BOX_DATA, REQUEST_BOX_DATA} from '../actions';

const boxDataReducer = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
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

export default boxDataReducer;