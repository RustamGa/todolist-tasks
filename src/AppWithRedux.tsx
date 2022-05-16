import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    AddTodoListAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./Todolist";

export type FilterPropsType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterPropsType
}

function AppWithRedux() {
    console.log("AppWithRedux")
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((newTodoListTitle: string) => {
        const action = AddTodoListAC(newTodoListTitle)
        dispatch(action)
    }, [dispatch])

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