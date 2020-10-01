export const asyncActionFetchCations = () => {
    return dispatch => fetch(`/vacations`).then(response => response.json()).then(data => {
            return dispatch({
                type: 'FETCH_CATIONS',
                payload: data
            });
        });
}
