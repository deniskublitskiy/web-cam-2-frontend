import { apiUrl } from '../config';
export const USER_CHANGED = 'USER_CHANGED';

export const changeUser = user => async dispatch => {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('authorization', localStorage.getItem('token'));

    let request = new Request(`${apiUrl}/users/${user.id}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(user)
    });
    try {
        let response = await fetch(request);
        let user = await response.json();
        if (response.ok) {
            dispatch({
                type: USER_CHANGED,
                user
            });
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
};

export const fetchUser = userId => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    let request = new Request(`${apiUrl}/users/${userId}`, {
        headers
    });
    try {
        let response = await fetch(request);
        let user = await response.json();
        if (response.ok) {
            dispatch({
                type: USER_CHANGED,
                user
            });
        } else {
            throw (response.statusText)
        }

    } catch(e) {
        console.error(e);
        throw e;
    }
};