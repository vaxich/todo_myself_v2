import { FilterValueType, Todolist } from "../App"



export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    newTodolistTitle: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    newTodolistTitle: string
    todolistId: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string
    newFilter: FilterValueType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType


export const todolistReducer = (state: Todolist[], action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(tl => tl.id !== todolistId))
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = '45465';
            let newTodolist: Todolist = { id: newTodolistId, title: action.newTodolistTitle, filter: "All" }
            // setTodolists([...todolists, newTodolist])
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTodolistTitle } : tl))
            return state.map(tl => tl.id === action.todolistId ? { ...tl, title: action.newTodolistTitle } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl))
            return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.newFilter } : tl)
        }
        default:
            throw new Error('не ивестный тип экшн')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    }
}

export const addTodolistAC = (newTodolistTitle: string): AddTotodlistActionType => {
    return {
        type: 'ADD-TODOLIST',
        newTodolistTitle: newTodolistTitle
    }
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTotodlistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId,
        newTodolistTitle: newTodolistTitle
    }
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTotodlistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: todolistId,
        newFilter: newFilter
    }
}