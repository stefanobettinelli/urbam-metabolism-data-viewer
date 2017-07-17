export const FETCH_BOX_LIST_SUCCESS = 'FETCH_BOX_LIST_SUCCESS';
export const FETCH_FILTERED_OBSERVATION = 'FETCH_FILTERED_OBSERVATION';
export const BOX_SELECTED = 'BOX_SELECTED';

export const fetchBoxListSuccess = (json) => {
    return {
        type: FETCH_BOX_LIST_SUCCESS,
        boxList: json._embedded.obssys,
        receivedAt: Date.now()
    }
};

export const fetchFilteredObservationSuccess = (csv, boxName) => {
    return {
        type: FETCH_FILTERED_OBSERVATION,
        boxName,
        csv,
        receivedAt: Date.now()
    }
};

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