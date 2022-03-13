import React from 'react';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
type PropsType = {
    todoListID:string
    callBack: (todoListID:string) => void
    title: string
    className:string
}
 const Button = (props:PropsType) => {
    return (
            <button className={props.className} onClick={()=>props.callBack(props.todoListID)}>{props.title}</button>
    );
};

