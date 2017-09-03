import { apiUrl } from '../config';

export const FETCH_TEST_TYPES_SUCCESS = 'FETCH_TEST_TYPES_SUCCESS';
export const fetchTestTypes = () => async dispatch => {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token'));

    let request = new Request(`${apiUrl}/tests/types`, {headers});

    try {
        let response = await fetch(request);
        let data = await response.json();
        response.ok && dispatch(fetchTestTypesSuccess(data));
    } catch (e) {
        console.error(e.message || e);
    }
};

const fetchTestTypesSuccess = testTypes => ({
    type: FETCH_TEST_TYPES_SUCCESS,
    testTypes
});

export const ADD_QUESTION_ANSWER_OPTION = 'ADD_QUESTION_ANSWER_OPTION';
export const DELETE_QUESTION_ANSWER_OPTION = 'DELETE_QUESTION_ANSWER_OPTION';

export const addQuestionAnswerOption = () => ({
    type: ADD_QUESTION_ANSWER_OPTION
});

export const deleteQuestionAnswerOption = id => ({
    type: DELETE_QUESTION_ANSWER_OPTION,
    id
});