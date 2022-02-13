import React, {ChangeEvent, useState} from 'react';
type PropsType = {
    title: string
    setTitle:(title:string) => void
}
export const Input = (props:PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        props.setTitle(title)
    }
    return (
        <div>
            <input value={props.title} onChange={onChangeHandler}/>
        </div>
    );
};

