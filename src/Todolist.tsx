import React, {ChangeEvent, useState} from 'react';
import {FilterPropsType} from "./App";
import './App.css'
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
    title: string
    tasks: Array<TaskType>
    removeTasks: (todoListID: string, id: string) => void
    filter: FilterPropsType
    changeFilter: (todoListID: string, value: FilterPropsType) => void
    addTask: (todoListID: string, value: string) => void
    onChangeTaskStatus: (todoListID: string, id: string, isDone: boolean) => void
    active: boolean
    removeTodoLists: (todoListID: string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setValue] = useState('')
    // let [error, setError] = useState<boolean>(false)

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     let title = e.currentTarget.value
    //     setValue(title)
    //     setError(false)
    //
    // }
    // const onCLickHandler = () => {
    //
    //     if (title.trim() !== '') {
    //         props.addTask(props.todoListID, title)
    //     } else {
    //         setError(true)
    //     }
    //     setValue('')
    // }

    const onAllClickHandler = () => {
        props.changeFilter(props.todoListID, 'All')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todoListID, 'Active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todoListID, 'Completed')
    }
    const onRemoveClickHandler = (id: string) => props.removeTasks(props.todoListID, id)

    return <div>
        <h3>{props.title}
            <Button callBack={props.removeTodoLists} todoListID={props.todoListID} title={'X'} className={''}/>
            {/*<button onClick={() => props.removeTodoLists(props.todoListID)}>X</button>*/}
        </h3>

        <div>
            <Input
                callBack={props.addTask}
                todoListID={props.todoListID}
            />
        </div>
        <ul>{props.tasks.map((t) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let isDone = e.currentTarget.checked
                props.onChangeTaskStatus(props.todoListID, t.id, t.isDone = isDone)
            }
            return (
                <li className={t.isDone ? "is-done" : ""} key={t.id}>
                    <Button
                        todoListID={props.todoListID}
                        callBack={() => onRemoveClickHandler(t.id)}
                        title={"x"}
                        className={''}
                    />
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeHandler}
                    />
                    <span>{t.title}</span></li>
            )
        })}
        </ul>
        <div>
            <Button className={props.filter === "All" ? 'active' : ''} callBack={onAllClickHandler}
                    title={'All'}
                    todoListID={props.todoListID}

            />
            <Button className={props.filter === "Active" ? 'active' : ''} callBack={onActiveClickHandler}
                    title={'Active'}
                    todoListID={props.todoListID}/>
            <Button className={props.filter === "Completed" ? 'active' : ''} callBack={onCompletedClickHandler}
                    title={'Completed'}
                    todoListID={props.todoListID}/>
            {/*<button  onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === "Active" ? 'active' : ''} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === "Completed" ? 'active' : ''}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
