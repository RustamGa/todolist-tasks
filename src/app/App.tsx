import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, LinearProgress} from "@mui/material";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?:boolean
}


function App({demo = false}:PropsType) {
    console.log("App")
    const status = useSelector<AppRootStateType>((state) => state.app.status)

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <TodoListsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}


export default App;