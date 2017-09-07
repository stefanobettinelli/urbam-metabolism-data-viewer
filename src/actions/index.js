export const FETCH_BOX_LIST_SUCCESS = 'FETCH_BOX_LIST_SUCCESS';
export const UPDATE_DATA_FOR_A_BOX = 'UPDATE_DATA_FOR_A_BOX';
export const BOX_SELECTED = 'BOX_SELECTED';
export const CLEAR_SELECTED_BOX_LIST = 'CLEAR_SELECTED_BOX_LIST';

export const fetchBoxListSuccess = (json) => {
    return {
        type: FETCH_BOX_LIST_SUCCESS,
        boxList: json._embedded.obssys,
        receivedAt: Date.now()
    }
};

export const fetchFilteredObservationSuccess = (csv, boxName) => {
    return {
        type: UPDATE_DATA_FOR_A_BOX,
        boxName,
        csv,
        receivedAt: Date.now()
    }
};

//helper func. that fetches the data and if no errors occurs performs the dispatch of the POJO to the central store
export const fetchFilteredObservation = (url, boxName) => {
    return (dispatch) => {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.text())
            .then(csv => dispatch(fetchFilteredObservationSuccess(csv, boxName)))
            .catch(() => console.log("Error while fetching observations"));
    };
};

export const fetchBoxList = (url) => {
    return (dispatch) => {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(json => dispatch(fetchBoxListSuccess(json)))
            .catch(() => console.log("Error while fetching box list"));
    };
};

export const boxSelected = (boxNameList) => {
    return {
        type: BOX_SELECTED,
        boxNameList,
        receivedAt: Date.now()
    };
};

export const clearSelectedBoxList = () => {
    return {
        type: CLEAR_SELECTED_BOX_LIST
    };
};