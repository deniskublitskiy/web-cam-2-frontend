import {
    ADD_QUESTION_ANSWER_OPTION,
    DELETE_QUESTION_ANSWER_OPTION,
    FETCH_TEST_TYPES_SUCCESS
} from '../actions/tests';
import uuidv4 from 'uuid/v4'

const initialState = {
    types: [],
    id: 1,
    value: '',
    answer: 1,
    variants: [
        {},
        {}
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEST_TYPES_SUCCESS:
            return {
                ...state,
                types: action.testTypes
            };
        case ADD_QUESTION_ANSWER_OPTION:
            return {
                ...state,
                variants: [...state.variants, {id: uuidv4()}]
            };
        case DELETE_QUESTION_ANSWER_OPTION:
            let index = state.variants.findIndex(variant => variant.id === action.id);
            return {
                ...state,
                variants: index !== -1
                    ? [...state.variants.slice(0, index), ...state.variants.slice(index + 1)]
                    : state.variants
            };
        default:
            return state;
    }
};