export const asyncActionFetchCations = () => {
    return dispatch => fetch(`/vacations`).then(response => response.json()).then(data => {
         console.log(data);
            return dispatch({
                type: 'FETCH_CATIONS',
                payload: data
            });
        });
}
