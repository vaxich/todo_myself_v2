import { FilterValueType, TaskType } from "./App"
import { Button } from "./Button"
import './App.css';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    changeFilter: (newFilterValue : FilterValueType) => void
    filterValue: FilterValueType
    removeTask: ( taskId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks , changeFilter , filterValue , removeTask} = props

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input />
                    <Button title="+" />
                </div>
                {tasks.length === 0 ?
                    <p>Тасок нет</p>
                    :
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                    <button onClick={ () => removeTask(task.id)}>-</button>
                                </li>
                            )
                        })}

                    </ul>
                }

                <div>
                    <button onClick={ () => {changeFilter("All")}}>All</button>
                    <button onClick={ () => {changeFilter("Active")}}>Active</button>
                    <button onClick={ () => {changeFilter("Completed")}}>Completed</button>
                    
                    
                </div>
            </div>
        </div>
    )
}