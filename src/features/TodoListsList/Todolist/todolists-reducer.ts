import {TodolistApi, TodoType} from "../../../api/todolist-api";
import {TypedDispatch} from "../../../app/store";

const initialState: Array<TodoListDomainType> = []

export type FilterPropsType = 'All' | 'Active' | 'Completed'
export type TodoListDomainType = TodoType &
    { filter: FilterPropsType }

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: todoListReducerACType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id);
        case "ADD-TODOLIST":
            return [...state, {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: "All",
                order: action.payload.todolist.order,
                addedDate: action.payload.todolist.addedDate
            }]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)

        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'All'
                }
            })

        default:
            return state
    }
}

// type
type todoListReducerACType =
    ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof SetTodoListsAC>

export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodoListFilterACType = ReturnType<typeof ChangeTodoListFilterAC>
export type SetTodolistsACType = ReturnType<typeof SetTodoListsAC>

//actions
export const RemoveTodoListAC = (todoListID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1
        }
    } as const
}

export const AddTodoListAC = (todolist: TodoType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
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

export const SetTodoListsAC = (todolists: Array<TodoListDomainType>) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

// thunk
export const setTodolistsTC = () => {
    return (dispatch: TypedDispatch) => {
        TodolistApi.getTodos().then(res => {
            dispatch(SetTodoListsAC(res.data));
        })
    }
}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        TodolistApi.deleteTodo(todolistId).then((res) => {
            dispatch(RemoveTodoListAC(todolistId));
        })
    }
}
export const creatTodolistTC = (title: string) => {
    return (dispatch: TypedDispatch) => {
        TodolistApi.createTodo(title).then((res) => {
            dispatch(AddTodoListAC(res.data.data.item));
        })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: TypedDispatch) => {
        TodolistApi.updateTodo(todolistId, title).then((res) => {
            dispatch(ChangeTodoListTitleAC(todolistId, title));
        })
    }
}