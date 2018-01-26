export const FETCH_BOX_LIST_SUCCESS = 'FETCH_BOX_LIST_SUCCESS';
export const fetchBoxListSuccess = (json) => {
    return {
        type: FETCH_BOX_LIST_SUCCESS,
        boxList: json._embedded.obssys,
        receivedAt: Date.now()
    }
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

export const REQUEST_BOX_DATA = "REQUEST_BOX_DATA";
export const requestBoxData = (boxName) => {
    return {
        type: REQUEST_BOX_DATA,
        boxName
    }
};

export const RECEIVE_BOX_DATA = 'RECEIVE_BOX_DATA';
export const receiveBoxData = (csv, boxName) => {
    return {
        type: RECEIVE_BOX_DATA,
        boxName,
        csv,
        receivedAt: Date.now()
    }
};


export const fetchBoxData = (url, boxName) => {
    return (dispatch) => {
        dispatch(requestBoxData(boxName));
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.text())
            .then(csv => dispatch(receiveBoxData(csv, boxName)))
            .catch(() => console.log("Error while fetching observations"));
    };
};

export const BOX_SELECTED = 'BOX_SELECTED';

export const boxSelected = (boxNameList) => {
    return {
        type: BOX_SELECTED,
        boxNameList,
        receivedAt: Date.now()
    };
};

export const CLEAR_SELECTED_BOX_LIST = 'CLEAR_SELECTED_BOX_LIST';
export const clearSelectedBoxList = () => {
    return {
        type: CLEAR_SELECTED_BOX_LIST
    };
};

export const TIME_ZONE_CHANGED = 'TIME_ZONE_CHANGED';
export const timeZoneChanged = (timeZone) => {
    console.log(timeZone);
    return {
      type: TIME_ZONE_CHANGED,
      timeZone
    };
};