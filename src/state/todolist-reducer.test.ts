import { FilterValueType, Todolist } from "../App"
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reducer"

test('correct todolist should be removed', () => {
    let todolistId1 = '454343'
    let todolistId2 = '674574'

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState : Todolist[]  = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 ='4564574'
    let todolistId2 = '544574'

    let newTodolistTitle = "New Todolist"

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})

test("correct todolist should change its name", () => {
    let todolistId1 = '465456'
    let todolistId2 = '664564'

    let newTodolistTitle = "New Todolist"

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change", () => {
    let todolistId1 = '456456'
    let todolistId2 = '474545'

    let newFilter: FilterValueType = "Completed"

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter ))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})