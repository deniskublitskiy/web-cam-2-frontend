import { apiUrl } from '../config';
import delay from '../utils/delay-promise/index'

export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const SEARCH_CONTACTS_REQUEST = 'SEARCH_CONTACTS_REQUEST';
export const SEARCH_CONTACTS_SUCCESS = 'SEARCH_CONTACTS_SUCCESS';
export const SEARCH_CONTACTS_FAILURE = 'SEARCH_CONTACTS_FAILURE';
export const ADD_CONTACT_REQUEST_SUCCESS = 'ADD_CONTACT_REQUEST_SUCCESS';

export const setSearchText = searchText => ({
    type: SET_SEARCH_TEXT,
    searchText
});

export const searchContacts = searchText => async dispatch => {
    dispatch({type: SEARCH_CONTACTS_REQUEST});
    dispatch(setSearchText(searchText));

    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    let [firstName = '', lastName = ''] = searchText.split(/\s+/).map(encodeURIComponent);
    let url = `${apiUrl}/users?firstName=${firstName}%&lastName=${lastName}%`;
    let request = new Request(url, {headers});

    try {
        await delay(2000);
        let response = await fetch(request);
        let data = await response.json();
        dispatch(response.ok
            ? searchContactsSuccess(data)
            : searchContactsFailure(response, data)
        );
    } catch (e) {
        console.error(e.message || e);
    }
};

export const fetchContacts = () => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));

    let userId = localStorage.getItem('user.id');
    let request = new Request(`${apiUrl}/users/${userId}/contacts`, {headers});

    try {
        let response = await fetch(request);
        let data = await response.json();
        dispatch(response.ok
            ? loadContactsSuccess(data)
            : loadContactsFailure(response, data)
        );
    } catch (e) {
        console.error(e.message || e);
    }
};

const loadContactsFailure = (response, data) => {
    return {
        type: FETCH_CONTACTS_FAILURE,
        response,
        data
    }
};

const loadContactsSuccess = contacts => ({
    type: FETCH_CONTACTS_SUCCESS,
    contacts
});

const searchContactsFailure = (response, data) => {
    return {
        type: SEARCH_CONTACTS_FAILURE,
        response,
        data
    }
};

const searchContactsSuccess = data => ({
    type: SEARCH_CONTACTS_SUCCESS,
    contacts: data.contacts,
    allContactsCount: data.count
});

export const addContactRequestSuccess = contact => ({
    type: ADD_CONTACT_REQUEST_SUCCESS,
    contact
});

export const contactRequest = id => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('content-type', 'application/json');
    let userId = localStorage.getItem('user.id');
    let request = new Request(`${apiUrl}/users/${userId}/contacts`, {
        headers,
        method: 'POST',
        body: JSON.stringify({id})
    });

    try {
        let response = await fetch(request);
        let contact = await response.json();
        if (response.ok) {
            dispatch(addContactRequestSuccess(contact));
        }
    } catch (e) {
        console.error(e.message || e);
    }
};