import {AddTaskAC, ChangeTasksStatusAC, RemoveTasksAC, tasksReducer, ChangeTaskTitleAC} from './tasks-reducer';
import {} from '../AppWithReducer';
import {TasksStateType} from '../TodolistWithReducer';
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

let startState:TasksStateType

beforeEach(()=> {
    const startState: TasksStateType = {
    "todolistID1": [
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "React", isDone: false}
    ],
    "todolistID2": [
        {id: "1", title: "bread", isDone: false},
        {id: "2", title: "milk", isDone: true},
        {id: "3", title: "tea", isDone: false}
    ]
}; })

test('correct task should be deleted from correct array', () => {
    // const startState: TasksStateType = {
    //     "todolistID1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistID2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = RemoveTasksAC("2", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistID1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistID2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});


test('correct task should be added to correct array', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = AddTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].isDone).toBe(false);
})


test('status of specified task should be changed', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: false},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = ChangeTasksStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(false);
    expect(endState["todolistId2"][1].isDone).toBe(true);
});

test('change tasks title', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = ChangeTaskTitleAC("2", "juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('juce');
});

test('new array should be added when new todolist is added', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});






