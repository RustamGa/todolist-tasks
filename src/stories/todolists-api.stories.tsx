import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TodolistApi, UpdateTodoTitleType} from "../api/todolist-api";

export default {
    title: 'API',

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodos().then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "new todoList"
        TodolistApi.createTodo(title).then(res=> {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "2b9f0895-468b-433a-9740-83894c9364e3";
        TodolistApi.deleteTodo(todolistId).then(res=> {
            setState(res.data.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "ed06da15-dd49-42f6-a568-64d52f388516";
        const title = "JAVASCRIPT"
        const payload:UpdateTodoTitleType={
            todolistId,
            title}
       TodolistApi.updateTodo(payload).then(data=>{
           setState(data.data)
       })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

