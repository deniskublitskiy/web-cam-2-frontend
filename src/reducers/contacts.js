import {
    amber500,
    blue500,
    brown500,
    cyan500,
    deepOrange500,
    deepPurple500,
    green500,
    grey500,
    indigo500,
    lightGreen500,
    orange500,
    pink500,
    purple500,
    red500,
    yellow500
} from 'material-ui/styles/colors';

import {
    ADD_CONTACT_REQUEST_SUCCESS,
    FETCH_CONTACTS_SUCCESS,
    SEARCH_CONTACTS_REQUEST,
    SEARCH_CONTACTS_SUCCESS,
    SET_SEARCH_TEXT
} from '../actions/contacts';

import { differenceWith } from 'lodash';

const initialState = {
    connected: [],
    all: [],
    isAllContactsFetching: false,
    allContactsCount: 0,
    searchText: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };

        case FETCH_CONTACTS_SUCCESS:
            [...action.contacts].forEach(prepareContact);
            return {
                ...state,
                connected: action.contacts,
            };

        case SEARCH_CONTACTS_REQUEST:
            return {
                ...state,
                isAllContactsFetching: true
            };

        case SEARCH_CONTACTS_SUCCESS:
            [...action.contacts].forEach(prepareContact);
            return {
                ...state,
                isAllContactsFetching: false,
                allContactsCount: action.allContactsCount,
                all: differenceWith(action.contacts, state.connected, (contactA, contactB) => contactA.id === contactB.id),
            };

        case ADD_CONTACT_REQUEST_SUCCESS:
            let index = state.all.findIndex(contact => contact.id === action.contact.id);

            return {
                ...state,
                connected: [...state.connected,
                    index !== -1
                        ? state.all[index]
                        : prepareContact(action.contact)],
                all: index !== -1
                    ? [...state.all.slice(0, index), ...state.all.slice(index + 1)]
                    : state.all
            };

        default:
            return state;
    }
}

const prepareContact = contact => {
    contact.color = getRandomColor();
    return contact;
};

const getRandomColor = () => {
    const colors = [red500,
        pink500,
        purple500,
        deepPurple500,
        indigo500,
        blue500,
        cyan500,
        green500,
        lightGreen500,
        yellow500,
        amber500,
        orange500,
        deepOrange500,
        brown500,
        grey500
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

