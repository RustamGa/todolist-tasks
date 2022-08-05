import React, {ReactNode} from "react"
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./state/tasks-reducer";
import {todoListReducer} from "./state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0,
            addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0,
            addedDate: ''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''},
            {id: v1(), title: "JS", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''},
            {id: v1(), title: "React Book", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''}
        ]
    }
};

export const storyBookStore = createStore(rootReducer,  applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn:()=> React.ReactNode)=> {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}