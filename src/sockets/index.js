import io from 'socket.io-client';
import { addContactRequestSuccess } from '../actions/contacts';
import { createChatSuccess, receiveChatMessage } from '../actions/groups';
import { startCalling } from '../actions/call';

export default class SocketEvents {
    static bootstrap(url, store, query = '') {
        const socket = io.connect(url, {query});

        socket.on('connect', () => {
            console.info('Socket connection');
        });

        socket.on('connection_request', contact => {
            store.dispatch(addContactRequestSuccess(contact));
        });

        socket.on('chat_invite', chat => {
            store.dispatch(createChatSuccess(chat));
        });

        socket.on('chat_message', message => {
            store.dispatch(receiveChatMessage(message))
        });

        socket.on('start_calling', chatId => {
            store.dispatch(startCalling(chatId))
        });

        window.socket = socket;
    }
}