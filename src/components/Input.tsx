import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    callBack: (title: string) => void
}

export const Input = (props: PropsType) => {
    let [title, setValue] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setValue(title)
        setError(false)

    }

    const onCLickHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
        } else {
            setError(true)
        }
        setValue('')
    }

    return (
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    onCLickHandler()
                    setValue('')
                }

            }}/>
    );
};

