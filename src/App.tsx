import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {FullInput} from "./Components/FullInput";
import {Input} from "./Components/Input";
import {Button} from "./Components/Button";


function App() {

    let [message, setMessage] = useState([
        {message: 'message1'},
        {message: 'message2'},
        {message: 'message3'},
        {message: 'message4'}
    ])

    let [title, setTitle] = useState('')

    const addMessage = (title: string) => {
        setMessage([...message, {message: title}])

    }
    const onClickButtonHandler = () => {
        addMessage(title)
        setTitle('')
    }
    return (
        <div className="App">
            <Input setTitle={setTitle} title={title}/>
            <Button onClickButtonHandler={onClickButtonHandler} title={'+'}/>
            {/*<FullInput*/}
            {/*    addMessage={addMessage}*/}
            {/*/>*/}
            {message.map((m, index) => {
                    return (
                        <div key={index}>
                            {m.message}
                        </div>
                    )
                }
            )
            }
        </div>
    );
}

export default App;
