import {FilterPropsType, TodoListType} from "../App";
import {v1} from "uuid";
import {TasksStateType} from "../Todolist";
import {AddTodoListACType, RemoveTodoListACType} from "./todolists-reducer";
//

export const tasksReducer = (state: TasksStateType, action: TasksReducerACType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(t => (t.id !== action.payload.id))
            }
        }
        case "ADD-TASK": {
            return {
                ...state, [action.payload.todoListID]: [{
                    id: action.payload.todoListID,
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoListID]]
            }
        }
        case "CHANGE-TASKS-TITLE": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.todoListID]:[]
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.id]
            return newState

        }
        default:
            return state
    }
}
type TasksReducerACType =
    RemoveTasksACType
    | AddTaskACType
    | ChangeTaskACType
    | ChangeTaskTitleACType
    | AddTodoListACType
| RemoveTodoListACType

export type RemoveTasksACType = ReturnType<typeof RemoveTasksAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskACType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>


export const RemoveTasksAC = (taskID: string, tdID: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            id: taskID,
            todoListID: tdID
        }
    } as const
}
export const AddTaskAC = (title: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todoListID
        }
    } as const
}

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',

        payload: {
            id: taskID,
            isDone: isDone,
            todoListID: todoListID
        }
    } as const
}
export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASKS-TITLE',

        payload: {
            id: taskID,
            title,
            todoListID
        }
    } as const
}


