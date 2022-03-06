import React, {useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterPropsType = 'All' | 'Active' | 'Completed'

type TodoListType={
    id:string
    title:string
    filter:FilterPropsType
}
function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: 'All'},
        {id: todoListID2, title: "What ti buy", filter: 'All'},
    ])

    let [tasks, setTask] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })
    // let [filter, setFilter] = useState<FilterPropsType>("All")

    const removeTodoLists = (todoListID:string) => {
        setTodoLists(todoLists.filter(tl=> tl.id!==todoListID))
        delete tasks[todoListID]
    }


    const removeTasks = (todoListID:string, id: string) => {
        setTask({...tasks, [todoListID]:tasks[todoListID].filter(t=> t.id!==id )})
        // let newTasks = tasks.filter((t) =>
        //     t.id !== id,
        // )
        // setTask(newTasks)
    }
    const addTask = (todoListID:string, newTitle: string) => {
        let newTask = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTask({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})
        // let newTask = {
        //     id: v1(),
        //     title: newTitle,
        //     isDone: false
        // }
        // setTask([
        //     ...tasks, newTask
        // ])

    }
    const changeFilter = (todoListID:string, value: FilterPropsType) => {
        setTodoLists(todoLists.map(tl=>tl.id===todoListID?{...tl, filter:value}:tl))
        // setFilter(value)
    }
    // let filteredTasks = tasks;
    // if (filter === "Active") {
    //     filteredTasks = tasks.filter(t => t.isDone);
    // }
    // if (filter === "Completed") {
    //     filteredTasks = tasks.filter(t => t.isDone === false);
    // }

    const onChangeTaskStatus = (todoListID:string, taskID: string, isDone: boolean) => {
        setTask({...tasks, [todoListID]:tasks[todoListID].map(t=> t.id===taskID?{...t, isDone:isDone}:t)})
        // tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // setTask([...tasks])
    }

    return (
        <div className="App">
            {todoLists.map((tl)=> {
                let filteredTasks = tasks[tl.id];
                if (tl.filter === "Active") {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone);
                }
                if (tl.filter === "Completed") {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone === false);
                }

                return (
                <Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTasks={removeTasks}
                    filter={tl.filter}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    onChangeTaskStatus={onChangeTaskStatus}
                    active={true}
                    removeTodoLists={removeTodoLists}
                />
                )
                })

            }
            {/*<Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
