import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"
import './App.css';
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { log } from "node:console";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    changeFilter: (newFilterValue: FilterValueType) => void
    filterValue: FilterValueType
    removeTask: (taskId: string) => void
    AddTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, changeFilter, filterValue, removeTask, AddTask, changeTaskStatus } = props;

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null)

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
        if (trimmedTitle != '') {
            AddTask(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError('поле не может быть пустым')
        }



    }

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeInputValue}
                        onKeyDown={onPressKeyAddTask}
                    />
                    {/* <button onClick={onClickButtonAddTask} > + </button> */}
                    <Button
                        title={'+'}
                        onClick={onClickButtonAddTask} />
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                {tasks.length === 0 ?
                    <p>Тасок нет</p>
                    :
                    <ul>
                        {tasks.map(task => {

                            const onClickDeleteTask = () => {
                                removeTask(task.id)
                            }
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, event.currentTarget.checked)

                            }

                            return (
                                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    /> <span>{task.title}</span>
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
                        onClick={() => changeFilter('All')} />
                    <Button className={filterValue === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilter('Active')} />
                    <Button className={filterValue === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilter('Completed')} />


                </div>
            </div>
        </div>
    )
}