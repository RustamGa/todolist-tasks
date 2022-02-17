import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterPropsType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterPropsType>("All")


    const removeTasks = (id: string) => {
        let newTasks = tasks.filter((t) =>
            t.id !== id,
        )
        setTask(newTasks)
    }
    const addTask = (newTitle: string) => {
        let newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTask([
            ...tasks, newTask
        ])

    }
    const changeFilter = (value: FilterPropsType) => {
        setFilter(value)
    }
    let filteredTasks = tasks;
    if (filter === "Active") {
        filteredTasks = tasks.filter(t => t.isDone);
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone === false);
    }

    const onChangeTaskStatus = (taskID: string, isDone: boolean) => {
    tasks.map(t => t.id === taskID ? {...t, isDone:isDone} : t)
        setTask([...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      filter={filter}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      onChangeTaskStatus={onChangeTaskStatus}
                      active={true}
            />
            {/*<Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
