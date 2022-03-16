import {FilterPropsType, TodoListType} from "../App";
import {v1} from "uuid";
//
// type ActionType = {
//     type: string
//     [key: string]: any
// }
export const todoListReducer = (state: Array<TodoListType>, action: todoListReducerACType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id);
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.payload.title, filter: "All"}]
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

type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
type AddTodoListACType = ReturnType<typeof AddTodoListAC>
type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
type ChangeTodoListFilterACType = ReturnType<typeof ChangeTodoListFilterAC>
export const changeFilterAC = (todoListID: string) => {
    return {
        type: 'CHANGE-FILTER',
        todoListID
    }
}
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
            title
        }
    } as const
}

export const ChangeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',

        payload: {
            id: todolistId2,
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


