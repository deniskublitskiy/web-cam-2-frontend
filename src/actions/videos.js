export const LOAD_STREAM = 'LOAD_STREAM';
export const REMOVE_STREAM = 'REMOVE_STREAM';

export const loadUserStream = () => async dispatch => {
    let config = {
        audio: true,
        video: true
    };
    let stream = await navigator.mediaDevices.getUserMedia(config);
    stream.blobURL = URL.createObjectURL(stream);
    dispatch(loadStream(stream));
};

export const loadStream = stream => ({
    type: LOAD_STREAM,
    stream
});

export const removeStream = streamId => ({
    type: REMOVE_STREAM,
    streamId
});