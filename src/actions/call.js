import { loadStream, removeStream } from './videos';

export const START_CALLING = 'START_CALLING';
export const END_CALL = 'END_CALL';
export const INIT_CONNECTION = 'INIT_CONNECTION';

export const initConnection = () => dispatch => {
    let connection = new RTCMultiConnection();

    connection.onstream = event => {
        dispatch(loadStream(event));
    };

    connection.onstreamended = function (event) {
        dispatch(removeStream(event.streamid))
    };

    connection.enableLogs = false;
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    dispatch({
        type: INIT_CONNECTION,
        connection
    })
};

export const startCallingRequest = chatId => dispatch => {
    window.socket.emit('start_calling', chatId);
    dispatch(startCalling(chatId));
};

export const startCalling = chatId => ({
    type: START_CALLING,
    chatId
});

export const endCall = chatId => ({
    type: END_CALL,
    chatId
});
