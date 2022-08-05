import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {combineReducers} from "redux";
import {tasksReducer} from "./state/tasks-reducer";
import {todoListReducer} from "./state/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListReducer
})

export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux /> ; // образец

export const AppWithReduxStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args

AppWithReduxStory.args = {

};
