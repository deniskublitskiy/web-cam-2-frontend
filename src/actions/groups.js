import { apiUrl } from '../config';

export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';
export const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';
export const ADD_CHAT_MEMBERS_SUCCESS = 'ADD_CHAT_MEMBERS_SUCCESS';

export const fetchGroups = () => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));

    let userId = localStorage.getItem('user.id');
    let request = new Request(`${apiUrl}/users/${userId}/chats`, {headers});

    try {
        let response = await fetch(request);
        let data = await response.json();
        response.ok && dispatch(loadChatsSuccess(data));
    } catch (e) {
        console.error(e.message || e);
    }
};

const loadChatsSuccess = groups => ({
    type: FETCH_GROUPS_SUCCESS,
    groups
});

export const createChat = (params, members) => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('content-type', 'application/json');
    params.createdById = localStorage.getItem('user.id');

    let chatCreateRequest = new Request(`${apiUrl}/chats`, {
        headers,
        method: 'POST',
        body: JSON.stringify(params)
    });

    try {
        let response = await fetch(chatCreateRequest);
        let data = await response.json();
        if (response.ok) {
            dispatch(createChatSuccess(data));
            members.push(localStorage.getItem('user.id'));
            let chatMembersAddRequest = new Request(`${apiUrl}/chats/${data.id}/members`, {
                headers,
                method: 'POST',
                body: JSON.stringify({members})
            });
            response = await fetch(chatMembersAddRequest);
            response.ok && dispatch(addChatMembersSuccess(data));
        }
    } catch (e) {
        console.error(e.message || e);
    }

};

export const importGroupsXlsx = file => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('content-type', 'application/json');

    let chatCreateRequest = new Request(`${apiUrl}/chats/import/xlsx`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            userId: localStorage.getItem('user.id'),
            file: file.split(',').pop()
        })
    });

    try {
        let response = await fetch(chatCreateRequest);
        let data = await response.json();
        // if (response.ok) {
        //     dispatch(addChatMembersSuccess(data));
        // }
    } catch (e) {
        console.error(e.message || e);
    }

};

export const createChatSuccess = chat => ({
    type: CREATE_CHAT_SUCCESS,
    chat
});

export const addChatMembersSuccess = users => ({
    type: ADD_CHAT_MEMBERS_SUCCESS,
    users
});

export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';
export const SEND_CHAT_MESSAGE_SUCCESS = 'SEND_CHAT_MESSAGE_SUCCESS';
export const SEND_CHAT_MESSAGE_FAILURE = 'SEND_CHAT_MESSAGE_FAILURE';

export const receiveChatMessage = message => ({
    type: RECEIVE_CHAT_MESSAGE,
    message
});

export const sendChatMessageRequest = (text, chatId, authorId) => async dispatch => {
    dispatch(sendChatMessage(text, chatId, authorId));
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    headers.append('content-type', 'application/json');

    let params = {
        authorId,
        text
    };
    let request = new Request(`${apiUrl}/chats/${chatId}/messages`, {
        headers,
        method: 'POST',
        body: JSON.stringify(params)
    });

    try {
        let response = await fetch(request);
        let data = await response.json();
        dispatch(response.ok
            ? sendChatMessageSuccess(data)
            : sendChatMessageFailure(data)
        );

    } catch (e) {
        console.error(e.message || e);
        sendChatMessageFailure(e);
        throw e;
    }
};

export const sendChatMessage = (text, chatId, authorId) => ({
    type: SEND_CHAT_MESSAGE,
    text,
    chatId,
    authorId
});

export const sendChatMessageSuccess = message => ({
    type: SEND_CHAT_MESSAGE_SUCCESS,
    message
});

export const sendChatMessageFailure = error => ({
    type: SEND_CHAT_MESSAGE_FAILURE,
    error
});

export const OPEN_CHAT_MESSAGES_SUCCESS = 'OPEN_CHAT_MESSAGES_SUCCESS';

export const openChatMessages = id => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));
    let request = new Request(`${apiUrl}/chats/${id}`, {
        headers
    });
    try {
        let response = await fetch(request);
        if (response.ok) {
            let chat = await response.json();
            dispatch(openChatMessagesSuccess(chat));
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
};

export const openChatMessagesSuccess = chat => ({
    type: OPEN_CHAT_MESSAGES_SUCCESS,
    chat
});