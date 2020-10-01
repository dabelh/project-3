const vacations = (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_CATIONS':
            const { payload } = action;
            return {
                vacations: payload
            }
        default:
            return state;
    }
}

const defaultState = {
    vacations:[],
};

export default vacations;