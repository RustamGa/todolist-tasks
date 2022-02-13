import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormPropsType = {
    id:string
    addTasks:(title:string,todolistID:string) => void
}
export function AddItemForm (props:AddItemFormPropsType){
    let [newTitle, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            if (newTitle !== "")
                props.addTasks(newTitle.trim(), props.id)
            else (
                setError('Title is required')
            );
            setTitle('');
        }
    };
    const addTask = () => {
        if (newTitle !== "")
            props.addTasks(newTitle, props.id)
        else (
            setError('Title is required')
        );
        setTitle('');

    }
    return (
        <div>
            <input
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button
                onClick={addTask}
            >+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

    )
}