export const FETCH_BOX_LIST_SUCCESS = 'FETCH_BOX_LIST_SUCCESS';
export const BOX_SELECTED = 'BOX_SELECTED';

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

// export const boxSelected = () => {
//     ...
// };