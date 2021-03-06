import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {CheckBox} from "./components/CheckBox";
import {EditableSpan} from "./components/EditableSpan";
import React, {useCallback} from "react";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {ChangeTasksStatusAC, ChangeTaskTitleAC, RemoveTasksAC} from "./state/tasks-reducer";

type TaskPropsType = {
    todoListID: string
    task: TaskType
    removeTasks: (id: string, todoListID: string) => void
    onChangeTaskStatusOnClickHandler: (e: boolean, id: string) => void
    onChangeTaskTitleOnClickHandler: (title: string, id: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {
        const onClickHandler = useCallback(() => {
            props.removeTasks(props.task.id, props.todoListID)
        }, [])
        const onChangeHandler = useCallback((e: boolean) => {
            props.onChangeTaskStatusOnClickHandler(e, props.task.id)
        }, [])
        const onChangeTaskTitleHandler = useCallback ((title:string) => {
            props.onChangeTaskTitleOnClickHandler(title, props.task.id)
        }, [props.task.id, props.onChangeTaskTitleOnClickHandler, props.todoListID])

        return (
            <li className={props.task.isDone ? "is-done" : ""}>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <Delete />
                </IconButton>
                <CheckBox
                    checked={props.task.isDone}
                    callBack={onChangeHandler}/>
                <EditableSpan callBack={onChangeTaskTitleHandler}
                              title={props.task.title}/>
            </li>
        )
    }
)
type TaskWithDispatchPropsType = {
    task:TaskType
    todoListID:string
}

// export const TaskWithDispatch = React.memo(({task, todoListID}:TaskWithDispatchPropsType) => {
//     const dispatch = useDispatch()
//     const removeTasks = useCallback(() => {
//         dispatch(RemoveTasksAC(task.id, todoListID))
//     }, [dispatch, task.id, todoListID]);
//     const changeTaskStatus = useCallback((e: boolean, id: string) => {
//         dispatch(ChangeTasksStatusAC(id, e, todoListID))
//     }, [todoListID, dispatch]);
//
//     const editTitleTask = useCallback(( title: string, id: string,) => {
//         dispatch(ChangeTaskTitleAC(id, title, todoListID))
//     }, [todoListID,dispatch])
//
//
//
//     return (
//         <li className={task.isDone ? "is-done" : ""}>
//             <IconButton aria-label="delete" onClick={removeTasks}>
//                 <Delete />
//             </IconButton>
//             <CheckBox
//                 checked={task.isDone}
//                 callBack={(e)=> changeTaskStatus(e, task.id)}/>
//             <EditableSpan callBack={(title)=>editTitleTask(title, task.id)}
//                           title={task.title}/>
//         </li>
//     )
// })