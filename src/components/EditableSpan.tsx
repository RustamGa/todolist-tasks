import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const onClickHandler = () => {
        setEdit(true)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(title)
    }

    return (
        edit ?
            <TextField id="outlined-basic" label="Required" variant="outlined" size={"small"} value={title}
                       onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            // <input value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            : <span onDoubleClick={onClickHandler}>
           {props.title}
       </span>

    );
};

