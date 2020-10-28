const vacations = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_CATIONS':
            const { payload } = action;
            return {
                vacations:payload,
                userID:state.userID,
                isAdmin:state.isAdmin,
                statistics:state.statistics
            }
        case 'USER_ACTION':
            return{
                vacations:state.vacations,
                userID:action.payload.id,
                isAdmin:action.payload.isAdmin,
                statistics:state.statistics
            }
        case 'GET_STATS':
            return{
                vacations:state.vacations,
                userID:state.userID,
                isAdmin:state.isAdmin,
                statistics:action.payload
            }
        case 'UNFOLLOW':
            return state;
           
        default:
            return state;
    }
}

const defaultState = {
    vacations:[],
    userID:null,
    isAdmin:0,
    statistics:[]
};

export default vacations;

