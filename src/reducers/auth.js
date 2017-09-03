import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS
} from '../actions/auth';

const initialState = {
    isLoggedIn: false,
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                token: action.responseData.token
            };

        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };

        default:
            return state;
    }
};