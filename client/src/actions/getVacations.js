export const getVacationStats = () => {
    return dispatch => fetch(`/vacations/stats`).then(response => response.json()).then(data => {
            return dispatch({
                type: 'GET_STATS',
                payload: data
            });
        });
}
