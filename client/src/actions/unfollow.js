export const unfollowAction = (userID,id) => {
    return dispatch => fetch(`/vacations/unfollow/${userID}/${id}`).then(response => response.json()).then(data => {
            return dispatch({
                type: 'UNFOLLOW',
                payload: data
            });
        });
}