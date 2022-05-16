import React, {useCallback} from 'react';
import './App.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {AddTaskAC} from "./state/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./state/todolists-reducer";
import { TaskWithDispatch} from "./Task";

export type TaskType = {
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

export const Todolist = React.memo(function (props: PropsType) {
    console.log("TodoList is called")

    const todoLists = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.todoListID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])

    const dispatch = useDispatch()

    // const editTitleTask = useCallback(( title: string, id: string,) => {
    //     dispatch(ChangeTaskTitleAC(id, title, props.todoListID))
    // }, [props.todoListID,dispatch])

    const editTitleTodolist = useCallback((title: string) => {
        dispatch(ChangeTodoListTitleAC(props.todoListID, title))
    }, [props.todoListID, dispatch]);

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(AddTaskAC(title, props.todoListID))
    }, [props.todoListID, dispatch]);

    const onAllClickHandler = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(props.todoListID, 'All'))
    }, [props.todoListID, dispatch]);

    const onActiveClickHandler = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(props.todoListID, 'Active'))
    }, [props.todoListID, dispatch]);

    const onCompletedClickHandler = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(props.todoListID, 'Completed'))
    }, [props.todoListID, dispatch]);

    const removeTodolist = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
        dispatch(RemoveTodoListAC(todoListID))
    }, [dispatch]);

    // const removeTasks = useCallback((id: string, todoListID: string) => {
    //     dispatch(RemoveTasksAC(id, todoListID))
    // }, [dispatch]);
    //
    // const changeTaskStatus = useCallback((e: boolean, id: string) => {
    //     dispatch(ChangeTasksStatusAC(id, e, props.todoListID))
    // }, [props.todoListID, dispatch])


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
            <IconButton aria-label="delete" onClick={() => removeTodolist(props.todoListID)}>
                <Delete />
            </IconButton>
        </h3>

        <div>
            <AddItemForm
                callBack={addTodoListHandler}
            />
        </div>
        <ul>{filteredTasks.map((task) => {

            return (
                <TaskWithDispatch key={task.id}
                      todoListID={props.todoListID}
                      task={task}
                     />
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
            `
        </div>
    </div>
})


