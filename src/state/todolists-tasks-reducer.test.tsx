import {AddTodoListAC, todoListReducer} from "./todolists-reducer";
import {TasksStateType} from "../Todolist";
import {TodoListType} from "../AppWithReducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoListID);
    expect(idFromTodolists).toBe(action.payload.todoListID);
});
