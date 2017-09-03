import { red500, pink500, purple500, deepPurple500, indigo500, blue500, cyan500, green500, lightGreen500, yellow500, amber500, orange500, deepOrange500, brown500, grey500 } from 'material-ui/styles/colors';
import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../actions/auth';
import { USER_CHANGED } from '../actions/users';

// TODO: Move to utilities
const prepareContact = contact => {
    contact.color = getRandomColor();
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

const initialState = {
    firstName: '',
    lastName: '',
    fullName: '',

};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            prepareContact(action.responseData.data);
            return {
                ...state,
                ...action.responseData.data,
                token: action.responseData.token
            };

        case USER_CHANGED:
            return {
                ...state,
                ...action.user
            };

        default:
            return state;
    }
}