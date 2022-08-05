import React, {useCallback, useEffect} from 'react';
import './App.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "./state/store";
import {addTaskTC, deleteTasksTC, setTasksTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {ChangeTodoListFilterAC, changeTodolistTitleTC, deleteTodolistTC} from "./state/todolists-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {TodoListType} from './AppWithReducer';

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

    const dispatch = useTypedDispatch()

    const editTitleTodolist = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(props.todoListID, title))
    }, [props.todoListID, dispatch]);


    const addTaskHandler = useCallback((  title: string) => {
        dispatch(addTaskTC(props.todoListID, title))
    }, [dispatch]);

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
        dispatch(deleteTodolistTC(todoListID))
    }, [dispatch]);

    const removeTasks = useCallback((id: string, todoListID: string) => {
            dispatch(deleteTasksTC(id, todoListID))
    }, [dispatch]);

    const changeTaskStatus = useCallback((status:TaskStatuses, id: string) => {
        dispatch(updateTaskStatusTC(id, props.todoListID, {status}))
    }, [props.todoListID, dispatch])

    const editTitleTask = useCallback((title: string, id: string,) => {
        dispatch(updateTaskStatusTC(id, props.todoListID, {title}))
    }, [props.todoListID, dispatch])


    let filteredTasks = tasks;
    if (todoLists.filter === "Active") {
        filteredTasks = tasks.filter(t => t.status===TaskStatuses.New);
    }
    if (todoLists.filter === "Completed") {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    useEffect(() => {
        dispatch(setTasksTC(props.todoListID))
    }, [])

    return <div>
        <h3>
            <EditableSpan callBack={editTitleTodolist} title={todoLists.title}/>
            <IconButton aria-label="delete" onClick={() => removeTodolist(props.todoListID)}>
                <Delete/>
            </IconButton>
        </h3>

        <div>
            <AddItemForm
                callBack={addTaskHandler}
            />
        </div>
        <ul>{filteredTasks.map((task) => {
            return (

                <Task key={task.id}
                      todoListID={props.todoListID}
                      task={task}
                      removeTasks={removeTasks}
                      onChangeTaskStatusOnClickHandler={changeTaskStatus}
                      onChangeTaskTitleOnClickHandler={editTitleTask}
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


