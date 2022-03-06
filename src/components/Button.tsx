import React from 'react';
type PropsType = {
    todoListID:string
    callBack: (todoListID:string) => void
    title: string
    className:string
}
export const Button = (props:PropsType) => {
    return (
            <button className={props.className} onClick={()=>props.callBack(props.todoListID)}>{props.title}</button>
    );
};

