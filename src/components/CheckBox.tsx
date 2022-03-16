import React from 'react';
type CheckBoxPropsType = {
    callBack:(event:boolean)=>void,
    checked:boolean
}
export const CheckBox = (props:CheckBoxPropsType) => {
    return (
            <input type="checkbox"
                   checked={props.checked}
                   onChange={(e)=>props.callBack(e.currentTarget.checked)}
            />

    );
};

