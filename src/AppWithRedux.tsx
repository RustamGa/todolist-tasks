import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist1} from "./Todolist1";

export type FilterPropsType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterPropsType
}

function AppWithReducer() {
    // let todoListID1 = v1()
    // let todoListID2 = v1()

    // let [todoLists, dispatchTodolist] = useReducer(todoListReducer, [
    //     {id: todoListID1, title: "What to learn", filter: 'All'},
    //     {id: todoListID2, title: "What ti buy", filter: 'All'},
    // ])
    //
    // let [tasks, dispatchTask] = useReducer(tasksReducer, {
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false}
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false}
    //     ]
    // })
    // // let [filter, setFilter] = useState<FilterPropsType>("All")

   const todoLists= useSelector<AppRootStateType, Array<TodoListType>>(state=> state.todolists)
   // const tasks= useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)
    const dispatch=useDispatch()

    const addTodoList = (newTodoListTitle: string) => {
        // let newID = v1()
        // let newTodoList: TodoListType = {
        //     id: newID,
        //     title: newTodoListTitle,
        //     filter: 'All'
        // }
        // setTodoLists([newTodoList, ...todoLists])
        // setTask({...tasks, [newID]: []})
        const action = AddTodoListAC(newTodoListTitle)
        dispatch(action)

    }
    // const upDateTodoListTitle = (todoListID: string, title: string) => {
    //     // setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title} : t))
    //     dispatch(ChangeTodoListTitleAC(todoListID, title))
    // }
    // const upDateTaskTitle = (todoListID: string, taskID: string, title: string) => {
    //
    //     // setTask({...tasks, [todoListID]:tasks[todoListID].map(t=> t.id===taskID? {...t, title}:t)})
    //
    //     dispatch(ChangeTaskTitleAC(todoListID, taskID, title))
    // }
    // const removeTodoLists = (todoListID: string) => {
    //     // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    //     // delete tasks[todoListID]
    //     dispatch(RemoveTodoListAC(todoListID))
    //     dispatch(RemoveTodoListAC(todoListID))
    // }


    // const removeTasks = (todoListID: string, id: string) => {
    //     // setTask({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    //     // // let newTasks = tasks.filter((t) =>
    //     // //     t.id !== id,
    //     // // )
    //     // // setTask(newTasks)
    //     dispatch(RemoveTasksAC(todoListID, id))
    // }
    // const addTask = (todoListID: string, newTitle: string) => {
    //     // let newTask = {
    //     //     id: v1(),
    //     //     title: newTitle,
    //     //     isDone: false
    //     // }
    //     // setTask({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    //     // // let newTask = {
    //     // //     id: v1(),
    //     // //     title: newTitle,
    //     // //     isDone: false
    //     // // }
    //     // // setTask([
    //     // //     ...tasks, newTask
    //     // // ])
    //     dispatch(AddTaskAC(newTitle, todoListID ))
    // }
    // const changeFilter = (todoListID: string, value: FilterPropsType) => {
    //     // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    //     dispatch(ChangeTodoListFilterAC(todoListID, value ))
    //     // setFilter(value)
    // }
    // // let filteredTasks = tasks;
    // // if (filter === "Active") {
    // //     filteredTasks = tasks.filter(t => t.isDone);
    // // }
    // // if (filter === "Completed") {
    // //     filteredTasks = tasks.filter(t => t.isDone === false);
    // // }
    //
    // const onChangeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
    //     // setTask({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    //     // // tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    //     // // setTask([...tasks])
    //     dispatch(ChangeTaskStatusAC(todoListID,  isDone, taskID))
    // }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {


                        return (
                            <Grid item key={tl.id}><Paper style={{padding: "10px"}}>
                                    <Todolist1
                                        key={tl.id}
                                        todoListID={tl.id}
                                        // title={tl.title}
                                        // tasks={filteredTasks}
                                        // removeTasks={removeTasks}
                                        // filter={tl.filter}
                                        // changeFilter={changeFilter}
                                        // addTask={addTask}
                                        // onChangeTaskStatus={onChangeTaskStatus}
                                        // active={true}
                                        // removeTodoLists={removeTodoLists}
                                        // upDateTodoListTitle={upDateTodoListTitle}
                                        // upDateTaskTitle={upDateTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })

                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;