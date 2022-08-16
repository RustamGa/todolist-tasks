import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container} from "@material-ui/core";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";


function App() {
    console.log("App")
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
               <TodoListsList/>
            </Container>
        </div>
    );
}




export default App;