import { FilterValueType, TaskType } from "./App"
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';
import { ChangeEvent } from "react";

import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    changeFilter: (todolistId: string, newFilterValue: FilterValueType) => void
    filterValue: FilterValueType
    removeTask: (todolistId: string, taskId: string) => void
    AddTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    onChangeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    onChangeTotolistTitle: (todolistId: string, newTodolistTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, changeFilter, filterValue, removeTask, AddTask, changeTaskStatus, todolistId, removeTodolist, onChangeTaskTitle, onChangeTotolistTitle } = props;

    // const [newTaskTitle, setNewTaskTitle] = useState("");
    // const [error, setError] = useState<null | string>(null)

    // const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    //     setError(null)
    // }
    // const onPressKeyAddTask = (event: KeyboardEvent<HTMLInputElement>) => {

    //     if (event.key === "Enter") {
    //         onClickButtonAddTask()
    //     }
    // }

    // const onClickButtonAddTask = () => {
    //     const trimmedTitle = newTaskTitle.trim()
    //     if (trimmedTitle != '') {
    //         AddTask(todolistId, newTaskTitle);
    //         setNewTaskTitle("");
    //     } else {
    //         setError('поле не может быть пустым')
    //     }
    // }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }


    const addTaskHandler = (newTaskTitle: string) => {
        AddTask(todolistId, newTaskTitle)
    }

    const onChangeTotolistTitleHandler = (newTodolistTitle: string) => {
        onChangeTotolistTitle(todolistId, newTodolistTitle)
    }

    return (
        <div className="todolist">
            <div>
                <div>
                    <EditableSpan title={title} onChange={onChangeTotolistTitleHandler} />
                    {/* <h3>{title}</h3> */}
                    {/* <Button title="X" onClick={removeTodolistHandler} /> */}
                    <IconButton onClick={removeTodolistHandler}>
                        <DeleteIcon />
                    </IconButton>

                </div>
                <AddItemForm onClick={addTaskHandler} />
                {/* <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeInputValue}
                        onKeyDown={onPressKeyAddTask}
                    />
                    
                    <Button
                        title={'+'}
                        onClick={onClickButtonAddTask} />
                    {error && <div className={'error-message'}>{error}</div>}
                </div> */}

                {tasks.length === 0 ?
                    <p>Тасок нет</p>
                    :
                    <List>
                        {tasks.map(task => {

                            const onClickDeleteTask = () => {
                                removeTask(todolistId, task.id)
                            }
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(todolistId, task.id, event.currentTarget.checked)

                            }

                            const onChangeTaskTitleHandler = (newTaskTitle: string) => {
                                onChangeTaskTitle(todolistId, task.id, newTaskTitle)
                            }

                            return (
                                <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
                                    {/* <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    /> */}
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                                    <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler} />
                                    {/* <span>{task.title}</span> */}
                                    {/* <button onClick={onClickDeleteTask}>-</button> */}
                                    {/* <Button
                                        variant="contained"
                                        color="error"
                                        onClick={onClickDeleteTask} > X
                                    </Button> */}
                                    <IconButton onClick={onClickDeleteTask}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })}

                    </List>
                }

                <div>
                    <Button
                        variant={filterValue === 'All' ? 'contained' : 'outlined'}
                        color="success"
                        onClick={() => changeFilter(todolistId, 'All')} > All
                    </Button>

                    <Button
                        variant={filterValue === 'Active' ? 'contained' : 'outlined'}
                        color="info"
                        onClick={() => changeFilter(todolistId, 'Active')} > Active
                    </Button>
                    <Button
                        variant={filterValue === 'Completed' ? 'contained' : 'outlined'}
                        color="warning"
                        onClick={() => changeFilter(todolistId, 'Completed')} > Completed
                    </Button>


                </div>
            </div>
        </div >
    )
}