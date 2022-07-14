import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TodolistApi, UpdateTodoTitleType} from "../api/todolist-api";
import {TasksApi, UpdateTaskTitleType} from "../api/tasks-api";

export default {
    title: 'API',

}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "bbbc296c-d310-4f3d-88f2-e93665014c80"
        TasksApi.getTasks(todolistId).then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreatTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "bbbc296c-d310-4f3d-88f2-e93665014c80"
        const title = "JS"
        TasksApi.createTask(todolistId, title).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "bbbc296c-d310-4f3d-88f2-e93665014c80"
        const taskId = "54bdc588-ef3c-4565-a625-654a9fdf5102"
        TasksApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "bbbc296c-d310-4f3d-88f2-e93665014c80"
        const taskId = "a4481c52-0168-4d9d-b3a4-03fe0eb4404b"
        const title = "CSS"
        const payload:UpdateTaskTitleType={
            todolistId,
            taskId,
            title
        }

        TasksApi.updateTask(payload).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

