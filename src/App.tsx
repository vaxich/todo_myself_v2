
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

   const tasks1 : TaskType[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 5, title: 'c++', isDone: false },
  ]
 
  const tasks2 : TaskType[]= [ ]

  return (
    <div className="App">
      <Todolist title='what to learn' tasks = {tasks1}/>
      <Todolist title='what to buy' tasks = {tasks2}/>
    </div>
  );
}

export default App;
