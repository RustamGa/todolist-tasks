import React, {ChangeEvent, useState} from 'react';
import {FilterPropsType} from "./AppWithReducer";
import './App.css'
// import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {CheckBox} from "./components/CheckBox"
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {AddTaskAC, ChangeTasksStatusAC, ChangeTaskTitleAC, RemoveTasksAC} from "./state/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    todoListID: string

}

export function Todolist1(props: PropsType) {
    const todoLists = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.todoListID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    const editTitleTask = (id: string, title: string) => {
        dispatch(ChangeTaskTitleAC(id, title, props.todoListID))

    }
    const editTitleTodolist = (title: string) => {
        console.log(props.todoListID)
        dispatch(ChangeTodoListTitleAC(props.todoListID, title))
    }
    const addTodoListHandler = (title: string) => {
        dispatch(AddTaskAC(title, props.todoListID))
    }

    const onAllClickHandler = () => {

        dispatch(ChangeTodoListFilterAC(props.todoListID, 'All'))
    }
    const onActiveClickHandler = () => {
        dispatch(ChangeTodoListFilterAC(props.todoListID, 'Active'))
    }
    const onCompletedClickHandler = () => {
        dispatch(ChangeTodoListFilterAC(props.todoListID, 'Completed'))
    }

    const onRemoveClickHandler = (id: string) => {
        dispatch(RemoveTasksAC(id, props.todoListID))

    }
    // const onChangeHandler = (id: string, isDone: boolean, event: boolean) => {
    //     dispatch(ChangeTasksStatusAC(id, isDone = event, props.todoListID))
    // }

    const removeTodoLists = (todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
        dispatch(RemoveTodoListAC(todoListID))
    }
    const removeTasks = (id: string, todoListID: string) => {

        dispatch(RemoveTasksAC(id, todoListID))
    }
    let filteredTasks = tasks;
    if (todoLists.filter === "Active") {
        filteredTasks = tasks.filter(t => t.isDone);
    }
    if (todoLists.filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone === false);
    }

    return <div>
        <h3>
            <EditableSpan callBack={editTitleTodolist} title={todoLists.title}/>
            <IconButton aria-label="delete">
                <Delete onClick={() => removeTodoLists(props.todoListID)}/>
            </IconButton>
        </h3>

        <div>
            <AddItemForm
                callBack={addTodoListHandler}

            />
        </div>
        <ul>{filteredTasks.map((t) => {
            return (
                <li className={t.isDone ? "is-done" : ""} key={t.id}>
                    <IconButton aria-label="delete">
                        <Delete onClick={() => removeTasks(t.id, props.todoListID)}/>
                    </IconButton>

                    <CheckBox
                        checked={t.isDone}
                        callBack={(e)=>dispatch(ChangeTasksStatusAC(t.id, e, props.todoListID))}/>
                    <EditableSpan callBack={(title) => editTitleTask(t.id, title)} title={t.title}/>

                </li>
            )
        })}
        </ul>
        <div>
            <Button onClick={onAllClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={todoLists.filter === "All"}>
                All
            </Button>
            <Button onClick={onActiveClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={todoLists.filter === "Active"}>
                Active
            </Button>
            <Button onClick={onCompletedClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={todoLists.filter === "Completed"}>
                Completed
            </Button>

        </div>
    </div>
}
