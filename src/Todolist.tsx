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

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    filter: FilterPropsType
    changeFilter: (value: FilterPropsType) => void
    addTask: (value: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean) => void
    active: boolean
}

export function Todolist(props: PropsType) {
    let [title, setValue] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setValue(title)
        setError(false)

    }
    const onCLickHandler = () => {
        if (title.trim()!=='')
        {props.addTask(title)}
        else {
            setError(true)
        }
        setValue('')
    }

    const onAllClickHandler = () => {
        props.changeFilter('All')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('Active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed')
    }
    const onRemoveClickHandler = (id:string) => props.removeTasks(id)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input
            callBack={props.addTask}
            />
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title} onChange={onChangeHandler}*/}
            {/*       onKeyPress={(event) => {*/}
            {/*           if (event.key === "Enter") {*/}
            {/*               onCLickHandler()*/}
            {/*               setValue('')*/}
            {/*           }*/}
            {/*       }}/>*/}
            <Button callBack={onCLickHandler} title={'+'} className={''}/>
            {/*<button onClick={onCLickHandler}>+</button>*/}
            {error&&<div className={'error-message'}>Title is required</div>}
        </div>
        <ul>{props.tasks.map((t) => {

            // const onClickHandler = () => props.removeTasks(t.id)

            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let isDone = e.currentTarget.checked
                props.onChangeTaskStatus(t.id, t.isDone = isDone)
            }
            return (
                <li className={t.isDone ? "is-done" : ""} key={t.id}>
                    <Button
                        callBack={()=>onRemoveClickHandler(t.id)}
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
            <Button className={props.filter === "All" ? 'active' : ''} callBack={onAllClickHandler} title={'All'}/>
            <Button className={props.filter === "Active" ? 'active' : ''} callBack={onActiveClickHandler} title={'Active'}/>
            <Button className={props.filter === "Completed" ? 'active' : ''} callBack={onCompletedClickHandler} title={'Completed'}/>
            {/*<button  onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === "Active" ? 'active' : ''} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === "Completed" ? 'active' : ''}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
