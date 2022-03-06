import React, {ChangeEvent, useState} from 'react';
import {Button} from "./Button";

type PropsType = {
    callBack: (todoListID:string, title: string) => void
    todoListID:string
}

export const Input = (props: PropsType) => {
    let [title, setValue] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setValue(title)
        setError(false)

    }

    const onCLickHandler = () => {
        console.log(title)
        if (title.trim() !== '') {
            props.callBack(props.todoListID,title)
        } else {
            setError(true)
        }
        setValue('')
    }

    return (
        <div>
        <input
            className={error ? 'error' : ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    onCLickHandler()
                    setValue('')
                }
            }}/>
            <button onClick={onCLickHandler}>{'+'} </button>
            {error && <div className={'error-message'}>Title is required</div>}
            </div>
    );
};

