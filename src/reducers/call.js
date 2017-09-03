import { END_CALL, INIT_CONNECTION, START_CALLING } from '../actions/call';

const initialState = {
    isCalling: false,
    isCall: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_CONNECTION:
            return {
                ...state,
                connection: action.connection
            };

        case START_CALLING:
            state.connection.openOrJoin(`video-chat-${action.chatId}`);
            return {
                ...state,
                isCall: true
            };

        case END_CALL:
            state.connection.disconnectWith(`video-chat-${action.chatId}`);
            return {
                ...state,
                isCall: false
            };

        default:
            return state;
    }
};