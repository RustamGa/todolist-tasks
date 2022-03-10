import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

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
    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                onCLickHandler()
                setValue('')
            }
    }

    return (
        <div>
        <input
            className={error ? 'error' : ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>
            <button onClick={onCLickHandler}>{'+'} </button>

            {error && <div className={'error-message'}>Title is required</div>}
            </div>
    );
};

