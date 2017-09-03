import { authUrl } from '../config';
import delay from '../utils/delay-promise/index'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Object.defineProperty(Request.prototype, 'success', {
//     get: function success() {
//         const successStatuses = {
//             200: 'OK',
//             201: 'Created',
//             202: 'Accepted',
//             204: 'No content'
//         };
//
//         return Object.keys(successStatuses).includes(this.status);
//     }
// });

const AUTH_TYPES = {
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
};

export const authRequest = (authType, credentials) => async dispatch => {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let request = new Request(`${authUrl}/${authType.toLowerCase()}`, {
        headers,
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    dispatch({type: authType === AUTH_TYPES.SIGNUP ? SIGNUP_REQUEST : LOGIN_REQUEST});
    try {
        let response = await fetch(request);
        let responseData = await response.json();
        await delay(2000);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user.id', responseData.data.id);
        dispatch(response.ok
            ? {type: authType === AUTH_TYPES.SIGNUP ? SIGNUP_SUCCESS : LOGIN_SUCCESS, responseData}
            : {type: authType === AUTH_TYPES.SIGNUP ? SIGNUP_FAILURE: LOGIN_FAILURE, error: responseData.message || responseData}
        )
    } catch (e) {
        console.error(e);
        dispatch({type: SIGNUP_FAILURE, error: e.message || e});
        throw e;
    }
};

export const loginRequest = (...args) => authRequest(AUTH_TYPES.LOGIN, ...args);
export const signUpRequest = (...args) => authRequest(AUTH_TYPES.SIGNUP, ...args);