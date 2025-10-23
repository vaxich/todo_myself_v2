
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type Todolist = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksState = {
  [key: string]: TaskType[]
}
export type FilterValueType = "All" | "Active" | "Completed"

function App() {

  //const [filterValue, setFilterValue] = useState<FilterValueType>("All")

  const todolistId1 = crypto.randomUUID()
  const todolistId2 = crypto.randomUUID()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'Rest API', isDone: true },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
    ],
  })

  const changeFilter = (todolistId: string, newFilterValue: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl))
    //setFilterValue(newFilterValue)
  }

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    // const newTaskList = tasks.filter(task => task.id !== taskId)
    // setTasks(newTaskList)
  }

  const AddTask = (todolistId: string, newTaskTitle: string) => {
    const newTask = { id: crypto.randomUUID(), title: newTaskTitle, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    // setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: isDone } : task) })
    // const newState = tasks.map((task) => task.id === taskId ? { ...task, isDone: isDone } : task)
    // setTasks(newState)

  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const addTodolist = (newTitle: string) => {
    let newTodolistId = crypto.randomUUID();
    let newTodolist: Todolist = { id: newTodolistId, title: newTitle, filter: "All" }
    setTodolists([...todolists, newTodolist])
    setTasks({ ...tasks, [newTodolistId]: [] })
  }

  const onChangeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
  }

  const onChangeTotolistTitle = (todolistId: string, newTodolistTitle: string) => {
    setTodolists( todolists.map( tl => tl.id === todolistId ? {... tl, title: newTodolistTitle} : tl))
  }




  return (
    <div className="App">

      <AddItemForm onClick={addTodolist} />

      {
        todolists.map(tl => {

          const FilteredRasksForTodolist = (tasks: TaskType[], newFilterValue: FilterValueType) => {
            switch (tl.filter) {
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

          const filteredTaksForRender = FilteredRasksForTodolist(tasks[tl.id], tl.filter)

          return (
            <Todolist
              todolistId={tl.id}
              title={tl.title}
              tasks={filteredTaksForRender}
              changeFilter={changeFilter}
              filterValue={tl.filter}
              removeTask={removeTask}
              AddTask={AddTask}
              changeTaskStatus={changeTaskStatus}
              removeTodolist={removeTodolist}
              onChangeTaskTitle={onChangeTaskTitle}
              onChangeTotolistTitle={onChangeTotolistTitle}
            />
          )
        })
      }


    </div>
  );
}

export default App;
