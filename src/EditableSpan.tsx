import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const { title , onChange } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTaskTitle, setNewTaskTitle] = useState(title);

    const trueOnEditModeHandler = () => {
        setEditMode(true)
    }
    const trueOffEditModeHandler = () => {
        setEditMode(false)
        onChange(newTaskTitle)
    }
    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)

    }

    return (

        editMode
            ? <input onBlur={trueOffEditModeHandler} onChange={onChangeInputValue} value={newTaskTitle} autoFocus />
            : <span onDoubleClick={trueOnEditModeHandler}> {title}</span>
    )
}