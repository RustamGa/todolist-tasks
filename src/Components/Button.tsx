import React from 'react';

type PropsType = {
    onClickButtonHandler: () => void
    title:string

}
export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.onClickButtonHandler()
    }
    return (
        <div>
            <button
                onClick={onClickHandler}
            >
                {props.title}
            </button>
        </div>
    );
};
