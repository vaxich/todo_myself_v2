import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useState } from "react";


type AddItemFormPropsType = {

    onClick: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const { onClick } = props

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const onPressKeyAddTask = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter") {
            onClickButtonAddTask()
        }
    }

    const onClickButtonAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            onClick(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError('поле не может быть пустым')
        }
    }

    return (
        <div>
            {/* <input
                value={newTaskTitle}
                onChange={onChangeInputValue}
                onKeyDown={onPressKeyAddTask}
            /> */}
            <TextField
                size={'small'}
                error={!!error}
                helperText={error}
                label="type text"
                variant="outlined"
                onChange={onChangeInputValue}
                onKeyDown={onPressKeyAddTask}
                value={newTaskTitle} autoFocus />
            {/* <button onClick={onClickButtonAddTask} > + </button> */}
            {/* <Button
                title={'+'}
                onClick={onClickButtonAddTask} /> */}
            <Button
                size="medium"
                variant="contained"
                onClick={onClickButtonAddTask} > +
            </Button>
            {/* {error && <div className={'error-message'}>{error}</div>} */}
        </div>
    )
}