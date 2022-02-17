import React from 'react';
type PropsType = {
    callBack: () => void
    title: string
    className:string
}
export const Button = (props:PropsType) => {
    return (
            <button className={props.className} onClick={props.callBack}>{props.title}</button>
    );
};

