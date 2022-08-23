import axios from "axios";
import {TodoListDomainType} from "../features/TodoListsList/Todolist/todolists-reducer";


const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "9d9825bb-ccb6-4efe-8fcf-e888d69867c3"},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

// api
export const TodolistApi = {
    getTodos: () => {
        return instance.get<TodoListDomainType[]>('todo-lists')
    },
    createTodo: (title:string) => {
       return  instance.post<CommonResponseDataType<{item:TodoType}>>('todo-lists', {title: title})
    },
    deleteTodo: (todolistId:string) => {
        return instance.delete<CommonResponseDataType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodo: (todolistId:string, title:string) => {
       return instance.put<CommonResponseDataType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}


// types
export type UpdateTodoTitleType = {
    todolistId:string
    title:string
}
export type CommonResponseDataType<T> = {
    data: T
    messages:string[],
    fieldsErrors:string[],
    resultCode:number
}

export type TodoType = {
    id:string
    title:string
    addedDate:string
    order:number
}
