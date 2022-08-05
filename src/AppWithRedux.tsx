import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {creatTodolistTC, setTodolistsTC} from "./state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "./state/store";
import {Todolist} from "./Todolist";
import {TodoListType} from './AppWithReducer';


function AppWithRedux() {
    console.log("AppWithRedux")
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useTypedDispatch()

    const addTodoList = useCallback((newTodoListTitle: string) => {
        const action = creatTodolistTC(newTodoListTitle)
        dispatch(action)
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])
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
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todoListID={tl.id}
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

export default AppWithRedux;