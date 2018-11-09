import { ADD_CURCHAT, LOGIN, LOGOUT, ADD_MESSAGES } from "../actions/types";

const INITIAL_STATE = {
    auth: null,
    messages: [],
    users: [],
    curChat: null,
    page: 1
};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch (action.type) {
        case ADD_CURCHAT:
            return {
                ...state,
                curChat: action.payload
            };
        case ADD_MESSAGES:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        case LOGIN:
            //console.log(action);
            return {
                ...state,
                auth: action.payload
            };
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
