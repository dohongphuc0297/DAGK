import { FETCH_USER, LOGIN, LOGOUT } from "../actions/types";

export default (state = {}, action) => {
    //console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.user;
        case LOGIN:
            //console.log(action);
            return {
                user: action.user
            };
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
