const selectedBoxes = (state = [], action) => {
    switch (action.type) {
        case 'BOX_SELECTED':
            return [
                ...state,
                {
                    boxName: action.boxName
                }
            ];
        default:
            return state;
    }
};

export default selectedBoxes;