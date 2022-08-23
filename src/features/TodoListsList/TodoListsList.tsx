import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../app/store";
import {TodoListType} from "../../trash/AppWithReducer";
import {creatTodolistTC, setTodolistsTC} from "./Todolist/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type TodoListsListPropsType = {
    demo?:boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo=false}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useTypedDispatch()

    const addTodoList = useCallback((newTodoListTitle: string) => {
        const action = creatTodolistTC(newTodoListTitle)
        dispatch(action)
    }, [dispatch])

    useEffect(() => {
        debugger
        if (demo){
            return;
        }
        dispatch(setTodolistsTC())
    }, [])
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callBack={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map((tl) => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    todoListID={tl.id}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </>)
}
