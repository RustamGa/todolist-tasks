import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type PropsType = {
    callBack: (title: string) => void
    // todoListID:string
}

export const AddItemForm = (props: PropsType) => {
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
            props.callBack(title)
        } else {
            setError(true)
        }
        setValue('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onCLickHandler()
            setValue('')
        }
    }

    return (
        <div>
            <TextField id="outlined-basic" label="Required" variant="outlined" size={"small"} value={title} onChange={onChangeHandler}
                       error={error} onKeyPress={onKeyPressHandler}/>
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}/>*/}
            <Button variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', background: 'lightblue'}}
                    onClick={onCLickHandler}>{'+'}</Button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    );
};

