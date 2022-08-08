import axiosClient from '../api/axiosClient';
const END_POINT = {
    TODOS: '/todos',
}
export const getTodosApi = () => {
    return axiosClient.get(`${END_POINT.TODOS}`);
}

export const delTodoApi = (id) => {
    return axiosClient.delete(`${END_POINT.TODOS}/${id}`);
}

export const addTodoApi = (todo) => {
    return axiosClient.post(`${END_POINT.TODOS}`,todo);
}
export const editTodoApi = (todo) => {
    return axiosClient.put(`${END_POINT.TODOS}`,todo);
}

