import {FilterPropsType, TodoListType} from "../AppWithReducer";
import {v1} from "uuid";

const initialState:Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType>=initialState, action: todoListReducerACType):Array<TodoListType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id);
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todoListID, title: action.payload.title, filter: "All"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id? {...tl, filter:action.payload.filter}:tl)
        default:
            return state
    }
}
type todoListReducerACType =
    RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType

export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodoListFilterACType = ReturnType<typeof ChangeTodoListFilterAC>


export const RemoveTodoListAC = (todoListID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1
        }
    } as const
}
export const AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todoListID:v1()
        }
    } as const
}

export const ChangeTodoListTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: newTodolistTitle
        }
    } as const
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterPropsType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',

        payload: {
            id,
            filter
        }
    } as const
}


