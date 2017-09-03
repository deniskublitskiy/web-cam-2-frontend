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
    CREATE_CHAT_SUCCESS, FETCH_GROUPS_SUCCESS, OPEN_CHAT_MESSAGES_SUCCESS, RECEIVE_CHAT_MESSAGE, SEND_CHAT_MESSAGE,
    SEND_CHAT_MESSAGE_FAILURE,
    SEND_CHAT_MESSAGE_SUCCESS
} from '../actions/groups';

const initialState = {
    byIds: {},
    all: [],
    current: {
        members: [],
        messages: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GROUPS_SUCCESS:
            action.groups.forEach(prepare);
            return {
                ...state,
                byIds: action.groups.reduce((all, current) => {
                    all[current.id] = {...current};
                    return all;
                }, {}),
                all: action.groups.map(group => group.id)
            };

        case CREATE_CHAT_SUCCESS:
            let {chat} = action;
            prepare(chat);
            return {
                ...state,
                all: [...state.all, chat.id],
                byIds: {
                    ...state.byIds,
                    [chat.id]: chat
                }
            };

        case SEND_CHAT_MESSAGE:
            return (action.chatId === state.current.id)
                ? {
                    ...state,
                    current: {
                        ...state.current,
                        messages: [...state.current.messages, {
                            text: action.text,
                            chatId: action.chatId,
                            authorId: action.authorId,
                            isSending: true
                        }]
                    }
                }
                : state;

        case SEND_CHAT_MESSAGE_SUCCESS:
        case RECEIVE_CHAT_MESSAGE:
            if (state.current.id !== action.message.chatId) return state;
            let index = state.current.messages.findIndex(message => message.isSending
                && message.text === action.message.text
            );
            let messages = state.current.messages;
            return {
                ...state,
                current: {
                    ...state.current,
                    messages: index !== -1 ?
                        [...messages.slice(0, index), action.message, ...messages.slice(index + 1)]
                        : [...messages, action.message]
                }
            };

        case SEND_CHAT_MESSAGE_FAILURE:
            return state;

        case OPEN_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                current: {...action.chat}
            };

        default:
            return state;
    }
}


const prepare = contact => {
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