import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import { pender } from 'redux-pender/lib/utils';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST'

// redux-pender 사용
// createAction을 이용해서 액션 생성자 함수 정의, 두번째 인자는 프로미스를 반환하는 함수여야 한다.
export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
    data: {
        title: '',
        body: ''
    }
}

export default handleActions({
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { title, body } = action.payload.data;
            return {
                data: {
                    title,
                    body
                }
            }
        }
        // 실패 요청에 대해서 수행할 작업이 있다면 onPending, onFailure
    })
}, initialState);