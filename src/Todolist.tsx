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
}

export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, changeFilter, filterValue, removeTask, AddTask } = props;

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onPressKeyAddTask = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === "Enter") {
            AddTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const onClickButtonAddTask = () => {
        AddTask(newTaskTitle);
        setNewTaskTitle("");


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
                    <button onClick={onClickButtonAddTask} > + </button>

                </div>
                {tasks.length === 0 ?
                    <p>Тасок нет</p>
                    :
                    <ul>
                        {tasks.map(task => {

                            const onClickDeleteTask = () => {
                                removeTask(task.id)
                            }

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                    <button onClick={onClickDeleteTask}>-</button>
                                </li>
                            )
                        })}

                    </ul>
                }

                <div>
                    <button onClick={() => { changeFilter("All") }}>All</button>
                    <button onClick={() => { changeFilter("Active") }}>Active</button>
                    <button onClick={() => { changeFilter("Completed") }}>Completed</button>


                </div>
            </div>
        </div>
    )
}