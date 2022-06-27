import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskType} from "./Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  args:{
    removeTasks: action('removeTasks'),
    onChangeTaskStatusOnClickHandler:action('onChangeTaskStatusOnClickHandler'),
    onChangeTaskTitleOnClickHandler:action('onChangeTaskTitleOnClickHandler')
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    removeTasks: {description: 'removeTasks'},
    onChangeTaskStatusOnClickHandler:{description:'onChangeTaskStatusOnClickHandler'},
    onChangeTaskTitleOnClickHandler:{description:'onChangeTaskTitleOnClickHandler'}
  },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />; // образец

export const TaskIsDoneStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsDoneStory.args = {
  todoListID:'ddwdw',
  task: {id:'dwd', title:'JS', isDone:true }
};
export const TaskIsNotDoneStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsNotDoneStory.args = {
  todoListID:'ddwdw',
  task: {id:'dwd', title:'JS', isDone:false }
};


// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
