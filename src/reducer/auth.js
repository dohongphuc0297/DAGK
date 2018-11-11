import * as types from "../actions/types";

const INITIAL_STATE = {
    auth: null,
    messages: [],
    users: [],
    curChat: null
};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch (action.type) {
        case types.ADD_CURCHAT:
            return {
                ...state,
                curChat: action.payload
            };
        case types.ADD_MESSAGES:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        case types.LOGIN:
            //console.log(action);
            return {
                ...state,
                auth: action.payload
            };
        case types.LOGOUT:
            return INITIAL_STATE;
        case types.STAR_USER:
            return state;
        default:
            return state;
    }
};
