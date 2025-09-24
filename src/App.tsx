
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { log } from 'node:console';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

  const [filterValue, setFilterValue] = useState<FilterValueType>("All")
  
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    { id: crypto.randomUUID(), title: 'c++', isDone: false },
  ])

  const changeFilter = (newFilterValue: FilterValueType) => {
    setFilterValue(newFilterValue)
  }

  const removeTask = (taskId:string) => {
    const newTaskList = tasks.filter( task => task.id !== taskId)
    setTasks(newTaskList)

  }

  const FilteredRasksForTodolist = (tasks: TaskType[], newFilterValue: FilterValueType) => {
    switch (filterValue) {
      case 'Active': {
        return tasks.filter(task => task.isDone === false)
      }
      case 'Completed': {
        return tasks.filter(task => task.isDone === true)
      }
      default:
        return tasks
    }
  }

  const filteredTaksForRender = FilteredRasksForTodolist(tasks, filterValue)



  return (
    <div className="App">
      <Todolist 
      title='what to learn' 
      tasks={filteredTaksForRender} 
      changeFilter={changeFilter} 
      filterValue={filterValue} 
      removeTask = {removeTask}
      />

    </div>
  );
}

export default App;
