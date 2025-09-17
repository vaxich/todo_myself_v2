import { TaskType } from "./App"
import { Button } from "./Button"
import './App.css';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks } = props

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input />
                    <Button title="+"/>
                </div>
                {tasks.length === 0 ?
                    <p>Тасок нет</p>
                    :
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                                </li>
                            )
                        })}

                    </ul>
                }

                <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Conplited"/>
                    
                </div>
            </div>
        </div>
    )
}