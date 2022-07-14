import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "9d9825bb-ccb6-4efe-8fcf-e888d69867c3"},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '9d9825bb-ccb6-4efe-8fcf-e888d69867c3'
//     }
// }

export const TodolistApi = {

    getTodos: () => {
        return instance.get<TodoType[]>('todo-lists')
    },

    createTodo: (title:string) => {
       return  instance.post<CommonResponseDataType<{item:TodoType}>>('todo-lists', {title: title})

    },

    deleteTodo: (todolistId:string) => {
        return instance.delete<CommonResponseDataType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodo: (payload:UpdateTodoTitleType) => {
       return instance.put<CommonResponseDataType<{}>>(`todo-lists/${payload.todolistId}`, {title: payload.title})
    }
}
export type UpdateTodoTitleType = {
    todolistId:string
    title:string
}
export type CommonResponseDataType<T> = {
    data: T
    messages:string[],
    fieldsErrors:string[],
    resultCode:0
}

export type TodoType = {
    id:string
    title:string
    addedDate:string
    orde:number
}

