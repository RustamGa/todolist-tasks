import {
    RemoveTodoListAC,
    todoListReducer,
    AddTodoListAC,
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterPropsType, TodoListType} from '../AppWithReducer';

let todolistID1:string;
let todolistID2:string;

let startState: Array<TodoListType>

beforeEach(()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to buy", filter: "All"}
    ]
})
test('correct todolist should be removed', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // const startState: Array<TodoListType> = [
    //     {id: todolistID1, title: "What to learn", filter: "All"},
    //     {id: todolistID2, title: "What to buy", filter: "All"}
    // ]

    const endState = todoListReducer(startState, RemoveTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New TodolistWithReducer";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New TodolistWithReducer";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterPropsType = "Completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});




