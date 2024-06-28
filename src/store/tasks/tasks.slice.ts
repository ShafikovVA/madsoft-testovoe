import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from './initialTasks';
import { ITaskData } from '../../types/ITaskData';

const localItems = localStorage.getItem('timer');
const localComplete = localStorage.getItem('complete');
const initialTasksLocal: ITaskData = localItems ? {
  tasks: initialTasks.tasks,
  complete: !!localComplete || false,
  timer: {
    hours: JSON.parse(localItems)[0],
    minutes: JSON.parse(localItems)[1],
    seconds: JSON.parse(localItems)[2],
  },
} : initialTasks;

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksLocal,
  reducers: {
    completeTest: (state) => {
      state.complete = true;
      localStorage.setItem('complete', '1');
    },
  },
});

export const { actions, reducer } = taskSlice;

export const { completeTest } = actions;
