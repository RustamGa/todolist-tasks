import React, {ChangeEvent, useState} from 'react';
type PropsType = {
    addMessage:(title:string)=>void
}
export const FullInput = (props:PropsType) => {

    let [title, setTitle] =useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setTitle(title)
    }

    const onClickHandler = () => {
        props.addMessage(title)
        setTitle('')
    }
    return (
        <div>
            <div>
                <input onChange={onChangeHandler} value={title}/>
                <button onClick={onClickHandler}>+</button>
            </div>
        </div>
    );
};

