import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"
import './App.css';
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { log } from "node:console";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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

    const { title, tasks, changeFilter, filterValue, removeTask, AddTask, changeTaskStatus, todolistId, removeTodolist, onChangeTaskTitle , onChangeTotolistTitle} = props;

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
                    <Button title="X" onClick={removeTodolistHandler} />
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
                    <ul>
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
                                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler} />
                                    {/* <span>{task.title}</span> */}
                                    {/* <button onClick={onClickDeleteTask}>-</button> */}
                                    <Button
                                        title={'-'}
                                        onClick={onClickDeleteTask} />
                                </li>
                            )
                        })}

                    </ul>
                }

                <div>
                    <Button className={filterValue === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilter(todolistId, 'All')} />
                    <Button className={filterValue === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilter(todolistId, 'Active')} />
                    <Button className={filterValue === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilter(todolistId, 'Completed')} />


                </div>
            </div>
        </div>
    )
}