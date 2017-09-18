import {BOX_SELECTED, RECEIVE_BOX_DATA, CLEAR_SELECTED_BOX_LIST, REQUEST_BOX_DATA} from '../actions';

const selectedBoxes = (state = {items: []}, action) => {
    switch (action.type) {

        case CLEAR_SELECTED_BOX_LIST:
            return {items: []};

        case BOX_SELECTED:
            // either a box has been added or removed from the list
            if (action.boxNameList.length > state.items.length) {
                // search for the new one ad add it
                let currentBoxNameList = state.items.map(box => box.boxName);
                let addedBoxName = action.boxNameList.filter(boxName => currentBoxNameList.indexOf(boxName) < 0)[0]; // it should be one element only
                let newItems = state.items.map(box => Object.assign({}, box));
                newItems.push({isFetching: false, boxName: String(addedBoxName), csv: null});
                return {items: newItems, newItemToRender: addedBoxName};
            } else {
                // filter the remaining
                return {
                    items: state.items.filter(box => (action.boxNameList.indexOf(box.boxName) >= 0)),
                    newItemToRender: null
                };
            }

        case REQUEST_BOX_DATA: {
            // reducers must always return new allocated state starting from the previous
            const newItems = state.items.map(item => {
                let newItem = {};
                // if it's already fetching do nothing and maintains its' value, else check if the box name match and assign it to true
                newItem.isFetching = !item.isFetching ? item.boxName === action.boxName : item.isFetching;
                //newItem.isFetching = true;
                newItem.boxName = item.boxName;
                newItem.csv = item.csv;
                return newItem;
            });
            return {items: [...newItems]};
        }

        case RECEIVE_BOX_DATA: {
            const newItems = state.items.map(item => {
                let newItem = {isFetching: item.isFetching, boxName: item.boxName, csv: item.csv};
                if (item.boxName === action.boxName) {
                    newItem.csv = action.csv;
                    newItem.isFetching = false;
                }
                return newItem;
            });
            return {items: [...newItems]};
        }

        default:
            return state;

    }
};

export default selectedBoxes;