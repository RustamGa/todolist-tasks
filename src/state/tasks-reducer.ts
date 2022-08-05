import {v1} from "uuid";
import {TasksStateType} from "../TodolistWithReducer";
import {AddTodoListACType, RemoveTodoListACType, SetTodoListsAC} from "./todolists-reducer";
import {TodoListType} from "../AppWithReducer";
import {AppRootStateType, TypedDispatch} from "./store";
import {TodolistApi} from "../api/todolist-api";
import {
    CommonResponseDataType,
    TaskPriorities,
    TasksApi,
    TaskStatuses,
    TasksType,
    TaskType,
    UpdateTaskModelType
} from "../api/tasks-api";
//
const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerACType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(t => (t.id !== action.payload.id))
            }
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.task.todoListId];
            const newTasks = [action.payload.task, ...tasks];
            stateCopy[action.payload.task.todoListId] = newTasks;
            return stateCopy;

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
        case "UPDATE-TASKS-STATUS": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.id ? {
                    ...t,
                   ...action.payload.domainModel
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.id]
            return newState

        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
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
    | UpdateTasksStatusACType
    | SetTodolistsACType
    | SetTasksACType

export type RemoveTasksACType = ReturnType<typeof RemoveTasksAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskACType = ReturnType<typeof UpdateTasksStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
type UpdateTasksStatusACType = ReturnType<typeof UpdateTasksStatusAC>
type SetTodolistsACType = ReturnType<typeof SetTodolistsAC>
type SetTasksACType = ReturnType<typeof SetTodolistsTasksAC>


export const RemoveTasksAC = (taskID: string, tdID: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            id: taskID,
            todoListID: tdID
        }
    } as const
}
export const AddTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}

export const UpdateTasksStatusAC = (taskID: string, domainModel:UpdateDomainTaskModelType, todoListID: string) => {
    return {
        type: 'UPDATE-TASKS-STATUS',
        payload: {
            id: taskID,
            domainModel: domainModel,
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

export const SetTodolistsAC = (todolists: Array<TodoListType>) => {
    return {
        type: 'SET-TODOLISTS',

        payload: {
            todolists
        }
    } as const
}
export const SetTodolistsTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}

export const setTasksTC = (todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        TasksApi.getTasks(todolistId).then(res => {
            dispatch(SetTodolistsTasksAC(todolistId, res.data.items));
        })
    }
}
export const deleteTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        TasksApi.deleteTask(taskId, todolistId).then(() => {
            dispatch(RemoveTasksAC(taskId, todolistId));
        })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: TypedDispatch) => {
        TasksApi.createTask(todolistId, title).then((res) => {
            dispatch(AddTaskAC(res.data.data.item));
        })
    }
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
        const allTasksFormState = getState().tasks
        const tasksForCurrentTodolist = allTasksFormState[todolistId].find(t => t.id === taskId)
        if (tasksForCurrentTodolist) {

            const apiModelTask: UpdateTaskModelType = {
                deadline: tasksForCurrentTodolist.deadline,
                description: tasksForCurrentTodolist.description,
                title: tasksForCurrentTodolist.title,
                startDate: tasksForCurrentTodolist.startDate,
                priority: tasksForCurrentTodolist.priority,
                status: tasksForCurrentTodolist.status,
                ...domainModel
            }
            TasksApi.updateTask(todolistId, taskId, apiModelTask).then((res) => {
                dispatch(UpdateTasksStatusAC(taskId, domainModel, todolistId));
            })
        }

    }

}



