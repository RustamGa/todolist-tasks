import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "9d9825bb-ccb6-4efe-8fcf-e888d69867c3"},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})


export const TasksApi = {

    getTasks: (todolistId: string) => {
        return instance.get<TasksType[]>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask: (todolistId: string, title: string) => {
        return instance.post<CommonResponseDataType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,
            {title: title})

    },

    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<CommonResponseDataType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask: (payload: UpdateTaskTitleType) => {
        return instance.put<CommonResponseDataType<{ item: TaskType }>>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
            {title: payload.title})
    }
}
export type UpdateTaskTitleType = {
    todolistId: string
    taskId: string
    title: string
}


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksType = {
    items: TaskType[],
    totalCount: number,
    error: null
}

export type CommonResponseDataType<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}