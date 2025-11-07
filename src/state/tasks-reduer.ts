import { TasksState } from "../App"
import { AddTotodlistActionType, RemoveTodoListActionType } from "./todolist-reducer";



export const tasksReducer = (state: TasksState, action: tasksReducerActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        }
        case "ADD-TASK": {
            const crypto = require('crypto');
            const newTask = { id: crypto.randomUUID(), title: action.payload.newTaskTitle, isDone: false };
            // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        }
        case "CHANGE-TASK-STATUS":{
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: isDone } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.newTaskStatus } : task) }
        }
        case "CHANGE-TASK-TITLE":{
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.newTaskTitle } : task) }
        }
        case "ADD-TODOLIST":{
            // setTasks({ ...tasks, [newTodolistId]: [] })
            return { ...state, [action.newTodolistId]: [] }
        }
        case "REMOVE-TODOLIST":{
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }

        default:
            throw new Error('не ивестный тип экшн')
    }
}

type tasksReducerActionTypes = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTotodlistActionType | RemoveTodoListActionType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
};

export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTaskTitle
        }
    } as const
};

export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newTaskStatus
        }
    } as const
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTaskTitle
        }
    } as const
};