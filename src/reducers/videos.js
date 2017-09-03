import { LOAD_STREAM, REMOVE_STREAM } from '../actions/videos';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STREAM:
            return [...state, {
                src: action.stream.blobURL,
                streamId: action.stream.streamid
            }];

        case REMOVE_STREAM:
            let index = state.findIndex(stream => stream.streamId === action.streamId);
            debugger;
            return index === -1
                    ? state
                    : [...state.slice(0, index), ...state.slice(index + 1)];

        default:
            return state;
    }
}